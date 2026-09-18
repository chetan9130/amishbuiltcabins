"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const url = new URL("/api/admin/blogs", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);

      const res = await fetch(url.toString());
      const json = await res.json();
      if (json.success) {
        setBlogs(json.data || []);
      }
    } catch (e) {
      console.error("Error loading blogs:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBlogs();
  };

  const handleTogglePublish = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const json = await res.json();
      if (json.success) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: nextStatus } : b))
        );
      }
    } catch (e) {
      alert("Failed to toggle status.");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert(json.error?.message || "Failed to delete article.");
      }
    } catch (e) {
      alert("Failed to delete article.");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#101114] tracking-tight">
            Blog & Resources CMS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Publish educational articles, housing guides, comparison blogs, and SEO content.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e5e7eb] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or excerpt..."
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
            <option value="ALL">All Articles</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Drafts</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-gray-500 text-xs flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#e20b16]" />
            <span>Loading articles...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-gray-400 text-xs">
            No blog articles found. Click &quot;Write New Article&quot; to publish one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                          {blog.featuredImage ? (
                            <Image
                              src={blog.featuredImage}
                              alt={blog.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <BookOpen className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 max-w-md">
                          <div className="font-bold text-gray-900 line-clamp-1">{blog.title}</div>
                          <div className="text-[11px] font-mono text-gray-500">/{blog.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 font-medium">
                      {blog.author}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 text-[11px]">
                      {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleTogglePublish(blog.id, blog.status)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                          blog.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {blog.status === "PUBLISHED" ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{blog.status}</span>
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      <Link
                        href={`/admin/blogs/${blog.id}`}
                        className="p-1.5 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 inline-block transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id, blog.title)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 inline-block transition-colors"
                        title="Delete Article"
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
