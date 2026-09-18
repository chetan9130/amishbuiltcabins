import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const source = searchParams.get("source") || undefined;

    const leads =
      (await convexQuery<any[]>(api.leads.list, {
        status: status && status !== "ALL" ? status : undefined,
        source: source && source !== "ALL" ? source : undefined,
      })) || [];

    return NextResponse.json({
      success: true,
      data: leads,
    });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch leads.", code: "DB_ERROR" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, location, zip, enquiryDetails, source, notes } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: { message: "Name and email are required.", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const leadId = await convexMutation(api.leads.create, {
      name,
      email: email.toLowerCase().trim(),
      phone: phone || undefined,
      location: location || undefined,
      zip: zip || undefined,
      enquiryDetails: enquiryDetails || undefined,
      source: source || "WEBSITE",
      notes: notes || undefined,
    });

    return NextResponse.json({
      success: true,
      data: { _id: leadId, name, email },
      message: "Lead inquiry registered successfully.",
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to record lead inquiry.", code: "CREATE_ERROR" } },
      { status: 500 }
    );
  }
}
