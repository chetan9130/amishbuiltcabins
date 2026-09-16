import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Calendar, Clock, Play, ShieldCheck, Tag, Eye } from "lucide-react";
import { getVideoByIdOrSlug, getPublishedVideos } from "@/lib/videoStore";

interface VideoDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: VideoDetailPageProps) {
  const { slug } = await params;
  const video = getVideoByIdOrSlug(slug);

  if (!video) {
    return {
      title: "Video Not Found | ModularHome.com",
    };
  }

  return {
    title: `${video.title} | ModularHome.com Video Tour`,
    description: video.description || `Watch official video tour of ${video.title} by ModularHome.com.`,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [{ url: video.thumbnail }],
    },
  };
}

export async function generateStaticParams() {
  const videos = getPublishedVideos();
  return videos.map((v) => ({
    slug: v.youtubeVideoId,
  }));
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { slug } = await params;
  const video = getVideoByIdOrSlug(slug);

  if (!video) {
    notFound();
  }

  const allPublished = getPublishedVideos();
  const relatedVideos = allPublished
    .filter((v) => v.id !== video.id && v.youtubeVideoId !== video.youtubeVideoId)
    .slice(0, 3);

  // VideoObject JSON-LD Schema for Google SEO
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": [video.thumbnail],
    "uploadDate": video.publishedAt,
    "duration": video.duration ? `PT${video.duration.replace(":", "M")}S` : "PT5M",
    "embedUrl": video.embedUrl,
    "contentUrl": video.youtubeUrl,
    "publisher": {
      "@type": "Organization",
      "name": "ModularHome.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://modularhome.com/newlogo2.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-28 text-[#1D2521]">
      {/* Inject JSON-LD SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="text-xs text-[#6B716D] mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-[#1D2521] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/videos" className="hover:text-[#1D2521] transition-colors">Videos</Link>
          <span>/</span>
          <span className="text-[#B82025] font-bold line-clamp-1">{video.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Video Embed Stage (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-black shadow-xl border border-[#E5E0D4]">
              <iframe
                src={`${video.embedUrl}?autoplay=1&rel=0`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Header Info */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="px-3 py-1 bg-[#B82025] text-white font-bold uppercase tracking-wider rounded-xs shadow-xs">
                  {video.category}
                </span>
                <span className="flex items-center gap-1.5 text-[#6B716D]">
                  <Clock className="w-3.5 h-3.5 text-[#B82025]" />
                  <span>{video.duration}</span>
                </span>
                <span className="flex items-center gap-1.5 text-[#6B716D]">
                  <Calendar className="w-3.5 h-3.5 text-[#B82025]" />
                  <span>{video.date}</span>
                </span>
                <span className="text-[#6B716D]">• {video.views}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1D2521] font-display">
                {video.title}
              </h1>

              <div className="p-5 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1D2521]">
                  Video Description & Details
                </h3>
                <p className="text-xs sm:text-sm text-[#6B716D] leading-relaxed whitespace-pre-line font-body">
                  {video.description || "Official video tour showcasing the structural engineering and factory detail of ModularHome.com."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Related Videos & CTA (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* CTA Box */}
            <div className="bg-[#8F171C] text-white p-6 rounded-sm shadow-md space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
                Inspired By This Video?
              </span>
              <h3 className="text-xl font-black uppercase tracking-tight font-display text-white">
                Build Your Dream Cabin
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-body">
                Customize your floor plan, choose timber or steel finishes, and get an instant cost estimate.
              </p>
              <Link
                href="/quote"
                className="w-full py-3.5 bg-[#B82025] hover:bg-[#721215] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>GET A QUOTE NOW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Related Videos List */}
            {relatedVideos.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#1D2521] border-b border-[#E5E0D4] pb-2">
                  More Video Tours
                </h3>

                <div className="space-y-3">
                  {relatedVideos.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/videos/${rel.youtubeVideoId}`}
                      className="group flex gap-3 p-2 bg-[#F7F4EC] hover:bg-white border border-[#E5E0D4] rounded-sm transition-all shadow-2xs"
                    >
                      <div className="relative w-28 aspect-[16/10] rounded-2xs overflow-hidden shrink-0 border border-[#E5E0D4]">
                        <Image
                          src={rel.thumbnail}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs font-bold text-[#1D2521] line-clamp-2 group-hover:text-[#B82025] transition-colors">
                          {rel.title}
                        </div>
                        <div className="text-[10px] text-[#6B716D]">
                          {rel.duration} • {rel.category}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
