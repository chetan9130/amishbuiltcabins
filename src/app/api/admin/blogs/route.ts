import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;

    const blogs =
      (await convexQuery<any[]>(api.blogs.list, {
        status: status && status !== "ALL" ? status : undefined,
      })) || [];

    return NextResponse.json({
      success: true,
      data: blogs,
    });
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch blogs.", code: "DB_ERROR" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author,
      publishedAt,
      status,
      categories,
      tags,
      embeddedVideoUrl,
      seoTitle,
      metaDescription,
      imageAltText,
      canonicalUrl,
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { success: false, error: { message: "Title, slug, and content are required.", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, "-");

    const blogId = await convexMutation(api.blogs.create, {
      title,
      slug: cleanSlug,
      excerpt: excerpt || undefined,
      content,
      featuredImage:
        featuredImage ||
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      author: author || authResult.user.name || "ModularHome Editorial Team",
      publishedAt: publishedAt ? new Date(publishedAt).getTime() : Date.now(),
      status: status || "PUBLISHED",
      categories: typeof categories === "object" ? JSON.stringify(categories) : categories || undefined,
      tags: typeof tags === "object" ? JSON.stringify(tags) : tags || undefined,
      embeddedVideoUrl: embeddedVideoUrl || undefined,
      seoTitle: seoTitle || `${title} | ModularHome.com`,
      metaDescription: metaDescription || excerpt || undefined,
      imageAltText: imageAltText || title,
      canonicalUrl: canonicalUrl || undefined,
    });

    return NextResponse.json({
      success: true,
      data: { _id: blogId, title, slug: cleanSlug },
      message: "Blog created successfully.",
    });
  } catch (error: any) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to create blog.", code: "CREATE_ERROR" } },
      { status: 500 }
    );
  }
}
