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
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  TrendingUp,
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
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#e20b16]" />
        <span className="text-xs font-semibold">Loading Admin Dashboard...</span>
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
      label: "Products / Models",
      value: metrics.totalProducts,
      subtext: "Catalog models in database",
      href: "/admin/products",
      icon: Home,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Collections",
      value: metrics.totalCollections,
      subtext: "Categorized housing lines",
      href: "/admin/collections",
      icon: FolderOpen,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Core Pages",
      value: metrics.totalPages,
      subtext: "Editable CMS pages",
      href: "/admin/pages",
      icon: FileText,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Published Blogs",
      value: metrics.publishedBlogs,
      subtext: "Educational articles & guides",
      href: "/admin/blogs",
      icon: BookOpen,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Total Leads",
      value: metrics.totalLeads,
      subtext: `${metrics.newLeads} new unread inquiries`,
      href: "/admin/leads",
      icon: Users,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Quotations",
      value: metrics.totalQuotations,
      subtext: `${metrics.pendingQuotations} pending review`,
      href: "/admin/quotations",
      icon: FileSpreadsheet,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#101114] to-[#1c1e24] rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Phase 1 CMS Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            ModularHome Control Center
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
            Manage your global branding, catalog products, collections, pages, sections, blogs, and customer inquiries from one central hub.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Product</span>
          </Link>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/10 transition-all"
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
              className="bg-white p-5 rounded-2xl border border-[#e5e7eb] shadow-xs hover:shadow-md hover:border-gray-300 transition-all group relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="p-1 text-gray-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-[#101114] tracking-tight">
                  {card.value}
                </div>
                <div className="text-xs font-bold text-gray-700 mt-1 uppercase tracking-wider">
                  {card.label}
                </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  {card.subtext}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Access Section Links */}
      <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs">
        <h2 className="text-sm font-black uppercase tracking-wider text-[#101114] mb-4">
          Quick Management Shortcuts
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <Link
            href="/admin/settings"
            className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-center text-xs font-bold text-gray-800 transition-colors border border-gray-100 flex flex-col items-center gap-2"
          >
            <Globe className="w-5 h-5 text-gray-600" />
            <span>Global Settings</span>
          </Link>
          <Link
            href="/admin/sections"
            className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-center text-xs font-bold text-gray-800 transition-colors border border-gray-100 flex flex-col items-center gap-2"
          >
            <Layers className="w-5 h-5 text-gray-600" />
            <span>Page Sections</span>
          </Link>
          <Link
            href="/admin/products"
            className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-center text-xs font-bold text-gray-800 transition-colors border border-gray-100 flex flex-col items-center gap-2"
          >
            <Home className="w-5 h-5 text-gray-600" />
            <span>Home Models</span>
          </Link>
          <Link
            href="/admin/collections"
            className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-center text-xs font-bold text-gray-800 transition-colors border border-gray-100 flex flex-col items-center gap-2"
          >
            <FolderOpen className="w-5 h-5 text-gray-600" />
            <span>Collections</span>
          </Link>
          <Link
            href="/admin/blogs"
            className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-center text-xs font-bold text-gray-800 transition-colors border border-gray-100 flex flex-col items-center gap-2"
          >
            <BookOpen className="w-5 h-5 text-gray-600" />
            <span>Blog Articles</span>
          </Link>
          <Link
            href="/admin/videos"
            className="p-3.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-center text-xs font-bold text-gray-800 transition-colors border border-gray-100 flex flex-col items-center gap-2"
          >
            <Video className="w-5 h-5 text-gray-600" />
            <span>YouTube Sync</span>
          </Link>
        </div>
      </div>

      {/* Two Column Grid: Recent Leads & Recent Quotes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#101114]">
                Recent Inquiries & Leads
              </h3>
              <p className="text-[11px] text-gray-500">Intake from contact form & AI chat</p>
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
                  key={lead.id}
                  className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-gray-900">{lead.name}</div>
                    <div className="text-gray-500 text-[11px]">{lead.email} {lead.phone && `• ${lead.phone}`}</div>
                    {lead.enquiryDetails && (
                      <div className="text-gray-600 text-[11px] mt-1 line-clamp-1 italic">
                        &ldquo;{lead.enquiryDetails}&rdquo;
                      </div>
                    )}
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 shrink-0">
                    {lead.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-400 text-center py-6">No leads recorded yet.</div>
            )}
          </div>
        </div>

        {/* Recent Quotations */}
        <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#101114]">
                Recent Quote Submissions
              </h3>
              <p className="text-[11px] text-gray-500">Calculator estimations from QuoteWizard</p>
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
                  key={quote.id}
                  className="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-gray-900">{quote.customerName}</div>
                    <div className="text-gray-500 text-[11px]">
                      {quote.modelName || "Custom Model"} • {quote.sqft ? `${quote.sqft} sq ft` : "Custom Size"}
                    </div>
                    {quote.estimatedAmount && (
                      <div className="text-[#e20b16] font-bold text-xs mt-1">
                        Est: ${quote.estimatedAmount.toLocaleString()}
                      </div>
                    )}
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-700 shrink-0">
                    {quote.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-400 text-center py-6">No quote requests recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
