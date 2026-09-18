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
    const page = await convexQuery<any>(api.pages.getById, { id: id as any });

    if (!page) {
      return NextResponse.json(
        { success: false, error: { message: "Page not found.", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: page });
  } catch (error: any) {
    console.error("Error fetching page details:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch page.", code: "DB_ERROR" } },
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

    const updated = await convexMutation(api.pages.update, {
      id: id as any,
      title: body.title,
      slug: cleanSlug,
      subtitle: body.subtitle,
      content: body.content,
      status: body.status,
      featuredImage: body.featuredImage,
      seoTitle: body.seoTitle,
      metaDescription: body.metaDescription,
      canonicalUrl: body.canonicalUrl,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Page updated successfully.",
    });
  } catch (error: any) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update page.", code: "UPDATE_ERROR" } },
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
    await convexMutation(api.pages.remove, { id: id as any });

    return NextResponse.json({
      success: true,
      message: "Page deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting page:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete page.", code: "DELETE_ERROR" } },
      { status: 500 }
    );
  }
}
