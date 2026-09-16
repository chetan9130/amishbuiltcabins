"use client";

import { useState } from "react";
import Link from "next/link";
import BuildingCard from "@/components/BuildingCard";
import SectionHeading from "@/components/SectionHeading";
import { BUILDING_MODELS } from "@/data/models";

const FEATURED_TABS = [
  "All",
  "Modular Homes",
  "Prefab Homes",
  "Barndominiums",
  "Cabins",
  "Tiny Homes",
  "ADUs & Granny Pods",
  "Custom Homes",
];

export default function FeaturedHomesSection() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredHomes = BUILDING_MODELS.filter((home) => {
    if (activeTab === "All") return true;
    return home.category === activeTab;
  });

  return (
    <section id="featured-homes" className="py-20 bg-white border-b border-[#E5E0D4] text-[#1D2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="Architectural Showcase"
            title="FEATURED HOME DESIGNS"
            subtitle="Explore our top-rated modular models, prefabs, log cabins, and barndominium floor plans."
            align="left"
          />

          {/* Filter Tab Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar shrink-0">
            {FEATURED_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm shrink-0 transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#B82025] text-white shadow-md"
                    : "bg-[#F7F4EC] text-[#1D2521] hover:bg-[#B82025] hover:text-white border border-[#E5E0D4]"
                }`}
              >
                {tab === "ADUs & Granny Pods" ? "ADU" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Homes Grid */}
        {filteredHomes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredHomes.slice(0, 6).map((model) => (
              <BuildingCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm text-xs text-[#6B716D]">
            No featured models currently in this category. View our complete catalog for full listings.
          </div>
        )}

        {/* Explore Full Catalog Link */}
        <div className="mt-12 text-center">
          <Link
            href="/models"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shadow-md"
          >
            <span>Explore All Floor Plans & Models</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
