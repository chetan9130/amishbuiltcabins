"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FolderOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Home,
  X,
} from "lucide-react";

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Create Modal
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    isFeatured: true,
    status: "PUBLISHED",
  });
  const [createError, setCreateError] = useState("");

  const fetchCollections = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/collections", window.location.origin);
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setCollections(json.data || []);
      }
    } catch (e) {
      console.error("Error loading collections:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setCreateError("");

    try {
      const res = await fetch("/api/admin/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const json = await res.json();

      if (json.success) {
        setCreateModalOpen(false);
        setCreateForm({
          name: "",
          slug: "",
          tagline: "",
          description: "",
          image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
          isFeatured: true,
          status: "PUBLISHED",
        });
        await fetchCollections();
      } else {
        setCreateError(json.error?.message || "Failed to create collection.");
      }
    } catch (e: any) {
      setCreateError(e.message || "Network error.");
    } finally {
      setIsCreating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the collection "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/collections/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setCollections((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(json.error?.message || "Failed to delete collection.");
      }
    } catch (e) {
      alert("Failed to delete collection.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#101114] tracking-tight">
            Collection Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Organize modular models into curated categories, lines, and promotional collections.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Collections Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
          <span>Loading collections...</span>
        </div>
      ) : collections.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-gray-400 text-xs border border-[#e5e7eb]">
          No collections found. Click &quot;New Collection&quot; to create your first housing category.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {collections.map((coll) => (
            <div
              key={coll.id}
              className="bg-white rounded-2xl border border-[#e5e7eb] shadow-xs overflow-hidden flex flex-col group hover:shadow-md hover:border-gray-300 transition-all"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
                {coll.image ? (
                  <Image
                    src={coll.image}
                    alt={coll.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <FolderOpen className="w-8 h-8 opacity-40" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold">
                    {coll._count?.products || 0} Models
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-900">{coll.name}</h3>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        coll.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {coll.status}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-500 mt-0.5">/{coll.slug}</p>
                  {coll.tagline && (
                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">{coll.tagline}</p>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/admin/collections/${coll.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e20b16] hover:underline"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit & Assign Models</span>
                  </Link>

                  <button
                    onClick={() => handleDelete(coll.id, coll.name)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Collection"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 animate-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-gray-900">
                Create New Collection
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

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Collection Name *</label>
                <input
                  type="text"
                  required
                  value={createForm.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                    setCreateForm({ ...createForm, name, slug });
                  }}
                  placeholder="e.g. Modern Barndominiums"
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
                  placeholder="e.g. modern-barndominiums"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono text-[11px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tagline</label>
                <input
                  type="text"
                  value={createForm.tagline}
                  onChange={(e) => setCreateForm({ ...createForm, tagline: e.target.value })}
                  placeholder="e.g. Premium rigid-frame barndominiums with Scandinavian interiors."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={createForm.image}
                  onChange={(e) => setCreateForm({ ...createForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
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
                  <span>Create Collection</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
