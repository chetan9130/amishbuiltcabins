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
  BookOpen,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminEditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params?.id as string;

  const [blog, setBlog] = useState<any>(null);
  const [categoriesText, setCategoriesText] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/blogs/${blogId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          const b = json.data;
          setBlog(b);
          try {
            const cats = typeof b.categories === "string" ? JSON.parse(b.categories) : b.categories;
            setCategoriesText(Array.isArray(cats) ? cats.join(", ") : "");
          } catch {}
          try {
            const t = typeof b.tags === "string" ? JSON.parse(b.tags) : b.tags;
            setTagsText(Array.isArray(t) ? t.join(", ") : "");
          } catch {}
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, [blogId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...blog,
          categories: categoriesText.split(",").map((c) => c.trim()).filter(Boolean),
          tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean),
        }),
      });
      const json = await res.json();

      if (json.success) {
        setMessage({ type: "success", text: "Blog article updated successfully!" });
      } else {
        setMessage({ type: "error", text: json.error?.message || "Failed to update blog." });
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
        <span>Loading article data...</span>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-gray-600">Blog not found.</p>
        <Link href="/admin/blogs" className="text-xs font-bold text-[#e20b16] mt-2 inline-block">
          ← Back to Blogs
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
            href="/admin/blogs"
            className="p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#101114] tracking-tight">
              Edit Article: {blog.title}
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Slug: /{blog.slug}
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
        {/* Left 2 Cols: Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Article Content & Details
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Article Title *</label>
              <input
                type="text"
                required
                value={blog.title || ""}
                onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={blog.slug || ""}
                onChange={(e) => setBlog({ ...blog, slug: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono text-[11px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Short Excerpt</label>
              <textarea
                rows={2}
                value={blog.excerpt || ""}
                onChange={(e) => setBlog({ ...blog, excerpt: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Article Body *</label>
              <textarea
                rows={12}
                required
                value={blog.content || ""}
                onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 font-mono text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              <Search className="w-4 h-4 text-[#e20b16]" />
              <span>Blog SEO Metadata</span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">SEO Title</label>
                <span className={`text-[10px] ${blog.seoTitle?.length > 60 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {blog.seoTitle?.length || 0} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={blog.seoTitle || ""}
                onChange={(e) => setBlog({ ...blog, seoTitle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-gray-700">Meta Description</label>
                <span className={`text-[10px] ${blog.metaDescription?.length > 160 ? "text-amber-600 font-bold" : "text-gray-400"}`}>
                  {blog.metaDescription?.length || 0} / 160 chars
                </span>
              </div>
              <textarea
                rows={2}
                value={blog.metaDescription || ""}
                onChange={(e) => setBlog({ ...blog, metaDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Publishing Settings
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Publish Status</label>
              <select
                value={blog.status || "PUBLISHED"}
                onChange={(e) => setBlog({ ...blog, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              >
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Author Name</label>
              <input
                type="text"
                value={blog.author || ""}
                onChange={(e) => setBlog({ ...blog, author: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Categories (comma-separated)</label>
              <input
                type="text"
                value={categoriesText}
                onChange={(e) => setCategoriesText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e5e7eb] shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 border-b border-gray-100 pb-3">
              Media
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Featured Image URL</label>
              <input
                type="text"
                value={blog.featuredImage || ""}
                onChange={(e) => setBlog({ ...blog, featuredImage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Embedded Video URL</label>
              <input
                type="text"
                value={blog.embeddedVideoUrl || ""}
                onChange={(e) => setBlog({ ...blog, embeddedVideoUrl: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e20b16]"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
