import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(v.string()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let collections = await ctx.db.query("collections").collect();

    if (args.status) {
      collections = collections.filter((c) => c.status === args.status);
    }
    if (args.isFeatured !== undefined) {
      collections = collections.filter((c) => c.isFeatured === args.isFeatured);
    }

    // Get count of products for each collection
    const results = [];
    for (const col of collections) {
      const joins = await ctx.db
        .query("productCollections")
        .withIndex("by_collectionId", (q) => q.eq("collectionId", col._id))
        .collect();
      results.push({
        ...col,
        productCount: joins.length,
      });
    }

    return results.sort((a, b) => a.displayOrder - b.displayOrder);
  },
});

export const getById = query({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    const collection = await ctx.db.get(args.id);
    if (!collection) return null;

    const joins = await ctx.db
      .query("productCollections")
      .withIndex("by_collectionId", (q) => q.eq("collectionId", args.id))
      .collect();

    const products = [];
    for (const join of joins) {
      const prod = await ctx.db.get(join.productId);
      if (prod) products.push(prod);
    }

    return {
      ...collection,
      products,
      productIds: joins.map((j) => j.productId),
    };
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const collection = await ctx.db
      .query("collections")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!collection) return null;

    const joins = await ctx.db
      .query("productCollections")
      .withIndex("by_collectionId", (q) => q.eq("collectionId", collection._id))
      .collect();

    const products = [];
    for (const join of joins) {
      const prod = await ctx.db.get(join.productId);
      if (prod && prod.isPublished) products.push(prod);
    }

    return {
      ...collection,
      products,
    };
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    tagline: v.optional(v.string()),
    bannerImage: v.optional(v.string()),
    image: v.optional(v.string()),
    displayOrder: v.number(),
    isFeatured: v.boolean(),
    status: v.string(),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    productIds: v.optional(v.array(v.id("products"))),
  },
  handler: async (ctx, args) => {
    const { productIds, ...colFields } = args;
    const now = Date.now();

    const collectionId = await ctx.db.insert("collections", {
      ...colFields,
      createdAt: now,
      updatedAt: now,
    });

    if (productIds && productIds.length > 0) {
      for (const prodId of productIds) {
        await ctx.db.insert("productCollections", {
          productId: prodId,
          collectionId,
          assignedAt: now,
        });
      }
    }

    return collectionId;
  },
});

export const update = mutation({
  args: {
    id: v.id("collections"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    tagline: v.optional(v.string()),
    bannerImage: v.optional(v.string()),
    image: v.optional(v.string()),
    displayOrder: v.optional(v.number()),
    isFeatured: v.optional(v.boolean()),
    status: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    productIds: v.optional(v.array(v.id("products"))),
  },
  handler: async (ctx, args) => {
    const { id, productIds, ...fields } = args;
    const now = Date.now();

    await ctx.db.patch(id, {
      ...fields,
      updatedAt: now,
    });

    if (productIds !== undefined) {
      const oldJoins = await ctx.db
        .query("productCollections")
        .withIndex("by_collectionId", (q) => q.eq("collectionId", id))
        .collect();

      for (const join of oldJoins) {
        await ctx.db.delete(join._id);
      }

      for (const prodId of productIds) {
        await ctx.db.insert("productCollections", {
          productId: prodId,
          collectionId: id,
          assignedAt: now,
        });
      }
    }

    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("collections") },
  handler: async (ctx, args) => {
    const joins = await ctx.db
      .query("productCollections")
      .withIndex("by_collectionId", (q) => q.eq("collectionId", args.id))
      .collect();

    for (const join of joins) {
      await ctx.db.delete(join._id);
    }

    await ctx.db.delete(args.id);
    return true;
  },
});
