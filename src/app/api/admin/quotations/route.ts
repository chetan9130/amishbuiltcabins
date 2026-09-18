import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;

    const quotations =
      (await convexQuery<any[]>(api.quotations.list, {
        status: status && status !== "ALL" ? status : undefined,
      })) || [];

    return NextResponse.json({
      success: true,
      data: quotations,
    });
  } catch (error: any) {
    console.error("Error fetching quotations:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch quotations.", code: "DB_ERROR" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerZip,
      modelSlug,
      modelName,
      sqft,
      dimensions,
      options,
      pricingInputs,
      estimatedAmount,
      timeline,
      requirements,
      source,
    } = body;

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { success: false, error: { message: "Name and email are required.", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const quoteId = await convexMutation(api.quotations.create, {
      customerName,
      customerEmail: customerEmail.toLowerCase().trim(),
      customerPhone: customerPhone || undefined,
      customerZip: customerZip || undefined,
      modelSlug: modelSlug || undefined,
      modelName: modelName || undefined,
      sqft: sqft ? Number(sqft) : undefined,
      dimensions: dimensions || undefined,
      options: typeof options === "object" ? JSON.stringify(options) : options || undefined,
      pricingInputs:
        typeof pricingInputs === "object"
          ? JSON.stringify(pricingInputs)
          : pricingInputs || undefined,
      estimatedAmount: estimatedAmount ? Number(estimatedAmount) : undefined,
      timeline: timeline || undefined,
      requirements: requirements || undefined,
      source: source || "QUOTE_WIZARD",
    });

    return NextResponse.json({
      success: true,
      data: { _id: quoteId, customerName, customerEmail },
      message: "Quotation recorded successfully.",
    });
  } catch (error: any) {
    console.error("Error creating quotation:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to record quotation.", code: "CREATE_ERROR" } },
      { status: 500 }
    );
  }
}
