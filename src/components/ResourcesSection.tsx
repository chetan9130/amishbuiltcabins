"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { RESOURCE_ARTICLES } from "@/data/resources";

export default function ResourcesSection() {
  const featuredArticles = RESOURCE_ARTICLES.slice(0, 4);

  return (
    <section id="resources" className="py-20 bg-white border-b border-[#E5E0D4] text-[#1D2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Educational Guides & Knowledge"
            title="MODULAR HOME RESOURCES & BLOG"
            subtitle="Learn how factory modular construction works, compare costs, understand site prep, and navigate financing."
            align="left"
          />

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B82025] hover:text-[#8F171C] transition-colors shrink-0"
          >
            <span>View All Guides ({RESOURCE_ARTICLES.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Article Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#B82025] hover:shadow-md transition-all group duration-200"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#B82025] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-xs border border-white/20">
                    {article.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#6B716D]">
                    <Clock className="w-3 h-3 text-[#B82025]" />
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1D2521] group-hover:text-[#B82025] transition-colors line-clamp-2 leading-snug font-display">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#6B716D] line-clamp-2 leading-relaxed font-body">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B82025] hover:text-[#8F171C] transition-colors"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
