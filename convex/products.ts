import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    category: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let products = await ctx.db.query("products").collect();

    if (args.category) {
      products = products.filter((p) => p.category === args.category);
    }
    if (args.isPublished !== undefined) {
      products = products.filter((p) => p.isPublished === args.isPublished);
    }

    return products.sort((a, b) => a.displayOrder - b.displayOrder);
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.id);
    if (!product) return null;

    // Get linked collections
    const joins = await ctx.db
      .query("productCollections")
      .withIndex("by_productId", (q) => q.eq("productId", args.id))
      .collect();

    const collections = [];
    for (const join of joins) {
      const col = await ctx.db.get(join.collectionId);
      if (col) collections.push(col);
    }

    return {
      ...product,
      collections,
      collectionIds: joins.map((j) => j.collectionId),
    };
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const product = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (!product) return null;

    const joins = await ctx.db
      .query("productCollections")
      .withIndex("by_productId", (q) => q.eq("productId", product._id))
      .collect();

    const collections = [];
    for (const join of joins) {
      const col = await ctx.db.get(join.collectionId);
      if (col) collections.push(col);
    }

    return {
      ...product,
      collections,
    };
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    tagline: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    category: v.string(),
    series: v.optional(v.string()),
    architecturalStyle: v.optional(v.string()),
    sqft: v.number(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    stories: v.number(),
    startingPrice: v.number(),
    dimensions: v.optional(v.string()),
    frameType: v.optional(v.string()),
    roofPitch: v.optional(v.string()),
    windRating: v.optional(v.string()),
    snowLoad: v.optional(v.string()),
    warranty: v.optional(v.string()),
    primaryImage: v.string(),
    gallery: v.optional(v.string()),
    floorPlanImage: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    features: v.optional(v.string()),
    specs: v.optional(v.string()),
    customizableOptions: v.optional(v.string()),
    isPublished: v.boolean(),
    isFeatured: v.boolean(),
    displayOrder: v.number(),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
    collectionIds: v.optional(v.array(v.id("collections"))),
  },
  handler: async (ctx, args) => {
    const { collectionIds, ...productFields } = args;
    const now = Date.now();

    const productId = await ctx.db.insert("products", {
      ...productFields,
      createdAt: now,
      updatedAt: now,
    });

    if (collectionIds && collectionIds.length > 0) {
      for (const colId of collectionIds) {
        await ctx.db.insert("productCollections", {
          productId,
          collectionId: colId,
          assignedAt: now,
        });
      }
    }

    return productId;
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    tagline: v.optional(v.string()),
    description: v.optional(v.string()),
    shortDescription: v.optional(v.string()),
    category: v.optional(v.string()),
    series: v.optional(v.string()),
    architecturalStyle: v.optional(v.string()),
    sqft: v.optional(v.number()),
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    stories: v.optional(v.number()),
    startingPrice: v.optional(v.number()),
    dimensions: v.optional(v.string()),
    frameType: v.optional(v.string()),
    roofPitch: v.optional(v.string()),
    windRating: v.optional(v.string()),
    snowLoad: v.optional(v.string()),
    warranty: v.optional(v.string()),
    primaryImage: v.optional(v.string()),
    gallery: v.optional(v.string()),
    floorPlanImage: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    features: v.optional(v.string()),
    specs: v.optional(v.string()),
    customizableOptions: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    displayOrder: v.optional(v.number()),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    imageAltText: v.optional(v.string()),
    canonicalUrl: v.optional(v.string()),
    collectionIds: v.optional(v.array(v.id("collections"))),
  },
  handler: async (ctx, args) => {
    const { id, collectionIds, ...fields } = args;
    const now = Date.now();

    await ctx.db.patch(id, {
      ...fields,
      updatedAt: now,
    });

    if (collectionIds !== undefined) {
      // Clear old joins
      const oldJoins = await ctx.db
        .query("productCollections")
        .withIndex("by_productId", (q) => q.eq("productId", id))
        .collect();

      for (const join of oldJoins) {
        await ctx.db.delete(join._id);
      }

      // Add new joins
      for (const colId of collectionIds) {
        await ctx.db.insert("productCollections", {
          productId: id,
          collectionId: colId,
          assignedAt: now,
        });
      }
    }

    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    // Delete product collection joins
    const joins = await ctx.db
      .query("productCollections")
      .withIndex("by_productId", (q) => q.eq("productId", args.id))
      .collect();

    for (const join of joins) {
      await ctx.db.delete(join._id);
    }

    await ctx.db.delete(args.id);
    return true;
  },
});
