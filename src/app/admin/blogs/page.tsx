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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e7e9ee] pb-5">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#101114] tracking-tight">
            Blog & Resources CMS
          </h1>
          <p className="text-xs text-[#6b7280] mt-1">
            Publish educational articles, housing guides, comparison blogs, and SEO content.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#fcb907] hover:bg-[#e5a706] text-[#101114] text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-[18px] border border-[#e7e9ee] shadow-[0_12px_35px_rgba(16,24,40,0.04)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or excerpt..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#d5d9e0] bg-[#f6f7f9] text-xs text-[#101114] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fcb907]"
          />
          <Search className="w-4 h-4 text-[#6b7280] absolute left-3 top-3" />
        </form>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs text-[#101114] font-bold uppercase tracking-wider">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl border border-[#d5d9e0] bg-[#f6f7f9] text-xs text-[#101114] font-bold focus:bg-white focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Articles</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Drafts</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-[18px] border border-[#e7e9ee] shadow-[0_12px_35px_rgba(16,24,40,0.04)] overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-[#6b7280] text-xs flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#d97706]" />
            <span>Loading articles...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-16 text-center text-[#6b7280] text-xs">
            No blog articles found. Click &quot;Write New Article&quot; to publish one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f6f7f9] border-b border-[#e7e9ee] text-[#6b7280] font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Article</th>
                  <th className="py-3.5 px-4">Author</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e7e9ee]">
                {blogs.map((blog) => {
                  const bId = blog.id || blog._id;
                  return (
                    <tr key={bId} className="hover:bg-[#f6f7f9]/60 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#f6f7f9] shrink-0 border border-[#e7e9ee]">
                            {blog.featuredImage ? (
                              <Image
                                src={blog.featuredImage}
                                alt={blog.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#6b7280]">
                                <BookOpen className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 max-w-md">
                            <div className="font-bold text-[#101114] line-clamp-1 font-sans">{blog.title}</div>
                            <div className="text-[11px] font-mono text-[#6b7280]">/{blog.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[#101114] font-medium">
                        {blog.author}
                      </td>
                      <td className="py-3.5 px-4 text-[#6b7280] text-[11px]">
                        {blog.publishedAt
                          ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Draft"}
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePublish(bId, blog.status)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                            blog.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                              : "bg-[#f6f7f9] text-[#6b7280] border border-[#d5d9e0] hover:bg-[#e7e9ee]"
                          }`}
                        >
                          {blog.status === "PUBLISHED" ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-[#6b7280]" />}
                          <span>{blog.status}</span>
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5">
                        <Link
                          href={`/admin/blogs/${bId}`}
                          className="p-2 rounded-xl text-[#101114] hover:text-black hover:bg-[#f6f7f9] border border-[#d5d9e0] inline-block transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(bId, blog.title)}
                          className="p-2 rounded-xl text-[#6b7280] hover:text-[#d97706] hover:bg-red-50 border border-transparent hover:border-red-200 inline-block transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
