"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

export default function AdminNewProductPage() {
  const router = useRouter();
  const [collections, setCollections] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<any>({
    name: "",
    slug: "",
    tagline: "",
    description: "",
    category: "Modular Homes",
    series: "Signature Luxury Series",
    architecturalStyle: "Modern Architectural",
    sqft: 1500,
    bedrooms: 3,
    bathrooms: 2,
    stories: 1,
    startingPrice: 125000,
    dimensions: "32' x 48'",
    frameType: "Engineered Rigid-Steel / Heavy Timber",
    roofPitch: "6:12 Architectural",
    windRating: "150 MPH Hurricane Rated",
    snowLoad: "50 PSF Extreme Load",
    warranty: "10-Year Structural Integrity",
    primaryImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    floorPlanImage: "",
    videoUrl: "",
    isPublished: true,
    isFeatured: false,
    displayOrder: 1,
    seoTitle: "",
    metaDescription: "",
    imageAltText: "",
    canonicalUrl: "",
    collectionIds: [] as string[],
  });

  useEffect(() => {
    fetch("/api/admin/collections")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setCollections(json.data || []);
      })
      .catch((e) => console.error(e));
  }, []);

  const handleNameChange = (val: string) => {
    const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setForm({
      ...form,
      name: val,
      slug,
      seoTitle: `${val} | ModularHome.com`,
      metaDescription: `Explore ${val} factory-engineered home with modern architectural design.`,
      imageAltText: val,
    });
  };

  const handleCollectionToggle = (id: string) => {
    setForm((prev: any) => {
      const exists = prev.collectionIds.includes(id);
      return {
        ...prev,
        collectionIds: exists
          ? prev.collectionIds.filter((c: string) => c !== id)
          : [...prev.collectionIds, id],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (json.success) {
        router.push("/admin/products");
      } else {
        setError(json.error?.message || "Failed to create product.");
      }
    } catch (err: any) {
      setError(err.message || "Network error.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in pb-12">
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
              Create New Home Model
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Add a new modular home or building model to the catalog database.
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Create Model</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-800 border border-red-200 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* General Information */}
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
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. The Aspen"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Slug / URL Identifier *</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="the-aspen"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
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
                  value={form.startingPrice}
                  onChange={(e) => setForm({ ...form, startingPrice: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Square Footage (Sq Ft)</label>
                <input
                  type="number"
                  value={form.sqft}
                  onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="e.g. Modern Scandinavian-inspired open plan residence."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe architectural features, layouts, engineering, and craftsmanship..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Room Dimensions & Structural Specs
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Bedrooms</label>
                <input
                  type="number"
                  value={form.bedrooms}
                  onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Bathrooms</label>
                <input
                  type="number"
                  value={form.bathrooms}
                  onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Stories / Levels</label>
                <input
                  type="number"
                  value={form.stories}
                  onChange={(e) => setForm({ ...form, stories: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Dimensions</label>
                <input
                  type="text"
                  value={form.dimensions}
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                  placeholder="30' x 40'"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Frame Engineering</label>
                <input
                  type="text"
                  value={form.frameType}
                  onChange={(e) => setForm({ ...form, frameType: e.target.value })}
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
                <span className={`text-[10px] ${form.seoTitle?.length > 60 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {form.seoTitle?.length || 0} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Meta Description</label>
                <span className={`text-[10px] ${form.metaDescription?.length > 160 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {form.metaDescription?.length || 0} / 160 chars
                </span>
              </div>
              <textarea
                rows={2}
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
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
                value={form.primaryImage}
                onChange={(e) => setForm({ ...form, primaryImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Floor Plan Preview URL</label>
              <input
                type="text"
                value={form.floorPlanImage}
                onChange={(e) => setForm({ ...form, floorPlanImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">YouTube Walkthrough URL</label>
              <input
                type="text"
                value={form.videoUrl}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=..."
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
                    checked={form.collectionIds.includes(c.id)}
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
                checked={form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                className="w-4 h-4 text-[#e20b16] rounded-sm focus:ring-[#e20b16]"
              />
              <span>Published (Visible on Public Site)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-bold text-gray-900 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-4 h-4 text-[#e20b16] rounded-sm focus:ring-[#e20b16]"
              />
              <span>Featured on Homepage Carousel</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
