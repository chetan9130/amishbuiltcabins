"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import VideoModal from "@/components/VideoModal";
import { VideoItem } from "@/data/videos";

interface HomeVideosSectionProps {
  videos?: VideoItem[];
}

const DEFAULT_VIDEOS: VideoItem[] = [
  {
    id: "v-aspen",
    title: "The Aspen Model Home Tour · Modern Design, Spacious Living",
    category: "Building Tours",
    duration: "4:35",
    description: "Take a comprehensive walk-through tour of our flagship Aspen modular residence.",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80",
    views: "184K views",
    date: "2 weeks ago",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "v-meadow",
    title: "The Meadow — Full Tour",
    category: "Building Tours",
    duration: "3:45",
    description: "Walk inside this 4-bedroom modern prefab residence.",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80",
    views: "92K views",
    date: "1 month ago",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "v-tiny",
    title: "Tiny Home Tour",
    category: "Interior",
    duration: "2:50",
    description: "Smart compact design with maximum functional living.",
    thumbnail: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=700&q=80",
    views: "64K views",
    date: "3 weeks ago",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "v-barn",
    title: "Inside a Barndominium",
    category: "Construction",
    duration: "5:12",
    description: "Massive open floor plan and vaulted architectural framing.",
    thumbnail: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=700&q=80",
    views: "210K views",
    date: "2 weeks ago",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "v-story",
    title: "Customer Build Story",
    category: "Customer Stories",
    duration: "6:20",
    description: "Real homeowners share their journey from factory build to move-in day.",
    thumbnail: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=700&q=80",
    views: "128K views",
    date: "1 month ago",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default function HomeVideosSection({ videos = DEFAULT_VIDEOS }: HomeVideosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const displayVideos = videos && videos.length >= 5 ? videos.slice(0, 5) : DEFAULT_VIDEOS;
  const mainVideo = displayVideos[0];
  const sideVideos = displayVideos.slice(1, 5);

  return (
    <>
      <section className="py-12 sm:py-16 bg-[#f6f7f9]">
        <div className="wrap">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-[-1.3px] text-[#101114] m-0">
                Watch Our Home Tours
              </h2>
              <p className="text-sm sm:text-base text-[#6b7280] mt-1.5 mb-0">
                Take a virtual tour of modular homes, interiors and builds.
              </p>
            </div>
            <Link
              href="/videos"
              className="text-[#e20b16] font-extrabold text-sm sm:text-base hover:underline whitespace-nowrap self-start sm:self-auto"
            >
              View All Videos →
            </Link>
          </div>

          {/* Asymmetric 5-Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-4">
            {/* Featured Main Video (Spans 2 rows on large screen) */}
            <div
              onClick={() => setSelectedVideo(mainVideo)}
              className="card overflow-hidden relative cursor-pointer group lg:row-span-2 min-h-[260px] sm:min-h-[340px] lg:min-h-[460px] bg-black"
            >
              <Image
                src={mainVideo.thumbnail}
                alt={mainVideo.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/40 group-hover:bg-[#e20b16] text-white flex items-center justify-center text-2xl sm:text-3xl pl-1 transition-all duration-300 backdrop-blur-xs shadow-2xl group-hover:scale-110">
                  ▶
                </div>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                <h3 className="text-base sm:text-xl font-extrabold text-white leading-snug drop-shadow-md">
                  {mainVideo.title}
                </h3>
              </div>
            </div>

            {/* 4 Secondary Video Cards */}
            {sideVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="card overflow-hidden relative cursor-pointer group h-[220px] bg-black"
              >
                <Image
                  src={vid.thumbnail}
                  alt={vid.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/40 group-hover:bg-[#e20b16] text-white flex items-center justify-center text-lg pl-0.5 transition-all duration-300 backdrop-blur-xs shadow-lg group-hover:scale-110">
                    ▶
                  </div>
                </div>

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
                  <h4 className="text-sm font-extrabold text-white leading-tight drop-shadow-sm">
                    {vid.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </>
  );
}
