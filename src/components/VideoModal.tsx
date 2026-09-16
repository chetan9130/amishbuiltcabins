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
        className="relative w-full max-w-4xl bg-white border border-[#E5E0D4] rounded-sm overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#B82025] text-white border-b border-[#8F171C]">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold bg-white text-[#B82025] rounded-xs shadow-xs">
              {video.category}
            </span>
            <h3 className="text-sm font-bold truncate max-w-md">
              {video.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
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
        <div className="p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs text-[#6B716D] max-w-xl">
            {video.description}
          </p>
          <div className="flex items-center gap-4 text-xs text-[#1D2521] font-semibold shrink-0">
            <span>Duration: {video.duration}</span>
            <span>•</span>
            <span>{video.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
