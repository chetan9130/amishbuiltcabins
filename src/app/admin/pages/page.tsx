"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Layers,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

export default function AdminPagesPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Create Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: "",
    slug: "",
    subtitle: "",
    status: "PUBLISHED",
    seoTitle: "",
    metaDescription: "",
  });
  const [createError, setCreateError] = useState("");

  const fetchPages = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/pages", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setPages(json.data || []);
      }
    } catch (e) {
      console.error("Error fetching pages:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPages();
  };

  const handleCreatePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setCreateError("");

    try {
      const res = await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const json = await res.json();

      if (json.success) {
        setCreateModalOpen(false);
        setCreateForm({
          title: "",
          slug: "",
          subtitle: "",
          status: "PUBLISHED",
          seoTitle: "",
          metaDescription: "",
        });
        await fetchPages();
      } else {
        setCreateError(json.error?.message || "Failed to create page.");
      }
    } catch (e: any) {
      setCreateError(e.message || "Network error.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeletePage = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the page "${title}"? This will also remove its configured sections.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/pages/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        await fetchPages();
      } else {
        alert(json.error?.message || "Failed to delete page.");
      }
    } catch (e) {
      alert("Failed to delete page.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#101114] tracking-tight">
            Page Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, and organize core website pages and their dynamic sections.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Page</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or slug..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-500 font-semibold">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-800 font-semibold focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
            <span>Loading pages...</span>
          </div>
        ) : pages.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No pages found matching your query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Page Title</th>
                  <th className="py-3.5 px-4">Slug / Route</th>
                  <th className="py-3.5 px-4">Sections</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Last Updated</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      {page.title}
                      {page.subtitle && (
                        <span className="block text-[11px] font-normal text-gray-500 truncate max-w-xs">
                          {page.subtitle}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-600 text-[11px]">
                      /{page.slug === "home" ? "" : page.slug}
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/admin/sections?pageId=${page.id}`}
                        className="inline-flex items-center gap-1 text-[#e20b16] font-bold hover:underline"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>{page._count?.sections || 0} Sections</span>
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          page.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800"
                            : page.status === "DRAFT"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {page.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                      {new Date(page.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/pages/${page.id}`}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 inline-block transition-colors"
                        title="Edit Page & SEO"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDeletePage(page.id, page.title)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 inline-block transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create Page Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">
                Create New Page
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {createError && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{createError}</span>
              </div>
            )}

            <form onSubmit={handleCreatePage} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Page Title *</label>
                <input
                  type="text"
                  required
                  value={createForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setCreateForm({ ...createForm, title, slug, seoTitle: `${title} | ModularHome.com` });
                  }}
                  placeholder="e.g. Financing Guide"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Slug / URL Path *</label>
                <input
                  type="text"
                  required
                  value={createForm.slug}
                  onChange={(e) => setCreateForm({ ...createForm, slug: e.target.value })}
                  placeholder="e.g. financing-guide"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Subtitle (Optional)</label>
                <input
                  type="text"
                  value={createForm.subtitle}
                  onChange={(e) => setCreateForm({ ...createForm, subtitle: e.target.value })}
                  placeholder="Brief descriptive subtitle"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Publish Status</label>
                <select
                  value={createForm.status}
                  onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                >
                  <option value="PUBLISHED">Published</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 font-bold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white font-bold disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isCreating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Create Page</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
