import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const setting = await ctx.db
      .query("globalSettings")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    return setting;
  },
});

export const update = mutation({
  args: {
    companyName: v.optional(v.string()),
    logoUrl: v.optional(v.string()),
    faviconUrl: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    address: v.optional(v.string()),
    socialLinks: v.optional(v.string()),
    announcementEnabled: v.optional(v.boolean()),
    announcementText: v.optional(v.string()),
    announcementLink: v.optional(v.string()),
    navLinks: v.optional(v.string()),
    footerText: v.optional(v.string()),
    footerLinks: v.optional(v.string()),
    defaultSeoTitle: v.optional(v.string()),
    defaultMetaDescription: v.optional(v.string()),
    ctaLabel: v.optional(v.string()),
    ctaLink: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("globalSettings")
      .withIndex("by_key", (q) => q.eq("key", "default"))
      .first();

    const now = Date.now();

    if (existing) {
      await ctx.db.patch(existing._id, {
        ...(args.companyName !== undefined && { companyName: args.companyName }),
        ...(args.logoUrl !== undefined && { logoUrl: args.logoUrl }),
        ...(args.faviconUrl !== undefined && { faviconUrl: args.faviconUrl }),
        ...(args.phone !== undefined && { phone: args.phone }),
        ...(args.email !== undefined && { email: args.email }),
        ...(args.address !== undefined && { address: args.address }),
        ...(args.socialLinks !== undefined && { socialLinks: args.socialLinks }),
        ...(args.announcementEnabled !== undefined && { announcementEnabled: args.announcementEnabled }),
        ...(args.announcementText !== undefined && { announcementText: args.announcementText }),
        ...(args.announcementLink !== undefined && { announcementLink: args.announcementLink }),
        ...(args.navLinks !== undefined && { navLinks: args.navLinks }),
        ...(args.footerText !== undefined && { footerText: args.footerText }),
        ...(args.footerLinks !== undefined && { footerLinks: args.footerLinks }),
        ...(args.defaultSeoTitle !== undefined && { defaultSeoTitle: args.defaultSeoTitle }),
        ...(args.defaultMetaDescription !== undefined && { defaultMetaDescription: args.defaultMetaDescription }),
        ...(args.ctaLabel !== undefined && { ctaLabel: args.ctaLabel }),
        ...(args.ctaLink !== undefined && { ctaLink: args.ctaLink }),
        updatedAt: now,
      });
      return await ctx.db.get(existing._id);
    } else {
      const id = await ctx.db.insert("globalSettings", {
        key: "default",
        companyName: args.companyName || "ModularHome.com",
        logoUrl: args.logoUrl || "/newlogo2.png",
        faviconUrl: args.faviconUrl || "/favicon.ico",
        phone: args.phone || "+1 (812) 595-4033",
        email: args.email || "contact@modularhome.com",
        address: args.address || "Factory Headquarters, IN & Nationwide Delivery",
        socialLinks: args.socialLinks || "{}",
        announcementEnabled: args.announcementEnabled !== undefined ? args.announcementEnabled : true,
        announcementText: args.announcementText || "",
        announcementLink: args.announcementLink || "/buildings",
        navLinks: args.navLinks || "[]",
        footerText: args.footerText || "",
        footerLinks: args.footerLinks || "[]",
        defaultSeoTitle: args.defaultSeoTitle || "ModularHome.com",
        defaultMetaDescription: args.defaultMetaDescription || "",
        ctaLabel: args.ctaLabel || "Get A Quote",
        ctaLink: args.ctaLink || "/quote",
        updatedAt: now,
      });
      return await ctx.db.get(id);
    }
  },
});
