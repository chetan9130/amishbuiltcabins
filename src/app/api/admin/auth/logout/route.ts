import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth";

export async function POST() {
  try {
    await destroyAdminSession();
    return NextResponse.json({
      success: true,
      message: "Successfully logged out.",
    });
  } catch (error: any) {
    console.error("Logout error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Failed to logout.", code: "SERVER_ERROR" },
      },
      { status: 500 }
    );
  }
}
