"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  FolderOpen,
  FileText,
  BookOpen,
  Users,
  FileSpreadsheet,
  ArrowUpRight,
  Plus,
  Globe,
  Layers,
  Video,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/dashboard/stats");
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch (e) {
      console.error("Failed to load dashboard stats:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#6b7280] space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#e20b16]" />
        <span className="text-xs font-bold uppercase tracking-wider">Loading Admin Dashboard...</span>
      </div>
    );
  }

  const metrics = data?.metrics || {
    totalProducts: 0,
    totalCollections: 0,
    totalPages: 0,
    publishedBlogs: 0,
    totalLeads: 0,
    newLeads: 0,
    totalQuotations: 0,
    pendingQuotations: 0,
  };

  const statCards = [
    {
      label: "Home Models",
      value: metrics.totalProducts,
      subtext: "Precision steel catalog models",
      href: "/admin/products",
      icon: Home,
      accent: "border-l-4 border-l-[#e20b16]",
    },
    {
      label: "Collections",
      value: metrics.totalCollections,
      subtext: "Architectural series & groupings",
      href: "/admin/collections",
      icon: FolderOpen,
      accent: "border-l-4 border-l-[#101114]",
    },
    {
      label: "Core Pages",
      value: metrics.totalPages,
      subtext: "Dynamic editable CMS pages",
      href: "/admin/pages",
      icon: FileText,
      accent: "border-l-4 border-l-amber-600",
    },
    {
      label: "Articles & Guides",
      value: metrics.publishedBlogs,
      subtext: "Published construction articles",
      href: "/admin/blogs",
      icon: BookOpen,
      accent: "border-l-4 border-l-emerald-600",
    },
    {
      label: "Inbound Leads",
      value: metrics.totalLeads,
      subtext: `${metrics.newLeads} new unread inquiries`,
      href: "/admin/leads",
      icon: Users,
      accent: "border-l-4 border-l-[#e20b16]",
    },
    {
      label: "Quote Requests",
      value: metrics.totalQuotations,
      subtext: `${metrics.pendingQuotations} pending review`,
      href: "/admin/quotations",
      icon: FileSpreadsheet,
      accent: "border-l-4 border-l-indigo-600",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner with Original Brand Aesthetic */}
      <div className="bg-[#101114] rounded-[18px] p-6 sm:p-8 text-white shadow-[0_12px_35px_rgba(16,24,40,0.1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10 relative overflow-hidden">
        {/* Subtle accent glow */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#e20b16]" />
            <span>ModularHome CMS Online</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
            Management Control Center
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl font-medium">
            Oversee your precision steel models, global branding, architectural series, custom pages, and customer quotation pipeline.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0 relative z-10">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Model</span>
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className={`bg-white p-6 rounded-[18px] border border-[#e7e9ee] shadow-[0_12px_35px_rgba(16,24,40,0.04)] hover:shadow-[0_16px_40px_rgba(16,24,40,0.08)] hover:border-[#d5d9e0] transition-all group relative overflow-hidden ${card.accent}`}
            >
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-[#f6f7f9] text-[#101114] border border-[#e7e9ee] group-hover:bg-red-50 group-hover:text-[#e20b16] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="p-1 text-[#6b7280] group-hover:text-[#e20b16] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-[#101114] tracking-tight font-serif">
                  {card.value}
                </div>
                <div className="text-xs font-bold text-[#101114] mt-1 uppercase tracking-wider">
                  {card.label}
                </div>
                <div className="text-[11px] text-[#6b7280] mt-0.5 font-medium">
                  {card.subtext}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Access Section Links */}
      <div className="bg-white p-6 rounded-[18px] border border-[#e7e9ee] shadow-[0_12px_35px_rgba(16,24,40,0.04)]">
        <h2 className="text-base font-bold tracking-tight text-[#101114] font-serif mb-4">
          Quick Management Navigation
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <Link
            href="/admin/settings"
            className="p-4 rounded-xl bg-[#f6f7f9] hover:bg-red-50 text-center text-xs font-bold text-[#101114] hover:text-[#e20b16] transition-all border border-[#e7e9ee] hover:border-red-200 flex flex-col items-center gap-2.5"
          >
            <Globe className="w-5 h-5" />
            <span>Global Settings</span>
          </Link>
          <Link
            href="/admin/sections"
            className="p-4 rounded-xl bg-[#f6f7f9] hover:bg-red-50 text-center text-xs font-bold text-[#101114] hover:text-[#e20b16] transition-all border border-[#e7e9ee] hover:border-red-200 flex flex-col items-center gap-2.5"
          >
            <Layers className="w-5 h-5" />
            <span>Page Sections</span>
          </Link>
          <Link
            href="/admin/products"
            className="p-4 rounded-xl bg-[#f6f7f9] hover:bg-red-50 text-center text-xs font-bold text-[#101114] hover:text-[#e20b16] transition-all border border-[#e7e9ee] hover:border-red-200 flex flex-col items-center gap-2.5"
          >
            <Home className="w-5 h-5" />
            <span>Home Models</span>
          </Link>
          <Link
            href="/admin/collections"
            className="p-4 rounded-xl bg-[#f6f7f9] hover:bg-red-50 text-center text-xs font-bold text-[#101114] hover:text-[#e20b16] transition-all border border-[#e7e9ee] hover:border-red-200 flex flex-col items-center gap-2.5"
          >
            <FolderOpen className="w-5 h-5" />
            <span>Collections</span>
          </Link>
          <Link
            href="/admin/blogs"
            className="p-4 rounded-xl bg-[#f6f7f9] hover:bg-red-50 text-center text-xs font-bold text-[#101114] hover:text-[#e20b16] transition-all border border-[#e7e9ee] hover:border-red-200 flex flex-col items-center gap-2.5"
          >
            <BookOpen className="w-5 h-5" />
            <span>Blog Articles</span>
          </Link>
          <Link
            href="/admin/videos"
            className="p-4 rounded-xl bg-[#f6f7f9] hover:bg-red-50 text-center text-xs font-bold text-[#101114] hover:text-[#e20b16] transition-all border border-[#e7e9ee] hover:border-red-200 flex flex-col items-center gap-2.5"
          >
            <Video className="w-5 h-5" />
            <span>YouTube Sync</span>
          </Link>
        </div>
      </div>

      {/* Two Column Grid: Recent Leads & Recent Quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white p-6 rounded-[18px] border border-[#e7e9ee] shadow-[0_12px_35px_rgba(16,24,40,0.04)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#e7e9ee] pb-3.5">
            <div>
              <h3 className="text-base font-bold tracking-tight text-[#101114] font-serif">
                Recent Inquiries & Leads
              </h3>
              <p className="text-xs text-[#6b7280]">Intake from contact form, chat & floor plan uploads</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs font-bold text-[#e20b16] hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentLeads?.length > 0 ? (
              data.recentLeads.map((lead: any) => (
                <div
                  key={lead._id || lead.id}
                  className="p-3.5 rounded-xl bg-[#f6f7f9] border border-[#e7e9ee] flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-[#101114]">{lead.name}</div>
                    <div className="text-[#6b7280] text-[11px] font-medium">{lead.email} {lead.phone && `• ${lead.phone}`}</div>
                    {lead.enquiryDetails && (
                      <div className="text-[#101114] text-[11px] mt-1 line-clamp-1 italic">
                        &ldquo;{lead.enquiryDetails}&rdquo;
                      </div>
                    )}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    {lead.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-[#6b7280] text-center py-6">No leads recorded yet.</div>
            )}
          </div>
        </div>

        {/* Recent Quotations */}
        <div className="bg-white p-6 rounded-[18px] border border-[#e7e9ee] shadow-[0_12px_35px_rgba(16,24,40,0.04)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#e7e9ee] pb-3.5">
            <div>
              <h3 className="text-base font-bold tracking-tight text-[#101114] font-serif">
                Recent Quote Submissions
              </h3>
              <p className="text-xs text-[#6b7280]">Calculator estimations from Instant Quote Wizard</p>
            </div>
            <Link
              href="/admin/quotations"
              className="text-xs font-bold text-[#e20b16] hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentQuotations?.length > 0 ? (
              data.recentQuotations.map((quote: any) => (
                <div
                  key={quote._id || quote.id}
                  className="p-3.5 rounded-xl bg-[#f6f7f9] border border-[#e7e9ee] flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-[#101114]">{quote.customerName}</div>
                    <div className="text-[#6b7280] text-[11px] font-medium">
                      {quote.modelName || "Custom Model"} • {quote.sqft ? `${quote.sqft} sq ft` : "Custom Size"}
                    </div>
                    {quote.estimatedAmount && (
                      <div className="text-[#e20b16] font-bold text-xs mt-1">
                        Est: ${quote.estimatedAmount.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                    {quote.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-[#6b7280] text-center py-6">No quote requests recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
