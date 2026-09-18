import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    status: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let leads = await ctx.db.query("leads").collect();

    if (args.status) {
      leads = leads.filter((l) => l.status === args.status);
    }
    if (args.source) {
      leads = leads.filter((l) => l.source === args.source);
    }

    return leads.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const getById = query({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    location: v.optional(v.string()),
    zip: v.optional(v.string()),
    enquiryDetails: v.optional(v.string()),
    source: v.string(),
    status: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const leadId = await ctx.db.insert("leads", {
      ...args,
      status: args.status || "NEW",
      createdAt: now,
      updatedAt: now,
    });
    return leadId;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const patchData: { status: string; updatedAt: number; notes?: string } = {
      status: args.status,
      updatedAt: Date.now(),
    };
    if (args.notes !== undefined) {
      patchData.notes = args.notes;
    }
    await ctx.db.patch(args.id, patchData);
    return args.id;
  },
});

export const remove = mutation({
  args: { id: v.id("leads") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
