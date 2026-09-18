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
    const quotation = await convexQuery<any>(api.quotations.getById, {
      id: id as any,
    });

    if (!quotation) {
      return NextResponse.json(
        { success: false, error: { message: "Quotation not found.", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: quotation });
  } catch (error: any) {
    console.error("Error fetching quotation:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch quotation.", code: "DB_ERROR" } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await convexMutation(api.quotations.updateStatus, {
      id: id as any,
      status: body.status || "PENDING",
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Quotation status updated.",
    });
  } catch (error: any) {
    console.error("Error updating quotation:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update quotation.", code: "UPDATE_ERROR" } },
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
    await convexMutation(api.quotations.remove, { id: id as any });

    return NextResponse.json({
      success: true,
      message: "Quotation deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting quotation:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete quotation.", code: "DELETE_ERROR" } },
      { status: 500 }
    );
  }
}
