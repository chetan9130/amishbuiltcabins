"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Filter,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [publishFilter, setPublishFilter] = useState("ALL");

  const categories = [
    "Modular Homes",
    "Prefab Homes",
    "Barndominiums",
    "Cabins",
    "Tiny Homes",
    "ADUs",
    "House Kits",
    "A-Frames",
    "Commercial",
  ];

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/products", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (categoryFilter !== "ALL") url.searchParams.set("category", categoryFilter);
      if (publishFilter !== "ALL") url.searchParams.set("isPublished", publishFilter === "PUBLISHED" ? "true" : "false");

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setProducts(json.data || []);
      }
    } catch (e) {
      console.error("Error loading products:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryFilter, publishFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !current }),
      });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isPublished: !current } : p))
        );
      }
    } catch (e) {
      alert("Failed to toggle publish status.");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(json.error?.message || "Failed to delete product.");
      }
    } catch (e) {
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#101114] tracking-tight">
            Product & Home Model CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your catalog of modular homes, specs, customizable options, floor plans, and pricing.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Model</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, slug, or keyword..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-800 font-semibold focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-semibold">Status:</span>
            <select
              value={publishFilter}
              onChange={(e) => setPublishFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white text-gray-800 font-semibold focus:outline-none"
            >
              <option value="ALL">All</option>
              <option value="PUBLISHED">Published</option>
              <option value="UNPUBLISHED">Unpublished</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
            <span>Loading product catalog...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No products found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Model / Preview</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Specs</th>
                  <th className="py-3.5 px-4">Starting Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          <Image
                            src={prod.primaryImage}
                            alt={prod.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{prod.name}</div>
                          <div className="text-[11px] font-mono text-gray-500">/models/{prod.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-semibold text-[11px]">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 text-[11px]">
                      {prod.sqft.toLocaleString()} sq ft • {prod.bedrooms} Bed, {prod.bathrooms} Bath
                    </td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      ${prod.startingPrice.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(prod.id, prod.isPublished)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          prod.isPublished
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {prod.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{prod.isPublished ? "Published" : "Hidden"}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/products/${prod.id}`}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 inline-block transition-colors"
                        title="Edit Model"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 inline-block transition-colors"
                        title="Delete Model"
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
    </div>
  );
}
