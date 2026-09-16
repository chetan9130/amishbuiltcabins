"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Clock, Eye, Search, Filter } from "lucide-react";
import { VIDEOS_DATA, VIDEO_CATEGORIES } from "@/data/videos";
import { VideoItem } from "@/types/video";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";

export default function VideosClient() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSyncedVideos() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
          setVideos(data.videos);
        } else {
          // Fallback to initial seed data
          setVideos(VIDEOS_DATA as unknown as VideoItem[]);
        }
      } catch (err) {
        console.error("Failed to fetch synced videos, using fallback:", err);
        setVideos(VIDEOS_DATA as unknown as VideoItem[]);
      } finally {
        setIsLoading(false);
      }
    }
    loadSyncedVideos();
  }, []);

  const filteredVideos = videos.filter((v) => {
    const matchesCat = selectedCategory === "All" || v.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === "" || v.title.toLowerCase().includes(searchQuery.toLowerCase()) || v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredVideo = videos[0] || VIDEOS_DATA[0];

  return (
    <div className="min-h-screen bg-white pt-28 pb-28 text-[var(--ink)]">
      <div className="wrap">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[var(--r)] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--r)] animate-pulse"></span>
            <span>Official YouTube Channel Sync</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[var(--ink)] font-display leading-[0.95]">
            See Our Buildings <br />
            <span className="text-[var(--r)]">Come To Life.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[var(--muted)] leading-relaxed font-body">
            Watch complete architectural walkthroughs, steel frame erection time-lapses, luxury interior detailing, and genuine homeowner build stories automatically synced from our YouTube channel.
          </p>

          {/* Search & Category Filtering Bar */}
          <div className="mt-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="w-4 h-4 text-[var(--muted)] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos by keyword..."
                className="w-full bg-[var(--soft)] border border-[var(--line)] pl-11 pr-4 py-3 text-xs text-[var(--ink)] rounded-full focus:outline-none focus:border-[var(--r)] shadow-xs transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {["All", ...VIDEO_CATEGORIES.filter((c) => c !== "All")].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[var(--r)] text-white shadow-md"
                      : "bg-[var(--soft)] text-[var(--ink)] hover:bg-[var(--r)] hover:text-white border border-[var(--line)] shadow-xs"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Video Spotlight */}
        {selectedCategory === "All" && searchQuery === "" && featuredVideo && (
          <div className="mb-16">
            <div
              onClick={() => setActiveVideo(featuredVideo as unknown as VideoItem)}
              className="group cursor-pointer relative aspect-[21/9] w-full rounded-[24px] overflow-hidden bg-black border border-[var(--line)] hover:border-[var(--r)] transition-all duration-300 shadow-xl"
            >
              <Image
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                fill
                priority
                sizes="100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-85 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

              {/* Play Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[var(--r)] text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--r-dark)] transition-all duration-300 shadow-2xl">
                  <Play className="w-8 h-8 ml-1 fill-current" />
                </div>
              </div>

              {/* Bottom Info Banner */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="max-w-2xl space-y-2">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[var(--r)] text-white rounded-full">
                    Featured Tour • {featuredVideo.category}
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black uppercase text-white font-display">
                    {featuredVideo.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/85 hidden sm:block">
                    {featuredVideo.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-white shrink-0 bg-black/60 px-4 py-2 rounded-full border border-white/20">
                  <span>{featuredVideo.duration}</span>
                  <span>•</span>
                  <span>{featuredVideo.views}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Grid */}
        {isLoading ? (
          <div className="p-16 text-center text-xs text-[var(--muted)]">
            Loading video gallery...
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="p-16 text-center text-xs text-[var(--muted)] space-y-2 bg-[var(--soft)] rounded-[18px] border border-[var(--line)]">
            <div>No videos matched your filter or search query.</div>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-[var(--r)] font-bold hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video as any}
                onPlay={(v) => setActiveVideo(v as any)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      <VideoModal video={activeVideo as any} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
