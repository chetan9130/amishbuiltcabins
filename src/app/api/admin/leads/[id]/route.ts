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
    const lead = await convexQuery<any>(api.leads.getById, { id: id as any });

    if (!lead) {
      return NextResponse.json(
        { success: false, error: { message: "Lead not found.", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error: any) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch lead.", code: "DB_ERROR" } },
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

    const updated = await convexMutation(api.leads.updateStatus, {
      id: id as any,
      status: body.status || "NEW",
      notes: body.notes,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Lead status updated.",
    });
  } catch (error: any) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update lead.", code: "UPDATE_ERROR" } },
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
    await convexMutation(api.leads.remove, { id: id as any });

    return NextResponse.json({
      success: true,
      message: "Lead record deleted.",
    });
  } catch (error: any) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete lead.", code: "DELETE_ERROR" } },
      { status: 500 }
    );
  }
}
