"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Search,
  FolderOpen,
  Home,
  Check,
} from "lucide-react";

export default function AdminEditCollectionPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params?.id as string;

  const [collection, setCollection] = useState<any>(null);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch(`/api/admin/collections/${collectionId}`).then((r) => r.json()),
    ])
      .then(([prodsJson, collJson]) => {
        if (prodsJson.success) setAllProducts(prodsJson.data || []);
        if (collJson.success) {
          const c = collJson.data;
          setCollection(c);
          const assigned = c.products?.map((p: any) => p.productId || p.product?.id) || [];
          setSelectedProductIds(assigned);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [collectionId]);

  const handleProductToggle = (prodId: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(prodId) ? prev.filter((id) => id !== prodId) : [...prev, prodId]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/collections/${collectionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...collection,
          productIds: selectedProductIds,
        }),
      });
      const json = await res.json();

      if (json.success) {
        setMessage({ type: "success", text: "Collection updated successfully!" });
      } else {
        setMessage({ type: "error", text: json.error?.message || "Failed to update collection." });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Network error." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
        <span>Loading collection data...</span>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-gray-600">Collection not found.</p>
        <Link href="/admin/collections" className="text-xs font-bold text-[#e20b16] mt-2 inline-block">
          ← Back to Collections
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/collections"
            className="p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#101114] tracking-tight">
              Edit Collection: {collection.name}
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Slug: /{collection.slug} • {selectedProductIds.length} Models Assigned
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Collection</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Models assignment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Collection Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Collection Name *</label>
                <input
                  type="text"
                  required
                  value={collection.name || ""}
                  onChange={(e) => setCollection({ ...collection, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={collection.slug || ""}
                  onChange={(e) => setCollection({ ...collection, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={collection.tagline || ""}
                onChange={(e) => setCollection({ ...collection, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={collection.description || ""}
                onChange={(e) => setCollection({ ...collection, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>

          {/* Product Multi-Select Assignment */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900">
                <Home className="w-4 h-4 text-[#e20b16]" />
                <span>Assigned Home Models ({selectedProductIds.length})</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
              {allProducts.map((prod) => {
                const isSelected = selectedProductIds.includes(prod.id);
                return (
                  <div
                    key={prod.id}
                    onClick={() => handleProductToggle(prod.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#e20b16] bg-red-50/40 text-black shadow-xs"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                      <Image
                        src={prod.primaryImage}
                        alt={prod.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs truncate">{prod.name}</div>
                      <div className="text-[10px] text-gray-500 truncate">
                        ${prod.startingPrice?.toLocaleString()} • {prod.sqft} sq ft
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-[#e20b16] text-white" : "border border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              <Search className="w-4 h-4 text-[#e20b16]" />
              <span>Collection SEO Metadata</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">SEO Title</label>
              <input
                type="text"
                value={collection.seoTitle || ""}
                onChange={(e) => setCollection({ ...collection, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Meta Description</label>
              <textarea
                rows={2}
                value={collection.metaDescription || ""}
                onChange={(e) => setCollection({ ...collection, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Media & Images
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Cover Image URL</label>
              <input
                type="text"
                value={collection.image || ""}
                onChange={(e) => setCollection({ ...collection, image: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
              {collection.image && (
                <div className="mt-2 relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-gray-200">
                  <Image src={collection.image} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Banner Image URL</label>
              <input
                type="text"
                value={collection.bannerImage || ""}
                onChange={(e) => setCollection({ ...collection, bannerImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Status & Sorting
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
              <select
                value={collection.status || "PUBLISHED"}
                onChange={(e) => setCollection({ ...collection, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-gray-900 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={!!collection.isFeatured}
                onChange={(e) => setCollection({ ...collection, isFeatured: e.target.checked })}
                className="w-4 h-4 text-[#e20b16] rounded-sm focus:ring-[#e20b16]"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
