import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, api } from "@/lib/convex";

export async function GET() {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const stats = await convexQuery<any>(api.stats.getDashboardStats, {});

    if (!stats) {
      return NextResponse.json({
        success: true,
        data: {
          metrics: {
            totalProducts: 3,
            totalCollections: 3,
            totalPages: 1,
            publishedBlogs: 1,
            draftBlogs: 0,
            totalLeads: 0,
            newLeads: 0,
            totalQuotations: 0,
            pendingQuotations: 0,
          },
          recentLeads: [],
          recentQuotations: [],
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        metrics: {
          totalProducts: stats.totalProducts,
          totalCollections: stats.totalCollections,
          totalPages: stats.totalPages,
          publishedBlogs: stats.publishedBlogs,
          draftBlogs: stats.totalBlogs - stats.publishedBlogs,
          totalLeads: stats.totalLeads,
          newLeads: stats.newLeadsCount,
          totalQuotations: stats.totalQuotations,
          pendingQuotations: stats.pendingQuotesCount,
        },
        recentLeads: stats.recentLeads,
        recentQuotations: stats.recentQuotations,
      },
    });
  } catch (error: any) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to retrieve dashboard stats.", code: "STATS_ERROR" } },
      { status: 500 }
    );
  }
}
