import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAdminByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase().trim()))
      .first();
  },
});

export const getSession = query({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_sessionToken", (q) => q.eq("sessionToken", args.sessionToken))
      .first();

    if (!session) return null;

    if (Date.now() > session.expiresAt) {
      return null;
    }

    const user = await ctx.db.get(session.userId);
    if (!user || user.status !== "ACTIVE") return null;

    return {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      expiresAt: session.expiresAt,
    };
  },
});

export const createAdminUser = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();
    const existing = await ctx.db
      .query("adminUsers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existing) {
      return existing._id;
    }

    const now = Date.now();
    return await ctx.db.insert("adminUsers", {
      email,
      passwordHash: args.passwordHash,
      name: args.name,
      role: args.role || "ADMIN",
      status: "ACTIVE",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const createSession = mutation({
  args: {
    userId: v.id("adminUsers"),
    sessionToken: v.string(),
    expiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    await ctx.db.patch(args.userId, {
      lastLoginAt: now,
      updatedAt: now,
    });

    return await ctx.db.insert("sessions", {
      userId: args.userId,
      sessionToken: args.sessionToken,
      expiresAt: args.expiresAt,
      createdAt: now,
    });
  },
});

export const deleteSession = mutation({
  args: { sessionToken: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_sessionToken", (q) => q.eq("sessionToken", args.sessionToken))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }
    return true;
  },
});
