"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Search,
  Sparkles,
  Home,
  Image as ImageIcon,
  FolderOpen,
} from "lucide-react";

export default function AdminEditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  const [collections, setCollections] = useState<any[]>([]);
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/collections").then((r) => r.json()),
      fetch(`/api/admin/products/${productId}`).then((r) => r.json()),
    ])
      .then(([collJson, prodJson]) => {
        if (collJson.success) setCollections(collJson.data || []);
        if (prodJson.success) {
          const p = prodJson.data;
          const assignedIds = p.collections?.map((c: any) => c.collectionId || c.collection?.id) || [];
          setProduct({
            ...p,
            collectionIds: assignedIds,
          });
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const handleCollectionToggle = (id: string) => {
    setProduct((prev: any) => {
      const exists = prev.collectionIds?.includes(id);
      return {
        ...prev,
        collectionIds: exists
          ? prev.collectionIds.filter((c: string) => c !== id)
          : [...(prev.collectionIds || []), id],
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const json = await res.json();

      if (json.success) {
        setMessage({ type: "success", text: "Product model updated successfully!" });
      } else {
        setMessage({ type: "error", text: json.error?.message || "Failed to update product." });
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
        <span>Loading product details...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-gray-600">Product not found.</p>
        <Link href="/admin/products" className="text-xs font-bold text-[#e20b16] mt-2 inline-block">
          ← Back to Catalog
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-in fade-in pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#101114] tracking-tight">
              Edit Model: {product.name}
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Slug: /models/{product.slug}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Changes</span>
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
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Model Identification & Pricing
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Model Name *</label>
                <input
                  type="text"
                  required
                  value={product.name || ""}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Slug / URL Identifier *</label>
                <input
                  type="text"
                  required
                  value={product.slug || ""}
                  onChange={(e) => setProduct({ ...product, slug: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={product.category || "Modular Homes"}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                >
                  <option value="Modular Homes">Modular Homes</option>
                  <option value="Prefab Homes">Prefab Homes</option>
                  <option value="Barndominiums">Barndominiums</option>
                  <option value="Cabins">Cabins</option>
                  <option value="Tiny Homes">Tiny Homes</option>
                  <option value="ADUs">ADUs</option>
                  <option value="House Kits">House Kits</option>
                  <option value="A-Frames">A-Frames</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Starting Price ($) *</label>
                <input
                  type="number"
                  required
                  value={product.startingPrice || 0}
                  onChange={(e) => setProduct({ ...product, startingPrice: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Square Footage (Sq Ft)</label>
                <input
                  type="number"
                  value={product.sqft || 0}
                  onChange={(e) => setProduct({ ...product, sqft: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={product.tagline || ""}
                onChange={(e) => setProduct({ ...product, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Description</label>
              <textarea
                rows={4}
                value={product.description || ""}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Room Dimensions & Structural Specs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Bedrooms</label>
                <input
                  type="number"
                  value={product.bedrooms || 0}
                  onChange={(e) => setProduct({ ...product, bedrooms: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  value={product.bathrooms || 0}
                  onChange={(e) => setProduct({ ...product, bathrooms: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Stories</label>
                <input
                  type="number"
                  value={product.stories || 1}
                  onChange={(e) => setProduct({ ...product, stories: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Dimensions</label>
                <input
                  type="text"
                  value={product.dimensions || ""}
                  onChange={(e) => setProduct({ ...product, dimensions: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Frame Engineering</label>
                <input
                  type="text"
                  value={product.frameType || ""}
                  onChange={(e) => setProduct({ ...product, frameType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>
            </div>
          </div>

          {/* SEO Metadata Box */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              <Search className="w-4 h-4 text-[#e20b16]" />
              <span>Product SEO Metadata</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">SEO Title</label>
                <span className={`text-[10px] ${product.seoTitle?.length > 60 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {product.seoTitle?.length || 0} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={product.seoTitle || ""}
                onChange={(e) => setProduct({ ...product, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Meta Description</label>
                <span className={`text-[10px] ${product.metaDescription?.length > 160 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {product.metaDescription?.length || 0} / 160 chars
                </span>
              </div>
              <textarea
                rows={2}
                value={product.metaDescription || ""}
                onChange={(e) => setProduct({ ...product, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Column */}
        <div className="space-y-6">
          {/* Media Links */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              <ImageIcon className="w-4 h-4 text-[#e20b16]" />
              <span>Media & Visual Assets</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Primary Image URL *</label>
              <input
                type="text"
                required
                value={product.primaryImage || ""}
                onChange={(e) => setProduct({ ...product, primaryImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Floor Plan Preview URL</label>
              <input
                type="text"
                value={product.floorPlanImage || ""}
                onChange={(e) => setProduct({ ...product, floorPlanImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">YouTube Walkthrough URL</label>
              <input
                type="text"
                value={product.videoUrl || ""}
                onChange={(e) => setProduct({ ...product, videoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>

          {/* Collection Assignments */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              <FolderOpen className="w-4 h-4 text-[#e20b16]" />
              <span>Assign to Collections</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {collections.map((c) => (
                <label
                  key={c.id}
                  className="flex items-center gap-2 text-xs text-gray-700 font-semibold cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={product.collectionIds?.includes(c.id)}
                    onChange={() => handleCollectionToggle(c.id)}
                    className="w-4 h-4 text-[#e20b16] rounded-sm focus:ring-[#e20b16]"
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status & Featured */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-gray-900 cursor-pointer">
              <input
                type="checkbox"
                checked={!!product.isPublished}
                onChange={(e) => setProduct({ ...product, isPublished: e.target.checked })}
                className="w-4 h-4 text-[#e20b16] rounded-sm focus:ring-[#e20b16]"
              />
              <span>Published (Visible on Public Site)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-gray-900 cursor-pointer">
              <input
                type="checkbox"
                checked={!!product.isFeatured}
                onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })}
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
