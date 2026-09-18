"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Layers,
  Plus,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  FileText,
} from "lucide-react";

function SectionsManager() {
  const searchParams = useSearchParams();
  const initialPageId = searchParams.get("pageId") || "";

  const [pages, setPages] = useState<any[]>([]);
  const [selectedPageId, setSelectedPageId] = useState(initialPageId);
  const [sections, setSections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Add Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newSection, setNewSection] = useState({
    type: "HERO",
    title: "",
    subtitle: "",
    content: "",
    isVisible: true,
  });

  const SECTION_TYPES = [
    { value: "HERO", label: "Hero Banner" },
    { value: "TRUST", label: "Trust & Benefits Bar" },
    { value: "PRODUCT_GRID", label: "Products / Models Showcase" },
    { value: "COLLECTION_GRID", label: "Categories / Collections Grid" },
    { value: "HOW_IT_WORKS", label: "How It Works (Steps)" },
    { value: "FINANCING", label: "Financing & Payment Calculator" },
    { value: "VIDEO", label: "Video Gallery Section" },
    { value: "TESTIMONIALS", label: "Customer Testimonials" },
    { value: "FAQ", label: "Frequently Asked Questions" },
    { value: "GALLERY", label: "Image Gallery Carousel" },
    { value: "CTA", label: "Call To Action Banner" },
    { value: "RICH_CONTENT", label: "Rich Text / Narrative" },
  ];

  const fetchPages = async () => {
    try {
      const res = await fetch("/api/admin/pages");
      const json = await res.json();
      if (json.success && json.data) {
        setPages(json.data);
        if (!selectedPageId && json.data.length > 0) {
          setSelectedPageId(json.data[0].id);
        }
      }
    } catch (e) {
      console.error("Error fetching pages:", e);
    }
  };

  const fetchSections = async (pageId: string) => {
    if (!pageId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/sections?pageId=${pageId}`);
      const json = await res.json();
      if (json.success) {
        setSections(json.data || []);
      }
    } catch (e) {
      console.error("Error fetching sections:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (selectedPageId) {
      fetchSections(selectedPageId);
    }
  }, [selectedPageId]);

  const handleToggleVisibility = async (id: string, currentVisible: boolean) => {
    try {
      const res = await fetch("/api/admin/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggleVisibility",
          sectionId: id,
          isVisible: !currentVisible,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSections((prev) =>
          prev.map((s) => (s.id === id ? { ...s, isVisible: !currentVisible } : s))
        );
      }
    } catch (e) {
      alert("Failed to toggle visibility.");
    }
  };

  const handleMove = async (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const newSections = [...sections];
    const [moved] = newSections.splice(index, 1);
    newSections.splice(targetIndex, 0, moved);

    const reordered = newSections.map((item, idx) => ({
      id: item.id,
      order: idx + 1,
    }));

    setSections(newSections.map((item, idx) => ({ ...item, order: idx + 1 })));

    try {
      await fetch("/api/admin/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reorder",
          reorderedItems: reordered,
        }),
      });
    } catch (e) {
      alert("Failed to save section order.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
      const res = await fetch(`/api/admin/sections/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setSections((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (e) {
      alert("Failed to delete section.");
    }
  };

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPageId) return;
    setIsAdding(true);

    try {
      const res = await fetch("/api/admin/sections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pageId: selectedPageId,
          ...newSection,
        }),
      });
      const json = await res.json();

      if (json.success) {
        setAddModalOpen(false);
        setNewSection({
          type: "HERO",
          title: "",
          subtitle: "",
          content: "",
          isVisible: true,
        });
        await fetchSections(selectedPageId);
      } else {
        alert(json.error?.message || "Failed to add section.");
      }
    } catch (e: any) {
      alert(e.message || "Network error.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#101114] tracking-tight">
            Page Section Manager
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Reorder, toggle visibility, and configure dynamic content modules on your pages.
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          disabled={!selectedPageId}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>Add Section</span>
        </button>
      </div>

      {/* Page Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-gray-700">Select Page:</span>
          <select
            value={selectedPageId}
            onChange={(e) => setSelectedPageId(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
          >
            {pages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} (/{p.slug === "home" ? "" : p.slug})
              </option>
            ))}
          </select>
        </div>

        <div className="text-xs text-gray-500">
          Showing <span className="font-bold text-gray-900">{sections.length}</span> configured sections
        </div>
      </div>

      {/* Sections List */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
            <span>Loading sections...</span>
          </div>
        ) : sections.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No sections configured for this page yet. Click &quot;Add Section&quot; above to create one.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                  sec.isVisible ? "hover:bg-gray-50/60" : "bg-gray-50/40 opacity-60"
                }`}
              >
                {/* Left: Reorder arrows + Order badge + Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleMove(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 rounded text-gray-400 hover:text-black disabled:opacity-20 hover:bg-gray-200 transition-colors"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, "down")}
                      disabled={idx === sections.length - 1}
                      className="p-1 rounded text-gray-400 hover:text-black disabled:opacity-20 hover:bg-gray-200 transition-colors"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="w-7 h-7 rounded-lg bg-gray-100 font-mono text-xs font-bold flex items-center justify-center text-gray-700 shrink-0">
                    {sec.order}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-gray-900 text-white font-mono text-[9px] font-bold uppercase tracking-wider">
                        {sec.type}
                      </span>
                      <span className="font-bold text-xs text-gray-900 truncate">
                        {sec.title || "(Untitled Section)"}
                      </span>
                    </div>
                    {sec.subtitle && (
                      <p className="text-[11px] text-gray-500 truncate mt-0.5">
                        {sec.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleVisibility(sec.id, sec.isVisible)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sec.isVisible
                        ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{sec.isVisible ? "Visible" : "Hidden"}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(sec.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Section Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">
                Add Section to Page
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSection} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Section Type *</label>
                <select
                  value={newSection.type}
                  onChange={(e) => setNewSection({ ...newSection, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                >
                  {SECTION_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label} ({t.value})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Heading / Title</label>
                <input
                  type="text"
                  value={newSection.title}
                  onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                  placeholder="e.g. Modern. Affordable. Built For Life."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  value={newSection.subtitle}
                  onChange={(e) => setNewSection({ ...newSection, subtitle: e.target.value })}
                  placeholder="e.g. Explore factory-built homes with premium finishes."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Config Content (Optional JSON / Text)</label>
                <textarea
                  rows={4}
                  value={newSection.content}
                  onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                  placeholder="Enter JSON config or additional rich text payload..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono text-[11px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 font-bold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-5 py-2 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white font-bold disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isAdding && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Add Section</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminSectionsPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-gray-400 text-xs">Loading sections manager...</div>}>
      <SectionsManager />
    </Suspense>
  );
}
