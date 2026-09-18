import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listByPage = query({
  args: { pageId: v.id("pages") },
  handler: async (ctx, args) => {
    const sections = await ctx.db
      .query("pageSections")
      .withIndex("by_pageId", (q) => q.eq("pageId", args.pageId))
      .collect();
    return sections.sort((a, b) => a.order - b.order);
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const sections = await ctx.db.query("pageSections").collect();
    return sections.sort((a, b) => a.order - b.order);
  },
});

export const create = mutation({
  args: {
    pageId: v.id("pages"),
    type: v.string(),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    content: v.optional(v.string()),
    order: v.number(),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const sectionId = await ctx.db.insert("pageSections", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
    return sectionId;
  },
});

export const update = mutation({
  args: {
    id: v.id("pageSections"),
    type: v.optional(v.string()),
    title: v.optional(v.string()),
    subtitle: v.optional(v.string()),
    content: v.optional(v.string()),
    order: v.optional(v.number()),
    isVisible: v.optional(v.boolean()),
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

export const reorder = mutation({
  args: {
    orderedIds: v.array(v.id("pageSections")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    for (let i = 0; i < args.orderedIds.length; i++) {
      await ctx.db.patch(args.orderedIds[i], {
        order: i + 1,
        updatedAt: now,
      });
    }
    return true;
  },
});

export const toggleVisibility = mutation({
  args: {
    id: v.id("pageSections"),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      isVisible: args.isVisible,
      updatedAt: Date.now(),
    });
    return true;
  },
});

export const remove = mutation({
  args: { id: v.id("pageSections") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return true;
  },
});
