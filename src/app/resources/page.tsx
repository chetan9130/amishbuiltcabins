import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, BookOpen, Search } from "lucide-react";
import { RESOURCE_ARTICLES } from "@/data/resources";

export const metadata = {
  title: "Modular Home Educational Resources & Guides | ModularHome.com",
  description: "Comprehensive educational guides on modular home construction, pricing, financing, land preparation, delivery, and custom floor plans.",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-24 text-[#1D2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8 border-b border-[#E5E0D4] max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#B82025] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#B82025]"></span>
            <span>Educational Guide Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#1D2521] font-display">
            Modular Home Resources
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#6B716D] font-body">
            Everything you need to know about factory modular housing, costs, timelines, financing, land preparation, and floor plan customization.
          </p>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {RESOURCE_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#B82025] hover:shadow-lg transition-all group duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#B82025] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-xs border border-white/20 shadow-xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#6B716D]">
                    <Clock className="w-3.5 h-3.5 text-[#B82025]" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#1D2521] group-hover:text-[#B82025] transition-colors leading-snug font-display">
                    {article.title}
                  </h2>

                  <p className="text-xs text-[#6B716D] leading-relaxed font-body">
                    {article.excerpt}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#E5E0D4]">
                    {article.content.map((paragraph, idx) => (
                      <p key={idx} className="text-xs text-[#1D2521] leading-relaxed font-medium">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/quote"
                  className="w-full py-3 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Request Custom Pricing For This Build Type</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
