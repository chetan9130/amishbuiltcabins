import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let quotes = await ctx.db.query("quotations").collect();

    if (args.status) {
      quotes = quotes.filter((q) => q.status === args.status);
    }

    return quotes.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getById = query({
  args: { id: v.id("quotations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.optional(v.string()),
    customerZip: v.optional(v.string()),
    modelSlug: v.optional(v.string()),
    modelName: v.optional(v.string()),
    sqft: v.optional(v.number()),
    dimensions: v.optional(v.string()),
    options: v.optional(v.string()),
    pricingInputs: v.optional(v.string()),
    estimatedAmount: v.optional(v.number()),
    timeline: v.optional(v.string()),
    requirements: v.optional(v.string()),
    status: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const quoteId = await ctx.db.insert("quotations", {
      ...args,
      status: args.status || "PENDING",
      source: args.source || "QUOTE_WIZARD",
      createdAt: now,
      updatedAt: now,
    });
    return quoteId;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("quotations"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("quotations") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
