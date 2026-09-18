import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const isPublishedParam = searchParams.get("isPublished");
    const isPublished =
      isPublishedParam !== null && isPublishedParam !== undefined && isPublishedParam !== ""
        ? isPublishedParam === "true"
        : undefined;

    const products =
      (await convexQuery<any[]>(api.products.list, {
        category: category && category !== "ALL" ? category : undefined,
        isPublished,
      })) || [];

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    console.error("Error fetching admin products:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch products.", code: "DB_ERROR" } },
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
      tagline,
      description,
      shortDescription,
      category,
      series,
      architecturalStyle,
      sqft,
      bedrooms,
      bathrooms,
      stories,
      startingPrice,
      dimensions,
      frameType,
      roofPitch,
      windRating,
      snowLoad,
      warranty,
      primaryImage,
      gallery,
      floorPlanImage,
      videoUrl,
      features,
      specs,
      customizableOptions,
      isPublished,
      isFeatured,
      displayOrder,
      seoTitle,
      metaDescription,
      imageAltText,
      canonicalUrl,
      collectionIds,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { success: false, error: { message: "Product name and slug are required.", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9_-]+/g, "-");

    const productId = await convexMutation(api.products.create, {
      name,
      slug: cleanSlug,
      tagline: tagline || undefined,
      description: description || undefined,
      shortDescription: shortDescription || tagline || undefined,
      category: category || "Residential",
      series: series || undefined,
      architecturalStyle: architecturalStyle || "Modern Architectural",
      sqft: Number(sqft) || 1000,
      bedrooms: Number(bedrooms) || 2,
      bathrooms: Number(bathrooms) || 2,
      stories: Number(stories) || 1,
      startingPrice: Number(startingPrice) || 50000,
      dimensions: dimensions || undefined,
      frameType: frameType || undefined,
      roofPitch: roofPitch || undefined,
      windRating: windRating || undefined,
      snowLoad: snowLoad || undefined,
      warranty: warranty || "10-Year Structural",
      primaryImage:
        primaryImage ||
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      gallery: typeof gallery === "object" ? JSON.stringify(gallery) : gallery || undefined,
      floorPlanImage: floorPlanImage || undefined,
      videoUrl: videoUrl || undefined,
      features: typeof features === "object" ? JSON.stringify(features) : features || undefined,
      specs: typeof specs === "object" ? JSON.stringify(specs) : specs || undefined,
      customizableOptions:
        typeof customizableOptions === "object"
          ? JSON.stringify(customizableOptions)
          : customizableOptions || undefined,
      isPublished: isPublished !== undefined ? isPublished : true,
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      displayOrder: Number(displayOrder) || 0,
      seoTitle: seoTitle || `${name} | ModularHome.com`,
      metaDescription: metaDescription || description || undefined,
      imageAltText: imageAltText || name,
      canonicalUrl: canonicalUrl || undefined,
      collectionIds: Array.isArray(collectionIds) ? (collectionIds as any) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: { _id: productId, name, slug: cleanSlug },
      message: "Product created successfully.",
    });
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to create product.", code: "CREATE_ERROR" } },
      { status: 500 }
    );
  }
}
