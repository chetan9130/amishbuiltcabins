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
    const collection = await convexQuery<any>(api.collections.getById, {
      id: id as any,
    });

    if (!collection) {
      return NextResponse.json(
        { success: false, error: { message: "Collection not found.", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: collection });
  } catch (error: any) {
    console.error("Error fetching collection:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch collection.", code: "DB_ERROR" } },
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

    const updated = await convexMutation(api.collections.update, {
      id: id as any,
      name: body.name,
      slug: cleanSlug,
      description: body.description,
      tagline: body.tagline,
      bannerImage: body.bannerImage,
      image: body.image,
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : undefined,
      isFeatured: body.isFeatured,
      status: body.status,
      seoTitle: body.seoTitle,
      metaDescription: body.metaDescription,
      imageAltText: body.imageAltText,
      productIds: Array.isArray(body.productIds) ? (body.productIds as any) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Collection updated successfully.",
    });
  } catch (error: any) {
    console.error("Error updating collection:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update collection.", code: "UPDATE_ERROR" } },
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
    await convexMutation(api.collections.remove, { id: id as any });

    return NextResponse.json({
      success: true,
      message: "Collection deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting collection:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete collection.", code: "DELETE_ERROR" } },
      { status: 500 }
    );
  }
}
