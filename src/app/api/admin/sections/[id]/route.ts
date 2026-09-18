import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexMutation, api } from "@/lib/convex";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await convexMutation(api.sections.update, {
      id: id as any,
      type: body.type ? body.type.toUpperCase() : undefined,
      title: body.title !== undefined ? body.title : undefined,
      subtitle: body.subtitle !== undefined ? body.subtitle : undefined,
      content:
        body.content !== undefined
          ? typeof body.content === "object"
            ? JSON.stringify(body.content)
            : body.content
          : undefined,
      order: body.order !== undefined ? body.order : undefined,
      isVisible: body.isVisible !== undefined ? body.isVisible : undefined,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Section updated successfully.",
    });
  } catch (error: any) {
    console.error("Error updating section:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update section.", code: "UPDATE_ERROR" } },
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
    await convexMutation(api.sections.remove, { id: id as any });

    return NextResponse.json({
      success: true,
      message: "Section deleted successfully.",
    });
  } catch (error: any) {
    console.error("Error deleting section:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to delete section.", code: "DELETE_ERROR" } },
      { status: 500 }
    );
  }
}
