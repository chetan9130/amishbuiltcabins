"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Save,
  ArrowLeft,
  Search,
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function AdminEditPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params?.id as string;

  const [page, setPage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchPage = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/pages/${pageId}`);
      const json = await res.json();
      if (json.success) {
        setPage(json.data);
      } else {
        setMessage({ type: "error", text: "Page not found." });
      }
    } catch (e) {
      setMessage({ type: "error", text: "Error loading page details." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (pageId) fetchPage();
  }, [pageId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/pages/${pageId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      const json = await res.json();

      if (json.success) {
        setMessage({ type: "success", text: "Page updated successfully!" });
      } else {
        setMessage({ type: "error", text: json.error?.message || "Failed to update page." });
      }
    } catch (e: any) {
      setMessage({ type: "error", text: e.message || "Network error." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
        <span>Loading page data...</span>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-gray-600">Page not found.</p>
        <Link href="/admin/pages" className="text-xs font-bold text-[#e20b16] mt-2 inline-block">
          ← Back to Pages
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in pb-12">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/pages"
            className="p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#101114] tracking-tight">
              Edit Page: {page.title}
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Route: /{page.slug === "home" ? "" : page.slug}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/sections?pageId=${page.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
          >
            <Layers className="w-4 h-4 text-gray-600" />
            <span>Manage Sections ({page.sections?.length || 0})</span>
          </Link>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save Changes</span>
          </button>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Page Core Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Page Content & Identification
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Page Title *</label>
              <input
                type="text"
                required
                value={page.title || ""}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Slug / URL Path *</label>
              <input
                type="text"
                required
                value={page.slug || ""}
                onChange={(e) => setPage({ ...page, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle</label>
              <input
                type="text"
                value={page.subtitle || ""}
                onChange={(e) => setPage({ ...page, subtitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Body Content (HTML / Markdown)</label>
              <textarea
                rows={8}
                value={page.content || ""}
                onChange={(e) => setPage({ ...page, content: e.target.value })}
                placeholder="Enter rich text or narrative content for this page..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              <Search className="w-4 h-4 text-[#e20b16]" />
              <span>Search Engine Optimization (SEO)</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">SEO Title</label>
                <span className={`text-[10px] ${page.seoTitle?.length > 60 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {page.seoTitle?.length || 0} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={page.seoTitle || ""}
                onChange={(e) => setPage({ ...page, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Meta Description</label>
                <span className={`text-[10px] ${page.metaDescription?.length > 160 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {page.metaDescription?.length || 0} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={page.metaDescription || ""}
                onChange={(e) => setPage({ ...page, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Canonical URL</label>
              <input
                type="text"
                value={page.canonicalUrl || ""}
                onChange={(e) => setPage({ ...page, canonicalUrl: e.target.value })}
                placeholder="https://modularhome.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Status & Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Page Status & Visibility
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
              <select
                value={page.status || "PUBLISHED"}
                onChange={(e) => setPage({ ...page, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Featured Image URL</label>
              <input
                type="text"
                value={page.featuredImage || ""}
                onChange={(e) => setPage({ ...page, featuredImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500 space-y-1">
              <div>Created: {new Date(page.createdAt).toLocaleString()}</div>
              <div>Last Modified: {new Date(page.updatedAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
