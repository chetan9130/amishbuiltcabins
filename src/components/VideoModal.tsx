"use client";

import { X } from "lucide-react";
import { VideoItem } from "@/data/videos";

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  if (!video) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-white border border-[var(--line)] rounded-[20px] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[var(--ink)] text-white border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-widest font-bold bg-[var(--r)] text-white rounded-full shadow-xs">
              {video.category}
            </span>
            <h3 className="text-sm font-bold truncate max-w-md text-white">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player (16:9) */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`${video.videoUrl}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Video metadata footer */}
        <div className="p-6 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)] max-w-xl leading-relaxed">
            {video.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--ink)] font-semibold shrink-0">
            <span>Duration: {video.duration}</span>
            <span>•</span>
            <span>{video.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
