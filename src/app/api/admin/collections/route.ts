import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;

    const collections =
      (await convexQuery<any[]>(api.collections.list, {
        status: status && status !== "ALL" ? status : undefined,
      })) || [];

    return NextResponse.json({
      success: true,
      data: collections,
    });
  } catch (error: any) {
    console.error("Error fetching admin collections:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch collections.", code: "DB_ERROR" } },
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
      name,
      slug,
      description,
      tagline,
      bannerImage,
      image,
      displayOrder,
      isFeatured,
      status,
      seoTitle,
      metaDescription,
      imageAltText,
      productIds,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: { message: "Collection name and slug are required.", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, "-");

    const collectionId = await convexMutation(api.collections.create, {
      name,
      slug: cleanSlug,
      description: description || undefined,
      tagline: tagline || undefined,
      bannerImage: bannerImage || undefined,
      image:
        image ||
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      displayOrder: Number(displayOrder) || 0,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      status: status || "PUBLISHED",
      seoTitle: seoTitle || `${name} | ModularHome.com Collection`,
      metaDescription: metaDescription || description || undefined,
      imageAltText: imageAltText || name,
      productIds: Array.isArray(productIds) ? (productIds as any) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: { _id: collectionId, name, slug: cleanSlug },
      message: "Collection created successfully.",
    });
  } catch (error: any) {
    console.error("Error creating collection:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to create collection.", code: "CREATE_ERROR" } },
      { status: 500 }
    );
  }
}
