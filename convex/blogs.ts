import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let blogs = await ctx.db.query("blogs").collect();

    if (args.status) {
      blogs = blogs.filter((b) => b.status === args.status);
    }

    return blogs.sort((a, b) => b.publishedAt - a.publishedAt);
  },
});

export const getById = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("blogs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.optional(v.string()),
    content: v.string(),
    featuredImage: v.optional(v.string()),
    author: v.string(),
    publishedAt: v.optional(v.number()),
    status: v.string(),
    categories: v.optional(v.string()),
    tags: v.optional(v.string()),
    embeddedVideoUrl: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const blogId = await ctx.db.insert("blogs", {
      ...args,
      publishedAt: args.publishedAt ?? now,
      createdAt: now,
      updatedAt: now,
    });
    return blogId;
  },
});

export const update = mutation({
  args: {
    id: v.id("blogs"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    featuredImage: v.optional(v.string()),
    author: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    status: v.optional(v.string()),
    categories: v.optional(v.string()),
    tags: v.optional(v.string()),
    embeddedVideoUrl: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const now = Date.now();

    await ctx.db.patch(id, {
      ...fields,
      updatedAt: now,
    });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
