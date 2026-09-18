"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Globe,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  Mail,
  MapPin,
  Megaphone,
  Navigation,
  FileText,
  Search,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    companyName: "",
    logoUrl: "",
    faviconUrl: "",
    phone: "",
    email: "",
    address: "",
    socialLinks: { facebook: "", instagram: "", youtube: "" },
    announcementEnabled: true,
    announcementText: "",
    announcementLink: "",
    navLinks: [],
    footerText: "",
    footerLinks: [],
    defaultSeoTitle: "",
    defaultMetaDescription: "",
    ctaLabel: "",
    ctaLink: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        setSettings({
          ...d,
          socialLinks: typeof d.socialLinks === "string" ? JSON.parse(d.socialLinks || "{}") : d.socialLinks || {},
          navLinks: typeof d.navLinks === "string" ? JSON.parse(d.navLinks || "[]") : d.navLinks || [],
          footerLinks: typeof d.footerLinks === "string" ? JSON.parse(d.footerLinks || "[]") : d.footerLinks || [],
        });
      }
    } catch (e) {
      setMessage({ type: "error", text: "Failed to load settings." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      const json = await res.json();

      if (json.success) {
        setMessage({ type: "success", text: "Global website settings saved successfully!" });
      } else {
        setMessage({ type: "error", text: json.error?.message || "Failed to save settings." });
      }
    } catch (e: any) {
      setMessage({ type: "error", text: e.message || "Network error." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#e20b16]" />
        <span className="text-xs font-semibold">Loading Global Settings...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#101114] tracking-tight">
            Global Website Settings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Configure site-wide branding, contact info, top announcement, navigation links, and SEO defaults without modifying source code.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Settings</span>
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-xs font-semibold ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Branding Section */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
            <Globe className="w-4 h-4 text-[#e20b16]" />
            <span>Company Branding</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={settings.companyName || ""}
              onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Logo Image URL</label>
            <input
              type="text"
              value={settings.logoUrl || ""}
              onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
            {settings.logoUrl && (
              <div className="mt-2 p-3 bg-gray-900 rounded-xl inline-block border border-gray-800">
                <Image
                  src={settings.logoUrl}
                  alt="Logo Preview"
                  width={140}
                  height={32}
                  className="h-6 w-auto object-contain"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Favicon URL</label>
            <input
              type="text"
              value={settings.faviconUrl || ""}
              onChange={(e) => setSettings({ ...settings, faviconUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>
        </div>

        {/* 2. Contact Information */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
            <Phone className="w-4 h-4 text-[#e20b16]" />
            <span>Direct Contact Information</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              value={settings.phone || ""}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Public Email Address</label>
            <input
              type="email"
              value={settings.email || ""}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Physical Address / Headquarters</label>
            <input
              type="text"
              value={settings.address || ""}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>
        </div>

        {/* 3. Top Announcement Banner */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
              <Megaphone className="w-4 h-4 text-[#e20b16]" />
              <span>Announcement Top Bar</span>
            </div>
            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={!!settings.announcementEnabled}
                onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                className="w-4 h-4 text-[#e20b16] rounded-sm focus:ring-[#e20b16]"
              />
              <span>Enabled</span>
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Banner Announcement Text</label>
            <input
              type="text"
              value={settings.announcementText || ""}
              onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
              placeholder="Direct Factory Modular & Prefab Home Builder • 2026 Models Released"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Banner Target Link</label>
            <input
              type="text"
              value={settings.announcementLink || ""}
              onChange={(e) => setSettings({ ...settings, announcementLink: e.target.value })}
              placeholder="/buildings"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>
        </div>

        {/* 4. Social Media Links */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
            <LinkIcon className="w-4 h-4 text-[#e20b16]" />
            <span>Social Media Channels</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Facebook URL</label>
            <input
              type="text"
              value={settings.socialLinks?.facebook || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                })
              }
              placeholder="https://facebook.com/modularhome"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Instagram URL</label>
            <input
              type="text"
              value={settings.socialLinks?.instagram || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                })
              }
              placeholder="https://instagram.com/modularhome"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">YouTube Channel URL</label>
            <input
              type="text"
              value={settings.socialLinks?.youtube || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  socialLinks: { ...settings.socialLinks, youtube: e.target.value },
                })
              }
              placeholder="https://youtube.com/@modularhome"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
            />
          </div>
        </div>

        {/* 5. Default SEO Meta */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
            <Search className="w-4 h-4 text-[#e20b16]" />
            <span>Default Global SEO Metadata</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Default Meta Title ({settings.defaultSeoTitle?.length || 0}/60 chars)
              </label>
              <input
                type="text"
                value={settings.defaultSeoTitle || ""}
                onChange={(e) => setSettings({ ...settings, defaultSeoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Default Meta Description ({settings.defaultMetaDescription?.length || 0}/160 chars)
              </label>
              <textarea
                rows={3}
                value={settings.defaultMetaDescription || ""}
                onChange={(e) => setSettings({ ...settings, defaultMetaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>
        </div>

        {/* 6. Main CTA Button */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
            <Sparkles className="w-4 h-4 text-[#e20b16]" />
            <span>Primary Global CTA Configuration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">CTA Button Label</label>
              <input
                type="text"
                value={settings.ctaLabel || ""}
                onChange={(e) => setSettings({ ...settings, ctaLabel: e.target.value })}
                placeholder="Get Your Free Quote"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">CTA Destination URL</label>
              <input
                type="text"
                value={settings.ctaLink || ""}
                onChange={(e) => setSettings({ ...settings, ctaLink: e.target.value })}
                placeholder="/quote"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
