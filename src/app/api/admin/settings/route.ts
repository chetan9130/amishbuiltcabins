import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/auth";
import { convexQuery, convexMutation, api } from "@/lib/convex";

export async function GET() {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    let settings = await convexQuery<any>(api.settings.get, {});

    return NextResponse.json({
      success: true,
      data: settings || {},
    });
  } catch (error: any) {
    console.error("Error fetching global settings:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to retrieve settings.", code: "DB_ERROR" } },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const authResult = await requireAdminAuth();
  if (authResult instanceof NextResponse) return authResult;

  try {
    const body = await request.json();

    const socialLinks =
      typeof body.socialLinks === "object"
        ? JSON.stringify(body.socialLinks)
        : body.socialLinks;

    const navLinks =
      typeof body.navLinks === "object"
        ? JSON.stringify(body.navLinks)
        : body.navLinks;

    const footerLinks =
      typeof body.footerLinks === "object"
        ? JSON.stringify(body.footerLinks)
        : body.footerLinks;

    const updated = await convexMutation(api.settings.update, {
      companyName: body.companyName,
      logoUrl: body.logoUrl,
      faviconUrl: body.faviconUrl,
      phone: body.phone,
      email: body.email,
      address: body.address,
      socialLinks,
      announcementEnabled: body.announcementEnabled,
      announcementText: body.announcementText,
      announcementLink: body.announcementLink,
      navLinks,
      footerText: body.footerText,
      footerLinks,
      defaultSeoTitle: body.defaultSeoTitle,
      defaultMetaDescription: body.defaultMetaDescription,
      ctaLabel: body.ctaLabel,
      ctaLink: body.ctaLink,
    });

    return NextResponse.json({
      success: true,
      data: updated,
      message: "Global settings updated successfully.",
    });
  } catch (error: any) {
    console.error("Error updating global settings:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to update global settings.", code: "UPDATE_ERROR" } },
      { status: 500 }
    );
  }
}
