"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Phone, 
  ShieldCheck, 
  Check, 
  Maximize2, 
  Layers, 
  Wind, 
  Play, 
  Bed, 
  Bath, 
  CheckCircle2, 
  X 
} from "lucide-react";
import { BuildingModel } from "@/data/models";
import BuildingCard from "@/components/BuildingCard";
import VideoModal from "@/components/VideoModal";
import { VideoItem } from "@/data/videos";
import { formatPrice } from "@/utils/currency";

interface ModelDetailClientProps {
  model: BuildingModel;
  relatedModels: BuildingModel[];
}

export default function ModelDetailClient({ model, relatedModels }: ModelDetailClientProps) {
  const [activeImage, setActiveImage] = useState<string>(model.primaryImage);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [floorPlanExpanded, setFloorPlanExpanded] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const formattedBasePrice = formatPrice(model.startingPrice);

  const optionsTotal = selectedOptions.reduce((acc, optId) => {
    const opt = model.customizableOptions.find((o) => o.id === optId);
    return acc + (opt ? opt.price : 0);
  }, 0);

  const totalCalculatedPrice = model.startingPrice + optionsTotal;

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleOpenVideo = () => {
    setActiveVideo({
      id: `vid-${model.id}`,
      title: model.videoTitle || `${model.name} Architectural Walkthrough`,
      category: "Building Tours",
      duration: model.videoDuration || "4:30 min",
      description: `Official walkthrough of the ${model.name}. Discover the rigid frame engineering, high vaulted ceilings, and custom interior finishes.`,
      thumbnail: model.primaryImage,
      views: "142K views",
      date: "Recent Tour",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    });
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-28 text-[#1D2521]">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-[#6B716D]">
        <div className="flex items-center gap-2">
          <Link href="/" className="hover:text-[#1D2521] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/buildings" className="hover:text-[#1D2521] transition-colors">Buildings</Link>
          <span>/</span>
          <span className="text-[#B82025] font-bold uppercase">{model.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION: Gallery + Core Specs Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Viewport (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden bg-[#F7F4EC] border border-[#E5E0D4] shadow-md">
              <Image
                src={activeImage}
                alt={model.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Video Tour Quick Trigger Badge */}
              <button
                onClick={handleOpenVideo}
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-white/95 hover:bg-[#B82025] text-[#1D2521] hover:text-white border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Video Tour ({model.videoDuration || "Tour"})</span>
              </button>
            </div>

            {/* Thumbnail Navigation Bar */}
            <div className="grid grid-cols-4 gap-3">
              {model.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-[16/10] rounded-sm overflow-hidden border transition-all ${
                    activeImage === img
                      ? "border-[#B82025] ring-2 ring-[#B82025]/40 scale-[1.02]"
                      : "border-[#E5E0D4] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${model.name} angle ${idx + 1}`}
                    fill
                    sizes="20vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Model Information & Sticky Pricing Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm shadow-md space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B82025]">
                  {model.series} • {model.category}
                </span>
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                  {model.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#6B716D] mt-2 leading-relaxed font-body">
                  {model.tagline}
                </p>
              </div>

              {/* Core Specs Grid */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-white border border-[#E5E0D4] rounded-sm text-center">
                <div className="flex flex-col items-center">
                  <Maximize2 className="w-4 h-4 text-[#B82025] mb-1" />
                  <span className="text-[10px] uppercase text-[#6B716D] font-bold">Area</span>
                  <span className="font-bold text-sm text-[#1D2521]">{model.sqft} SQ FT</span>
                </div>
                <div className="flex flex-col items-center border-x border-[#E5E0D4]">
                  <Bed className="w-4 h-4 text-[#B82025] mb-1" />
                  <span className="text-[10px] uppercase text-[#6B716D] font-bold">Bedrooms</span>
                  <span className="font-bold text-sm text-[#1D2521]">{model.bedrooms > 0 ? `${model.bedrooms} Bed` : "Open"}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Bath className="w-4 h-4 text-[#B82025] mb-1" />
                  <span className="text-[10px] uppercase text-[#6B716D] font-bold">Bathrooms</span>
                  <span className="font-bold text-sm text-[#1D2521]">{model.bathrooms > 0 ? `${model.bathrooms} Bath` : "Shop"}</span>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="pt-2 border-t border-[#E5E0D4] flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#6B716D] font-bold">Starting Price</div>
                  <div className="text-3xl font-black text-[#1D2521] font-display">
                    {formatPrice(totalCalculatedPrice)}
                  </div>
                </div>
                {selectedOptions.length > 0 && (
                  <div className="text-right">
                    <span className="text-[10px] text-[#B82025] font-bold">
                      +{formatPrice(optionsTotal)} in Options
                    </span>
                  </div>
                )}
              </div>

              {/* Call-to-action buttons */}
              <div className="space-y-3 pt-2">
                <Link
                  href={`/quote`}
                  className="w-full py-4 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>Customize & Get Official Quote</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:+18125954033"
                    className="py-3 bg-white hover:bg-[#B82025] hover:text-white border border-[#E5E0D4] text-[#1D2521] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B82025]" />
                    <span>Call +1-812-595-4033</span>
                  </a>

                  <Link
                    href="/upload-floor-plan"
                    className="py-3 bg-white hover:bg-[#B82025] hover:text-white border border-[#E5E0D4] text-[#1D2521] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Upload Plan</span>
                  </Link>
                </div>
              </div>

              {/* Engineering highlights badge */}
              <div className="p-3 bg-white border border-[#E5E0D4] rounded-sm flex items-center gap-3 text-xs text-[#6B716D]">
                <ShieldCheck className="w-4 h-4 text-[#B82025] shrink-0" />
                <span>{model.warranty} • IBC & IRC Engineered</span>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED CONTENT SECTIONS */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Main Information Columns (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview */}
            <section className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                Design & Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                Architectural Overview
              </h2>
              <p className="text-sm sm:text-base text-[#6B716D] leading-relaxed font-body">
                {model.description}
              </p>
            </section>

            {/* Floor Plan Section */}
            <section className="space-y-6 pt-8 border-t border-[#E5E0D4]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                    Layout & Dimensions
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                    Architectural Floor Plan
                  </h2>
                </div>
                <button
                  onClick={() => setFloorPlanExpanded(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1D2521] bg-[#F7F4EC] hover:bg-[#B82025] hover:text-white border border-[#E5E0D4] rounded-sm transition-colors shadow-xs"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Blueprint</span>
                </button>
              </div>

              {/* Floor Plan Viewer Box */}
              <div
                onClick={() => setFloorPlanExpanded(true)}
                className="cursor-pointer relative aspect-[16/9] w-full rounded-sm overflow-hidden bg-[#F7F4EC] border border-[#E5E0D4] group shadow-md"
              >
                <Image
                  src={model.floorPlanImage}
                  alt={`${model.name} Floor Plan Schematic`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-semibold">{model.dimensions} Standard Footprint</span>
                  <span className="text-[#F7F4EC] font-bold">Click to view full layout →</span>
                </div>
              </div>
            </section>

            {/* Technical Specifications Table */}
            <section className="space-y-6 pt-8 border-t border-[#E5E0D4]">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                  Structural Tolerances
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                  Technical Specifications
                </h2>
              </div>

              <div className="bg-white border border-[#E5E0D4] rounded-sm overflow-hidden shadow-xs">
                <div className="divide-y divide-[#E5E0D4]">
                  <div className="grid grid-cols-2 p-4 text-xs">
                    <span className="text-[#6B716D] uppercase font-bold">Framing System</span>
                    <span className="text-[#1D2521] font-semibold">{model.frameType}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4 text-xs bg-[#F7F4EC]">
                    <span className="text-[#6B716D] uppercase font-bold">Standard Dimensions</span>
                    <span className="text-[#1D2521] font-semibold">{model.dimensions}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4 text-xs">
                    <span className="text-[#6B716D] uppercase font-bold">Roof Pitch & Profile</span>
                    <span className="text-[#1D2521] font-semibold">{model.roofPitch}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4 text-xs bg-[#F7F4EC]">
                    <span className="text-[#6B716D] uppercase font-bold">Wind Speed Rating</span>
                    <span className="text-[#1D2521] font-semibold">{model.windRating}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4 text-xs">
                    <span className="text-[#6B716D] uppercase font-bold">Ground Snow Load</span>
                    <span className="text-[#1D2521] font-semibold">{model.snowLoad}</span>
                  </div>
                  <div className="grid grid-cols-2 p-4 text-xs bg-[#F7F4EC]">
                    <span className="text-[#6B716D] uppercase font-bold">Structural Warranty</span>
                    <span className="text-[#B82025] font-bold">{model.warranty}</span>
                  </div>

                  {model.specs.map((spec, idx) => (
                    <div key={idx} className={`grid grid-cols-2 p-4 text-xs ${idx % 2 === 1 ? "bg-[#F7F4EC]" : ""}`}>
                      <span className="text-[#6B716D] uppercase font-bold">{spec.label}</span>
                      <span className="text-[#1D2521] font-semibold">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Included Architectural Features */}
            <section className="space-y-6 pt-8 border-t border-[#E5E0D4]">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                  Standard Package
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                  Engineered Features
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {model.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-sm bg-[#F7F4EC] border border-[#E5E0D4] flex items-start gap-3 shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#B82025] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#1D2521] leading-relaxed font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Construction & Engineering Information */}
            <section className="space-y-6 pt-8 border-t border-[#E5E0D4]">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                  Factory Precision
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                  Construction & Quality Standards
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-sm bg-[#F7F4EC] border border-[#E5E0D4] space-y-2">
                  <div className="text-xs uppercase font-bold text-[#1D2521]">Climate-Controlled Manufacturing</div>
                  <p className="text-xs text-[#6B716D] leading-relaxed">
                    Built in indoor facilities protected from moisture, rain, and UV degradation. Ensures zero warping, tight tolerances, and superior structural integrity.
                  </p>
                </div>

                <div className="p-5 rounded-sm bg-[#F7F4EC] border border-[#E5E0D4] space-y-2">
                  <div className="text-xs uppercase font-bold text-[#1D2521]">Engineered Building Code Standards</div>
                  <p className="text-xs text-[#6B716D] leading-relaxed">
                    Compliant with IRC, IBC, and regional energy code standards. Includes wet-stamped county engineering calculation packets ready for local permitting.
                  </p>
                </div>

                <div className="p-5 rounded-sm bg-[#F7F4EC] border border-[#E5E0D4] space-y-2">
                  <div className="text-xs uppercase font-bold text-[#1D2521]">High Thermal Envelope</div>
                  <p className="text-xs text-[#6B716D] leading-relaxed">
                    High R-value wall and roof insulation options, thermal break barriers, and double-pane Low-E argon insulated windows for low heating & cooling costs.
                  </p>
                </div>

                <div className="p-5 rounded-sm bg-[#F7F4EC] border border-[#E5E0D4] space-y-2">
                  <div className="text-xs uppercase font-bold text-[#1D2521]">Severe Weather Certification</div>
                  <p className="text-xs text-[#6B716D] leading-relaxed">
                    Engineered for high wind zones (up to {model.windRating}) and heavy alpine snow loads (up to {model.snowLoad}). Covered by our {model.warranty}.
                  </p>
                </div>
              </div>
            </section>

            {/* Delivery & Logistics Information */}
            <section className="space-y-6 pt-8 border-t border-[#E5E0D4]">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                  Site Logistics
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                  Delivery & Site Preparation
                </h2>
              </div>

              <div className="p-6 rounded-sm bg-white border border-[#E5E0D4] space-y-4 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D4]">
                  <div>
                    <div className="text-sm font-bold text-[#1D2521]">Nationwide Freight Logistics</div>
                    <div className="text-xs text-[#6B716D]">Transported directly to your build site via specialized low-boy carriers or modular hydraulic trailers.</div>
                  </div>
                  <span className="px-3 py-1 bg-[#F7F4EC] border border-[#E5E0D4] text-xs font-bold text-[#B82025] rounded-xs shrink-0">
                    Lead Time: 4–6 Weeks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="font-bold text-[#1D2521] block mb-1">1. Access Requirements</span>
                    <p className="text-[#6B716D] leading-relaxed">14ft overhead clearance along delivery route and clear turn radius for transport trucks.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#1D2521] block mb-1">2. Foundation Preparation</span>
                    <p className="text-[#6B716D] leading-relaxed">Monolithic concrete slab, stem wall crawlspace, or reinforced pier runners level within 1/4 inch.</p>
                  </div>
                  <div>
                    <span className="font-bold text-[#1D2521] block mb-1">3. Installation Support</span>
                    <p className="text-[#6B716D] leading-relaxed">Our logistics advisors assist local crane operators and set crews during delivery day.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Customization Options & Configurator (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm p-6 space-y-6 sticky top-28 shadow-md">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                  Factory Add-ons
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                  Available Upgrades
                </h3>
                <p className="text-xs text-[#6B716D] mt-1">
                  Click to add options directly to your estimated pricing summary.
                </p>
              </div>

              <div className="space-y-3">
                {model.customizableOptions.map((option) => {
                  const isChecked = selectedOptions.includes(option.id);
                  return (
                    <div
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`cursor-pointer p-3.5 rounded-sm border transition-all ${
                        isChecked
                          ? "bg-white border-[#B82025] shadow-xs"
                          : "bg-white/80 border-[#E5E0D4] hover:border-[#B82025]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-xs border mt-0.5 flex items-center justify-center shrink-0 ${
                              isChecked
                                ? "border-[#B82025] bg-[#B82025] text-white"
                                : "border-[#6B716D]"
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold uppercase text-[#1D2521]">
                              {option.name}
                            </div>
                            <div className="text-[11px] text-[#6B716D] mt-0.5">
                              {option.description}
                            </div>
                          </div>
                        </div>

                        <span className="text-xs font-bold text-[#B82025] shrink-0">
                          +{formatPrice(option.price)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Calculation */}
              <div className="pt-4 border-t border-[#E5E0D4] space-y-3">
                <div className="flex justify-between text-xs text-[#6B716D]">
                  <span>Base Model:</span>
                  <span className="text-[#1D2521] font-semibold">{formattedBasePrice}</span>
                </div>
                <div className="flex justify-between text-xs text-[#6B716D]">
                  <span>Selected Upgrades:</span>
                  <span className="text-[#B82025] font-bold">+{formatPrice(optionsTotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1D2521] pt-2 border-t border-[#E5E0D4]">
                  <span>Updated Estimate:</span>
                  <span className="text-[#B82025] text-lg font-black">
                    {formatPrice(totalCalculatedPrice)}
                  </span>
                </div>

                {/* Main Action CTAs */}
                <div className="space-y-2 pt-1">
                  <Link
                    href="/quote"
                    className="w-full py-3.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Request a Detailed Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="tel:+18125954033"
                    className="w-full py-3 bg-[#8F171C] hover:bg-[#721215] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-white" />
                    <span>Call +1-812-595-4033</span>
                  </a>

                  <Link
                    href="/contact"
                    className="w-full py-2.5 bg-white hover:bg-[#F7F4EC] text-[#1D2521] border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors text-center block"
                  >
                    Contact Building Advisor
                  </Link>
                </div>

                {/* Financing Box */}
                <div className="p-3 bg-white border border-[#E5E0D4] rounded-sm text-xs text-[#6B716D] space-y-1">
                  <div className="font-bold text-[#1D2521] uppercase text-[11px]">Financing Available</div>
                  <p className="text-[11px] leading-relaxed">
                    Estimated payments from <strong className="text-[#B82025]">${Math.round(totalCalculatedPrice * 0.0065)}/mo</strong> with approved credit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED MODELS SECTION */}
        {relatedModels.length > 0 && (
          <div className="mt-28 pt-16 border-t border-[#E5E0D4]">
            <div className="mb-10">
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                Similar Footprints
              </div>
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                Related Building Models
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedModels.map((m) => (
                <BuildingCard key={m.id} model={m} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY BOTTOM CTA BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E0D4] p-3 shadow-2xl flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase font-bold text-[#6B716D] leading-tight">{model.name}</div>
          <div className="text-base font-black text-[#B82025] font-display leading-tight">
            {formatPrice(totalCalculatedPrice)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+18125954033"
            className="p-2.5 bg-[#B82025] text-white rounded-sm hover:bg-[#8F171C] transition-colors shrink-0"
            aria-label="Call +1-812-595-4033"
          >
            <Phone className="w-4 h-4 text-white" />
          </a>
          <Link
            href="/quote"
            className="px-4 py-2.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors shrink-0 shadow-sm"
          >
            Request Quote
          </Link>
        </div>
      </div>

      {/* Floor Plan Fullscreen Modal */}
      {floorPlanExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-5xl w-full bg-white border border-[#E5E0D4] rounded-sm p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D4]">
              <h3 className="text-lg font-bold uppercase text-[#1D2521]">
                {model.name} — Detailed Floor Plan ({model.dimensions})
              </h3>
              <button
                onClick={() => setFloorPlanExpanded(false)}
                className="p-1.5 text-[#6B716D] hover:text-[#1D2521] rounded-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative aspect-[16/10] w-full mt-4 bg-[#F7F4EC] rounded-sm overflow-hidden">
              <Image
                src={model.floorPlanImage}
                alt={`${model.name} Full Blueprint`}
                fill
                className="object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-[#6B716D]">
              <span>Dimensions: {model.dimensions} | Total Under Roof: {model.sqft} SQ FT</span>
              <Link
                href="/upload-floor-plan"
                className="text-[#B82025] hover:underline font-bold"
              >
                Request Custom Modifications to This Plan →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal Player */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </div>
  );
}
