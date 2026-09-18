import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    search: v.optional(v.string()),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let pages = await ctx.db.query("pages").collect();

    if (args.status && args.status !== "ALL") {
      pages = pages.filter((p) => p.status === args.status);
    }

    if (args.search) {
      const q = args.search.toLowerCase().trim();
      pages = pages.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q))
      );
    }

    // Attach section count
    const sections = await ctx.db.query("pageSections").collect();
    const sectionCountMap: Record<string, number> = {};
    for (const s of sections) {
      sectionCountMap[s.pageId] = (sectionCountMap[s.pageId] || 0) + 1;
    }

    return pages
      .map((p) => ({
        ...p,
        id: p._id,
        _count: { sections: sectionCountMap[p._id] || 0 },
      }))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  },
});

export const getById = query({
  args: { id: v.id("pages") },
  handler: async (ctx, args) => {
    const page = await ctx.db.get(args.id);
    if (!page) return null;

    const sections = await ctx.db
      .query("pageSections")
      .withIndex("by_pageId", (q) => q.eq("pageId", args.id))
      .collect();

    sections.sort((a, b) => a.order - b.order);

    return {
      ...page,
      id: page._id,
      sections: sections.map((s) => ({ ...s, id: s._id })),
    };
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const page = await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!page) return null;

    const sections = await ctx.db
      .query("pageSections")
      .withIndex("by_pageId", (q) => q.eq("pageId", page._id))
      .collect();

    sections.sort((a, b) => a.order - b.order);

    return {
      ...page,
      id: page._id,
      sections: sections.map((s) => ({ ...s, id: s._id })),
    };
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    subtitle: v.optional(v.string()),
    content: v.optional(v.string()),
    status: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const cleanSlug = args.slug.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, "-");

    const existing = await ctx.db
      .query("pages")
      .withIndex("by_slug", (q) => q.eq("slug", cleanSlug))
      .first();

    if (existing) {
      throw new Error(`A page with slug '${cleanSlug}' already exists.`);
    }

    const now = Date.now();
    const id = await ctx.db.insert("pages", {
      title: args.title,
      slug: cleanSlug,
      subtitle: args.subtitle,
      content: args.content,
      status: args.status || "PUBLISHED",
      featuredImage: args.featuredImage,
      seoTitle: args.seoTitle || args.title,
      metaDescription: args.metaDescription || args.subtitle,
      canonicalUrl: args.canonicalUrl,
      createdAt: now,
      updatedAt: now,
    });

    const page = await ctx.db.get(id);
    return { ...page, id };
  },
});

export const update = mutation({
  args: {
    id: v.id("pages"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    content: v.optional(v.string()),
    status: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Page not found.");

    let cleanSlug = existing.slug;
    if (args.slug && args.slug !== existing.slug) {
      cleanSlug = args.slug.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, "-");
      const slugCheck = await ctx.db
        .query("pages")
        .withIndex("by_slug", (q) => q.eq("slug", cleanSlug))
        .first();
      if (slugCheck && slugCheck._id !== args.id) {
        throw new Error(`Slug '${cleanSlug}' is already taken.`);
      }
    }

    const now = Date.now();
    await ctx.db.patch(args.id, {
      ...(args.title !== undefined && { title: args.title }),
      slug: cleanSlug,
      ...(args.subtitle !== undefined && { subtitle: args.subtitle }),
      ...(args.content !== undefined && { content: args.content }),
      ...(args.status !== undefined && { status: args.status }),
      ...(args.featuredImage !== undefined && { featuredImage: args.featuredImage }),
      ...(args.seoTitle !== undefined && { seoTitle: args.seoTitle }),
      ...(args.metaDescription !== undefined && { metaDescription: args.metaDescription }),
      ...(args.canonicalUrl !== undefined && { canonicalUrl: args.canonicalUrl }),
      updatedAt: now,
    });

    const updated = await ctx.db.get(args.id);
    return { ...updated, id: updated!._id };
  },
});

export const remove = mutation({
  args: { id: v.id("pages") },
  handler: async (ctx, args) => {
    // Delete page sections first
    const sections = await ctx.db
      .query("pageSections")
      .withIndex("by_pageId", (q) => q.eq("pageId", args.id))
      .collect();

    for (const s of sections) {
      await ctx.db.delete(s._id);
    }

    await ctx.db.delete(args.id);
    return true;
  },
});
