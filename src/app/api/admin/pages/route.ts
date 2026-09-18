import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;

    const pages =
      (await convexQuery<any[]>(api.pages.list, {
        status: status && status !== "ALL" ? status : undefined,
      })) || [];

    return NextResponse.json({
      success: true,
      data: pages,
    });
  } catch (error: any) {
    console.error("Error fetching admin pages:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch pages.", code: "DB_ERROR" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();
    const { title, slug, subtitle, content, status, featuredImage, seoTitle, metaDescription, canonicalUrl } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: { message: "Page title and slug are required.", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, "-");

    const pageId = await convexMutation(api.pages.create, {
      title,
      slug: cleanSlug,
      subtitle: subtitle || undefined,
      content: content || undefined,
      status: status || "PUBLISHED",
      featuredImage: featuredImage || undefined,
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || subtitle || undefined,
      canonicalUrl: canonicalUrl || undefined,
    });

    return NextResponse.json({
      success: true,
      data: { _id: pageId, title, slug: cleanSlug },
      message: "Page created successfully.",
    });
  } catch (error: any) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to create page.", code: "CREATE_ERROR" } },
      { status: 500 }
    );
  }
}
