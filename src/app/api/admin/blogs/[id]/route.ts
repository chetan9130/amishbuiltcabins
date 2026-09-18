import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { id } = await params;
    const blog = await convexQuery<any>(api.blogs.getById, { id: id as any });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: { message: "Blog article not found.", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    console.error("Error fetching blog details:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch blog.", code: "DB_ERROR" } },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { id } = await params;
    const body = await request.json();

    const cleanSlug = body.slug
      ? body.slug.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, "-")
      : undefined;

    const updated = await convexMutation(api.blogs.update, {
      id: id as any,
      title: body.title,
      slug: cleanSlug,
      excerpt: body.excerpt,
      content: body.content,
      featuredImage: body.featuredImage,
      author: body.author,
      publishedAt: body.publishedAt ? new Date(body.publishedAt).getTime() : undefined,
      status: body.status,
      categories:
        body.categories !== undefined
          ? typeof body.categories === "object"
            ? JSON.stringify(body.categories)
            : body.categories
          : undefined,
      tags:
        body.tags !== undefined
          ? typeof body.tags === "object"
            ? JSON.stringify(body.tags)
            : body.tags
          : undefined,
      embeddedVideoUrl: body.embeddedVideoUrl,
      seoTitle: body.seoTitle,
      metaDescription: body.metaDescription,
      imageAltText: body.imageAltText,
      canonicalUrl: body.canonicalUrl,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Blog article updated successfully.",
    });
  } catch (error: any) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update blog.", code: "UPDATE_ERROR" } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { id } = await params;
    await convexMutation(api.blogs.remove, { id: id as any });

    return NextResponse.json({
      success: true,
      message: "Blog article deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete blog.", code: "DELETE_ERROR" } },
      { status: 500 }
    );
  }
}
