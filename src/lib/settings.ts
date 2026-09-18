import { convexQuery, api } from "./convex";

export interface PublicGlobalSettings {
  companyName: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  email: string;
  address: string;
  socialLinks: Record<string, string>;
  announcementEnabled: boolean;
  announcementText: string;
  announcementLink: string;
  navLinks: Array<{ label: string; href: string }>;
  footerText: string;
  footerLinks: Array<{ label: string; href: string }>;
  defaultSeoTitle: string;
  defaultMetaDescription: string;
  ctaLabel: string;
  ctaLink: string;
}

const DEFAULT_SETTINGS: PublicGlobalSettings = {
  companyName: "ModularHome.com",
  logoUrl: "/newlogo2.png",
  faviconUrl: "/favicon.ico",
  phone: "+1 (812) 595-4033",
  email: "contact@modularhome.com",
  address: "Factory Headquarters, IN & Nationwide Delivery",
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  announcementEnabled: true,
  announcementText: "Direct Factory Modular & Prefab Home Builder • 2026 Models Released",
  announcementLink: "/buildings",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Cabins", href: "/buildings?category=Cabins" },
    { label: "Barndominiums", href: "/buildings?category=Barndominiums" },
    { label: "Floor Plans", href: "/upload-floor-plan" },
    { label: "Videos", href: "/videos" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  footerText: "ModularHome.com leads the American prefabricated housing movement with precision-engineered modular residences, luxury barndominiums, and rapid-deployment cabin kits.",
  footerLinks: [
    { label: "Cabins", href: "/buildings?category=Cabins" },
    { label: "Barndominiums", href: "/buildings?category=Barndominiums" },
    { label: "Floor Plans", href: "/upload-floor-plan" },
    { label: "Video Gallery", href: "/videos" },
    { label: "Quote Wizard", href: "/quote" },
  ],
  defaultSeoTitle: "ModularHome.com | Modern Homes. A Smarter Way to Build.",
  defaultMetaDescription: "Explore modular homes, prefab homes, cabins, ADUs, barndominiums, floor plans and custom home options.",
  ctaLabel: "Get Your Free Quote",
  ctaLink: "/quote",
};

export async function getPublicGlobalSettings(): Promise<PublicGlobalSettings> {
  try {
    const raw = await convexQuery<any>(api.settings.get, {});

    if (!raw) return DEFAULT_SETTINGS;

    let socialLinks = DEFAULT_SETTINGS.socialLinks;
    try {
      if (raw.socialLinks) {
        socialLinks = typeof raw.socialLinks === "string" ? JSON.parse(raw.socialLinks) : raw.socialLinks;
      }
    } catch {}

    let navLinks = DEFAULT_SETTINGS.navLinks;
    try {
      if (raw.navLinks) {
        navLinks = typeof raw.navLinks === "string" ? JSON.parse(raw.navLinks) : raw.navLinks;
      }
    } catch {}

    let footerLinks = DEFAULT_SETTINGS.footerLinks;
    try {
      if (raw.footerLinks) {
        footerLinks = typeof raw.footerLinks === "string" ? JSON.parse(raw.footerLinks) : raw.footerLinks;
      }
    } catch {}

    return {
      companyName: raw.companyName || DEFAULT_SETTINGS.companyName,
      logoUrl: raw.logoUrl || DEFAULT_SETTINGS.logoUrl,
      faviconUrl: raw.faviconUrl || DEFAULT_SETTINGS.faviconUrl,
      phone: raw.phone || DEFAULT_SETTINGS.phone,
      email: raw.email || DEFAULT_SETTINGS.email,
      address: raw.address || DEFAULT_SETTINGS.address,
      socialLinks,
      announcementEnabled: raw.announcementEnabled ?? true,
      announcementText: raw.announcementText || DEFAULT_SETTINGS.announcementText,
      announcementLink: raw.announcementLink || DEFAULT_SETTINGS.announcementLink,
      navLinks,
      footerText: raw.footerText || DEFAULT_SETTINGS.footerText,
      footerLinks,
      defaultSeoTitle: raw.defaultSeoTitle || DEFAULT_SETTINGS.defaultSeoTitle,
      defaultMetaDescription: raw.defaultMetaDescription || DEFAULT_SETTINGS.defaultMetaDescription,
      ctaLabel: raw.ctaLabel || DEFAULT_SETTINGS.ctaLabel,
      ctaLink: raw.ctaLink || DEFAULT_SETTINGS.ctaLink,
    };
  } catch (error) {
    console.warn("Could not fetch global settings from Convex, using defaults:", error);
    return DEFAULT_SETTINGS;
  }
}
