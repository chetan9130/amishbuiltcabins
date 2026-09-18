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
    const product = await convexQuery<any>(api.products.getById, { id: id as any });

    if (!product) {
      return NextResponse.json(
        { success: false, error: { message: "Product not found.", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error: any) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch product.", code: "DB_ERROR" } },
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

    const updated = await convexMutation(api.products.update, {
      id: id as any,
      name: body.name,
      slug: cleanSlug,
      tagline: body.tagline,
      description: body.description,
      shortDescription: body.shortDescription,
      category: body.category,
      series: body.series,
      architecturalStyle: body.architecturalStyle,
      sqft: body.sqft !== undefined ? Number(body.sqft) : undefined,
      bedrooms: body.bedrooms !== undefined ? Number(body.bedrooms) : undefined,
      bathrooms: body.bathrooms !== undefined ? Number(body.bathrooms) : undefined,
      stories: body.stories !== undefined ? Number(body.stories) : undefined,
      startingPrice: body.startingPrice !== undefined ? Number(body.startingPrice) : undefined,
      dimensions: body.dimensions,
      frameType: body.frameType,
      roofPitch: body.roofPitch,
      windRating: body.windRating,
      snowLoad: body.snowLoad,
      warranty: body.warranty,
      primaryImage: body.primaryImage,
      gallery:
        body.gallery !== undefined
          ? typeof body.gallery === "object"
            ? JSON.stringify(body.gallery)
            : body.gallery
          : undefined,
      floorPlanImage: body.floorPlanImage,
      videoUrl: body.videoUrl,
      features:
        body.features !== undefined
          ? typeof body.features === "object"
            ? JSON.stringify(body.features)
            : body.features
          : undefined,
      specs:
        body.specs !== undefined
          ? typeof body.specs === "object"
            ? JSON.stringify(body.specs)
            : body.specs
          : undefined,
      customizableOptions:
        body.customizableOptions !== undefined
          ? typeof body.customizableOptions === "object"
            ? JSON.stringify(body.customizableOptions)
            : body.customizableOptions
          : undefined,
      isPublished: body.isPublished,
      isFeatured: body.isFeatured,
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : undefined,
      seoTitle: body.seoTitle,
      metaDescription: body.metaDescription,
      imageAltText: body.imageAltText,
      canonicalUrl: body.canonicalUrl,
      collectionIds: Array.isArray(body.collectionIds) ? (body.collectionIds as any) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Product updated successfully.",
    });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update product.", code: "UPDATE_ERROR" } },
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
    await convexMutation(api.products.remove, { id: id as any });

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete product.", code: "DELETE_ERROR" } },
      { status: 500 }
    );
  }
}
