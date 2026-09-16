"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  RefreshCw, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Video as VideoIcon, 
  Sparkles, 
  Search,
  Filter,
  Clock,
  ShieldCheck,
  X,
  Play
} from "lucide-react";
import { VideoItem, SyncStats, VideoCategory } from "@/types/video";

export default function AdminVideoManager() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [stats, setStats] = useState<SyncStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal for Add YouTube Video by URL
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [pastedUrl, setPastedUrl] = useState("");
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const [fetchedVideo, setFetchedVideo] = useState<Partial<VideoItem> | null>(null);
  const [manualCategory, setManualCategory] = useState<VideoCategory>("Building Tours");
  const [manualPublish, setManualPublish] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const categoriesList: VideoCategory[] = [
    "Building Tours",
    "Construction",
    "Delivery",
    "Interior",
    "Customer Stories",
    "Barndominiums",
    "General",
  ];

  const fetchAdminVideos = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/videos");
      const data = await res.json();
      if (data.success) {
        setVideos(data.videos || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error("Failed to load admin videos:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminVideos();
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    try {
      const res = await fetch("/api/youtube/sync", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setSyncMessage({
          type: "success",
          text: `Sync Completed! ${data.newVideosCount || 0} new videos added, ${data.updatedVideosCount || 0} updated.`,
        });
        await fetchAdminVideos();
      } else {
        setSyncMessage({
          type: "error",
          text: data.message || "Failed to sync YouTube channel.",
        });
      }
    } catch (err: any) {
      setSyncMessage({
        type: "error",
        text: err.message || "Network error while syncing.",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCategoryChange = async (id: string, newCategory: VideoCategory) => {
    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateCategory",
          id,
          category: newCategory,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setVideos((prev) =>
          prev.map((v) => (v.id === id ? { ...v, category: newCategory } : v))
        );
      }
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "togglePublish",
          id,
          isPublished: !currentStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setVideos((prev) =>
          prev.map((v) => (v.id === id ? { ...v, isPublished: !currentStatus } : v))
        );
      }
    } catch (err) {
      console.error("Error toggling publish status:", err);
    }
  };

  const handleDeleteLocal = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the local website record for "${title}"?\n\nNote: This WILL NOT delete the video from YouTube.`)) {
      return;
    }
    try {
      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "deleteLocal",
          id,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setVideos((prev) => prev.filter((v) => v.id !== id));
      }
    } catch (err) {
      console.error("Error deleting local record:", err);
    }
  };

  const handleFetchUrl = async () => {
    if (!pastedUrl.trim()) return;
    setIsFetchingUrl(true);
    setFetchError("");
    setFetchedVideo(null);
    try {
      const res = await fetch("/api/youtube/fetch-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: pastedUrl }),
      });
      const data = await res.json();
      if (data.success) {
        setFetchedVideo(data.video);
      } else {
        setFetchError(data.message || "Failed to fetch YouTube video details.");
      }
    } catch (err: any) {
      setFetchError(err.message || "Error fetching video URL.");
    } finally {
      setIsFetchingUrl(false);
    }
  };

  const handleSaveManualVideo = async () => {
    if (!fetchedVideo || !fetchedVideo.youtubeVideoId) return;

    try {
      const payload = {
        ...fetchedVideo,
        category: manualCategory,
        isPublished: manualPublish,
      };

      const res = await fetch("/api/admin/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsertManual",
          videoData: payload,
        }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchAdminVideos();
        setAddModalOpen(false);
        setPastedUrl("");
        setFetchedVideo(null);
      }
    } catch (err) {
      console.error("Error saving manual video:", err);
    }
  };

  const filteredVideos = videos.filter((v) => {
    const matchesCategory = selectedCategory === "All" || v.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesQuery = searchQuery === "" || v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.youtubeVideoId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8 text-[var(--ink)]">
      {/* 1. TOP HEADER BANNER */}
      <div className="bg-[var(--ink)] text-white p-6 sm:p-8 rounded-[22px] shadow-lg space-y-4 border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--r)] mb-2">
              <Sparkles className="w-4 h-4 text-[var(--r)]" />
              <span>Automatic Channel Synchronization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display">
              YouTube Video Manager
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-2xl font-body">
              Automatically sync videos from your YouTube channel directly to your website. Videos uploaded on YouTube appear automatically without manual website post creation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-4 py-2.5 bg-white text-[var(--ink)] hover:bg-[var(--soft)] text-xs font-bold uppercase tracking-wider rounded-[12px] transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[var(--r)]" />
              <span>Add YouTube Video</span>
            </button>

            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-5 py-2.5 bg-[var(--r)] hover:bg-[var(--r-dark)] text-white text-xs font-extrabold uppercase tracking-wider rounded-[12px] transition-all flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Syncing..." : "Sync YouTube Videos Now"}</span>
            </button>
          </div>
        </div>

        {syncMessage && (
          <div
            className={`p-3.5 rounded-[12px] border text-xs font-medium flex items-center gap-2 animate-in fade-in duration-200 ${
              syncMessage.type === "success"
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-200"
                : "bg-red-950/80 border-red-500 text-red-200"
            }`}
          >
            {syncMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{syncMessage.text}</span>
          </div>
        )}
      </div>

      {/* 2. SYNC STATS & CONFIGURATION OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-5 bg-[var(--soft)] border border-[var(--line)] rounded-[18px] space-y-1 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Last Sync Status</div>
          <div className="text-base font-bold text-[var(--ink)] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--r)]"></span>
            <span>{stats?.status === "never" ? "Never Synced" : stats?.status === "error" ? "Failed Sync" : "Active & Synced"}</span>
          </div>
          <div className="text-[11px] text-[var(--muted)]">
            {stats?.lastSyncAt
              ? new Date(stats.lastSyncAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
              : "Click Sync to fetch latest videos"}
          </div>
        </div>

        <div className="p-5 bg-[var(--soft)] border border-[var(--line)] rounded-[18px] space-y-1 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Videos Found</div>
          <div className="text-2xl font-black text-[var(--ink)]">{videos.length}</div>
          <div className="text-[11px] text-[var(--muted)]">{videos.filter(v => v.isPublished).length} published on website</div>
        </div>

        <div className="p-5 bg-[var(--soft)] border border-[var(--line)] rounded-[18px] space-y-1 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">New Videos Added</div>
          <div className="text-2xl font-black text-[var(--r)]">{stats?.newVideosAdded || 0}</div>
          <div className="text-[11px] text-[var(--muted)]">From last channel sync</div>
        </div>

        <div className="p-5 bg-[var(--soft)] border border-[var(--line)] rounded-[18px] space-y-1 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">Auto Sync Mode</div>
          <div className="text-base font-bold text-[var(--r)]">ON (Scheduled)</div>
          <div className="text-[11px] text-[var(--muted)]">Frequency: Every 1 Hour</div>
        </div>
      </div>

      {/* 3. FILTER & SEARCH STRIP */}
      <div className="p-4 bg-white border border-[var(--line)] rounded-[18px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[var(--r)]" />
          <span className="text-xs font-bold uppercase text-[var(--ink)]">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[var(--soft)] border border-[var(--line)] px-3 py-2 text-xs text-[var(--ink)] rounded-[10px] focus:outline-none focus:border-[var(--r)] cursor-pointer"
          >
            <option value="All">All Categories ({videos.length})</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or video ID..."
            className="w-full bg-[var(--soft)] border border-[var(--line)] pl-9 pr-3 py-2 text-xs text-[var(--ink)] rounded-full focus:outline-none focus:border-[var(--r)]"
          />
        </div>
      </div>

      {/* 4. VIDEO MANAGEMENT TABLE */}
      <div className="bg-white border border-[var(--line)] rounded-[20px] shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-[var(--muted)]">
            Loading video database...
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <VideoIcon className="w-8 h-8 text-[var(--muted)] mx-auto" />
            <div className="text-sm font-bold text-[var(--ink)]">No Videos Found</div>
            <p className="text-xs text-[var(--muted)] max-w-sm mx-auto">
              Click &ldquo;Sync YouTube Videos Now&rdquo; to fetch videos from your configured YouTube channel or add a video manually.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[var(--ink)] text-white uppercase text-[10px] font-bold tracking-wider">
                  <th className="py-3.5 px-4">Video</th>
                  <th className="py-3.5 px-4">YouTube ID</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Published Date</th>
                  <th className="py-3.5 px-4 text-center">Website Visibility</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line)]">
                {filteredVideos.map((video) => (
                  <tr key={video.id} className="hover:bg-[var(--soft)]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 aspect-[16/10] bg-gray-100 rounded-[8px] overflow-hidden shrink-0 border border-[var(--line)]">
                          <Image
                            src={video.thumbnail}
                            alt={video.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute bottom-0.5 right-0.5 bg-black/80 text-white text-[9px] px-1 py-0.5 font-bold rounded-[4px]">
                            {video.duration}
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-[var(--ink)] line-clamp-1 max-w-xs sm:max-w-md">
                            {video.title}
                          </div>
                          <div className="text-[11px] text-[var(--muted)]">
                            {video.views} • {video.date}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-xs text-[var(--ink)]">
                      {video.youtubeVideoId}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={video.category}
                        onChange={(e) =>
                          handleCategoryChange(video.id, e.target.value as VideoCategory)
                        }
                        className="bg-white border border-[var(--line)] px-2.5 py-1.5 text-xs text-[var(--ink)] rounded-[8px] focus:outline-none focus:border-[var(--r)] font-semibold cursor-pointer"
                      >
                        {categoriesList.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3 px-4 text-[var(--muted)]">
                      {new Date(video.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(video.id, video.isPublished)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 transition-colors cursor-pointer ${
                          video.isPublished
                            ? "bg-red-50 text-[var(--r)] border border-red-200"
                            : "bg-gray-100 text-gray-600 border border-gray-300"
                        }`}
                      >
                        {video.isPublished ? (
                          <>
                            <Eye className="w-3 h-3 text-[var(--r)]" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 text-gray-500" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/videos/${video.youtubeVideoId}`}
                          target="_blank"
                          title="View on Website"
                          className="p-1.5 text-[var(--ink)] hover:text-[var(--r)] hover:bg-[var(--soft)] rounded-[6px] transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        <a
                          href={video.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Open on YouTube"
                          className="p-1.5 text-[var(--ink)] hover:text-[var(--r)] hover:bg-[var(--soft)] rounded-[6px] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>

                        <button
                          onClick={() => handleDeleteLocal(video.id, video.title)}
                          title="Remove Local Record (Does not delete on YouTube)"
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-[6px] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. ADD YOUTUBE VIDEO BY URL MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative max-w-lg w-full bg-white border border-[var(--line)] rounded-[20px] p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
              <h3 className="text-base font-black uppercase text-[var(--ink)] font-display flex items-center gap-2">
                <Plus className="w-4 h-4 text-[var(--r)]" />
                Add YouTube Video by URL
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1.5 text-[var(--muted)] hover:text-[var(--ink)] rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Paste a YouTube video URL (e.g. <span className="font-mono text-[var(--ink)]">https://www.youtube.com/watch?v=...</span>) to extract metadata and publish it to the website.
            </p>

            {/* URL Input Form */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={pastedUrl}
                onChange={(e) => setPastedUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="w-full bg-[var(--soft)] border border-[var(--line)] px-4 py-2.5 text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--r)] rounded-[12px]"
              />
              <button
                type="button"
                onClick={handleFetchUrl}
                disabled={isFetchingUrl || !pastedUrl.trim()}
                className="px-4 py-2.5 bg-[var(--r)] hover:bg-[var(--r-dark)] text-white text-xs font-bold uppercase tracking-wider rounded-[12px] transition-all shrink-0 disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isFetchingUrl ? "Fetching..." : "Fetch Video"}
              </button>
            </div>

            {fetchError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[10px]">
                {fetchError}
              </div>
            )}

            {/* Fetched Preview */}
            {fetchedVideo && (
              <div className="p-4 bg-[var(--soft)] border border-[var(--line)] rounded-[16px] space-y-3 animate-in zoom-in-95 duration-150">
                <div className="flex items-start gap-3">
                  <div className="relative w-24 aspect-[16/10] bg-gray-200 rounded-[8px] overflow-hidden shrink-0 border border-[var(--line)]">
                    <Image
                      src={fetchedVideo.thumbnail || ""}
                      alt={fetchedVideo.title || "Video Preview"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-[var(--ink)] leading-tight">
                      {fetchedVideo.title}
                    </div>
                    <div className="text-[11px] text-[var(--muted)]">
                      Duration: {fetchedVideo.duration} • ID: {fetchedVideo.youtubeVideoId}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--line)]">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[var(--ink)] mb-1">
                      Website Category
                    </label>
                    <select
                      value={manualCategory}
                      onChange={(e) => setManualCategory(e.target.value as VideoCategory)}
                      className="w-full bg-white border border-[var(--line)] px-2.5 py-1.5 text-xs text-[var(--ink)] rounded-[8px] focus:outline-none focus:border-[var(--r)]"
                    >
                      {categoriesList.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-[var(--ink)] mb-1">
                      Website Visibility
                    </label>
                    <button
                      type="button"
                      onClick={() => setManualPublish(!manualPublish)}
                      className={`w-full py-1.5 text-xs font-bold uppercase tracking-wider rounded-[8px] border transition-colors cursor-pointer ${
                        manualPublish
                          ? "bg-[var(--r)] text-white border-[var(--r)]"
                          : "bg-gray-200 text-gray-700 border-gray-300"
                      }`}
                    >
                      {manualPublish ? "Published" : "Hidden (Draft)"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-[10px] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveManualVideo}
                disabled={!fetchedVideo}
                className="px-5 py-2 bg-[var(--r)] hover:bg-[var(--r-dark)] text-white text-xs font-bold uppercase tracking-wider rounded-[10px] transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              >
                Publish To Website
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
