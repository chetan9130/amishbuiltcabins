"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  buildingType: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Our Homestead Cabin arrived ahead of schedule in Montana. The steel framing precision saved our contractor weeks of work, and the interior warmth and timber accents feel like a true heritage home.",
    author: "Marcus & Sarah Jenkins",
    location: "Bozeman, Montana",
    buildingType: "The Homestead Cabin",
    rating: 5,
  },
  {
    id: "test-2",
    quote: "ModularHome.com engineered our 60x100 clear-span workshop and barndominium with zero interior posts. High winds in Texas haven't so much as rattled a single panel. Outstanding craftsmanship and communication.",
    author: "David R. Caldwell",
    location: "Fredericksburg, Texas",
    buildingType: "Custom Barndominium",
    rating: 5,
  },
  {
    id: "test-3",
    quote: "We ordered The Retreat for an off-grid vacation property in North Carolina. Assembly was seamless and the customer support team guided us every step from permit drawings to final dry-in.",
    author: "Elena Rostova",
    location: "Asheville, North Carolina",
    buildingType: "The Retreat Tiny Home",
    rating: 5,
  },
];

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) => (current === 0 ? TESTIMONIALS.length - 1 : current - 1));
  };

  const next = () => {
    setActiveIndex((current) => (current === TESTIMONIALS.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="relative">
      {/* Desktop 3-Card Grid */}
      <div className="hidden lg:grid grid-cols-3 gap-8">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-white p-8 rounded-sm border border-[#E5E0D4] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4 text-[#B82025]">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#1D2521] leading-relaxed italic font-body">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div className="pt-6 mt-6 border-t border-[#F7F4EC] flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-[#1D2521] font-display uppercase tracking-tight">
                  {t.author}
                </h4>
                <p className="text-xs text-[#6B716D]">{t.location}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#F7F4EC] text-[#B82025] rounded-xs">
                {t.buildingType}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile / Tablet Carousel View */}
      <div className="lg:hidden">
        <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#E5E0D4] shadow-md flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex items-center gap-1 mb-4 text-[#B82025]">
              {[...Array(TESTIMONIALS[activeIndex].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-[#1D2521] leading-relaxed italic font-body">
              &ldquo;{TESTIMONIALS[activeIndex].quote}&rdquo;
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-[#F7F4EC] flex items-center justify-between">
            <div>
              <h4 className="text-sm font-extrabold text-[#1D2521] font-display uppercase tracking-tight">
                {TESTIMONIALS[activeIndex].author}
              </h4>
              <p className="text-xs text-[#6B716D]">{TESTIMONIALS[activeIndex].location}</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#F7F4EC] text-[#B82025] rounded-xs">
              {TESTIMONIALS[activeIndex].buildingType}
            </span>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-[#E5E0D4] bg-white hover:bg-[#B82025] hover:text-white flex items-center justify-center transition-colors shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            {TESTIMONIALS.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  idx === activeIndex ? "bg-[#B82025]" : "bg-[#E5E0D4]"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-[#E5E0D4] bg-white hover:bg-[#B82025] hover:text-white flex items-center justify-center transition-colors shadow-xs"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
