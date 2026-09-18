import { query } from "./_generated/server";

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    const blogs = await ctx.db.query("blogs").collect();
    const leads = await ctx.db.query("leads").collect();
    const quotations = await ctx.db.query("quotations").collect();
    const pages = await ctx.db.query("pages").collect();
    const collections = await ctx.db.query("collections").collect();

    const recentLeads = [...leads]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    const recentQuotations = [...quotations]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, 5);

    const newLeadsCount = leads.filter((l) => l.status === "NEW").length;
    const pendingQuotesCount = quotations.filter(
      (q) => q.status === "PENDING"
    ).length;

    return {
      totalProducts: products.length,
      publishedProducts: products.filter((p) => p.isPublished).length,
      totalBlogs: blogs.length,
      publishedBlogs: blogs.filter((b) => b.status === "PUBLISHED").length,
      totalPages: pages.length,
      totalCollections: collections.length,
      totalLeads: leads.length,
      newLeadsCount,
      totalQuotations: quotations.length,
      pendingQuotesCount,
      recentLeads,
      recentQuotations,
    };
  },
});
