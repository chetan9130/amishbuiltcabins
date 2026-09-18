import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get("pageId");

    let sections: any[];
    if (pageId) {
      sections =
        (await convexQuery<any[]>(api.sections.listByPage, {
          pageId: pageId as any,
        })) || [];
    } else {
      sections = (await convexQuery<any[]>(api.sections.listAll, {})) || [];
    }

    return NextResponse.json({
      success: true,
      data: sections,
    });
  } catch (error: any) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch sections.", code: "DB_ERROR" } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();
    const { pageId, type, title, subtitle, content, order, isVisible } = body;

    if (!pageId || !type) {
      return NextResponse.json(
        { success: false, error: { message: "Page ID and Section Type are required.", code: "VALIDATION_ERROR" } },
        { status: 400 }
      );
    }

    const sectionId = await convexMutation(api.sections.create, {
      pageId: pageId as any,
      type: type.toUpperCase(),
      title: title || undefined,
      subtitle: subtitle || undefined,
      content: typeof content === "object" ? JSON.stringify(content) : content || undefined,
      order: typeof order === "number" ? order : 1,
      isVisible: isVisible !== undefined ? isVisible : true,
    });

    return NextResponse.json({
      success: true,
      data: { _id: sectionId },
      message: "Section created successfully.",
    });
  } catch (error: any) {
    console.error("Error creating section:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to create section.", code: "CREATE_ERROR" } },
      { status: 500 }
    );
  }
}

// Bulk reorder or visibility toggle
export async function PUT(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();
    const { action, reorderedItems, sectionId, isVisible } = body;

    if (action === "reorder" && Array.isArray(reorderedItems)) {
      const orderedIds = reorderedItems.map((item: any) => item._id || item.id);
      await convexMutation(api.sections.reorder, { orderedIds });
      return NextResponse.json({ success: true, message: "Sections reordered successfully." });
    }

    if (action === "toggleVisibility" && sectionId) {
      await convexMutation(api.sections.toggleVisibility, {
        id: sectionId as any,
        isVisible: !!isVisible,
      });
      return NextResponse.json({ success: true, message: "Visibility updated." });
    }

    return NextResponse.json(
      { success: false, error: { message: "Invalid action specified.", code: "INVALID_ACTION" } },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error updating sections:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to process section update.", code: "UPDATE_ERROR" } },
      { status: 500 }
    );
  }
}
