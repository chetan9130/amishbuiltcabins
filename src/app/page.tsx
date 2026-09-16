"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  Play, 
  Award, 
  Sliders, 
  Truck, 
  ShieldCheck,
  UploadCloud,
  Check,
  Star,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock
} from "lucide-react";
import CategoryCard from "@/components/CategoryCard";
import BuildingCard from "@/components/BuildingCard";
import VideoModal from "@/components/VideoModal";
import FeaturedHomesSection from "@/components/FeaturedHomesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import CustomizationSection from "@/components/CustomizationSection";
import HowItWorks from "@/components/HowItWorks";
import FinancingSection from "@/components/FinancingSection";
import LocationAvailability from "@/components/LocationAvailability";
import ResourcesSection from "@/components/ResourcesSection";
import CTASection from "@/components/CTASection";
import { CATEGORIES, BUILDING_MODELS } from "@/data/models";
import { VIDEOS_DATA, VideoItem } from "@/data/videos";

export default function HomePage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [homepageVideos, setHomepageVideos] = useState<VideoItem[]>(VIDEOS_DATA as unknown as VideoItem[]);

  useEffect(() => {
    async function loadHomepageVideos() {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();
        if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
          setHomepageVideos(data.videos as unknown as VideoItem[]);
        }
      } catch (err) {
        // keep fallback
      }
    }
    loadHomepageVideos();
  }, []);
  
  // Floor Plan Upload Dropzone State
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Testimonials Carousel Index for Mobile
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      id: "t-1",
      name: "James R.",
      location: "Kentucky",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "Amazing quality and great people to work with. Our cabin is everything we hoped for!",
    },
    {
      id: "t-2",
      name: "Sarah M.",
      location: "Tennessee",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      quote: "The process was easy and the building is beautiful. Highly recommend!",
    },
    {
      id: "t-3",
      name: "Mark T.",
      location: "Ohio",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: "Solid craftsmanship and excellent service. We love our barndominium!",
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFile) {
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 5000);
    }
  };

  const featuredFloorPlans = BUILDING_MODELS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[520px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#B82025] pt-28 pb-12 sm:pt-32 sm:pb-16">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
            alt="ModularHome.com"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-[0.78] contrast-[1.05]"
          />
          {/* Subtle vignette & left gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#8F171C]/90 via-black/50 to-transparent w-full md:w-[75%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* Hero Overlay Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-left">
            {/* Small Eyebrow */}
            <div className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-white mb-3 bg-[#B82025]/90 px-3 py-1 rounded-xs backdrop-blur-xs border border-white/20 shadow-xs">
              MODULAR & PREFAB HOUSING MARKETPLACE
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.05] font-display drop-shadow-lg">
              MODULARHOME.COM
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white/95 mt-2 font-display">
              Discover, Compare & Customize Your Home
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-base sm:text-lg font-semibold text-[#F7F4EC] tracking-wide">
              Modular Homes • Prefabs • Barndominiums • Cabins • ADUs • Custom Floor Plans
            </p>

            {/* Supporting Description */}
            <p className="mt-3 text-xs sm:text-sm text-white/90 leading-relaxed font-body max-w-xl">
              Factory-built precision engineered for permanent installation, vacation living, or additional dwelling units. Crafted for your land, your lifestyle, and your budget.
            </p>

            {/* Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href="/quote"
                className="px-6 py-3 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-all duration-200 flex items-center gap-2 shadow-lg hover:scale-[1.02]"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#categories"
                className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/40 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-all duration-200 backdrop-blur-xs"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          {/* Watch Our Story Overlay Badge */}
          <div className="hidden md:flex absolute bottom-4 right-6 lg:right-8 items-center">
            <button
              onClick={() => setSelectedVideo(VIDEOS_DATA[0])}
              className="bg-black/60 hover:bg-black/80 text-white p-3 rounded-xs border border-white/20 backdrop-blur-md flex items-center gap-3 transition-all hover:scale-105 cursor-pointer shadow-xl"
            >
              <div className="w-10 h-10 rounded-full bg-[#B82025] flex items-center justify-center text-white shrink-0">
                <Play className="w-4 h-4 ml-0.5 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Watch Our Story</div>
                <div className="text-[10px] text-white/70">See the ModularHome.com Difference</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION / COMPANY POSITIONING BENEFITS STRIP */}
      <section className="bg-[#8F171C] text-white py-4 sm:py-5 border-y border-[#721215]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-2">
              <div className="w-9 h-9 rounded-full bg-white text-[#B82025] flex items-center justify-center shrink-0 shadow-sm">
                <Award className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                Factory Precision Build
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-2 border-l border-white/10 sm:border-l-0">
              <div className="w-9 h-9 rounded-full bg-white text-[#B82025] flex items-center justify-center shrink-0 shadow-sm">
                <Sliders className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                100% Customizable Plans
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-2 border-t sm:border-t-0 border-white/10">
              <div className="w-9 h-9 rounded-full bg-white text-[#B82025] flex items-center justify-center shrink-0 shadow-sm">
                <Truck className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                Regional Delivery & Setup
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 p-2 border-t sm:border-t-0 border-l border-white/10 sm:border-l-0">
              <div className="w-9 h-9 rounded-full bg-white text-[#B82025] flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white font-display">
                Permanent Construction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOME CATEGORIES */}
      <section id="categories" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B82025]">
              MODULAR HOUSING CATEGORIES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D2521] mt-1 font-display">
              Explore Home Categories
            </h2>
            <p className="text-xs sm:text-sm text-[#6B716D] mt-2 leading-relaxed">
              Browse our diverse housing solutions ranging from permanent family residences to compact ADUs and mountain cabins.
            </p>
          </div>

          {/* 10 Visual Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                id={cat.id}
                title={cat.title}
                tagline={cat.tagline}
                image={cat.image}
                href={cat.href}
                cta={cat.cta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED HOMES (Filterable Grid) */}
      <FeaturedHomesSection />

      {/* 5. WHY CHOOSE US (Trust Cards) */}
      <WhyChooseUs />

      {/* 6. CUSTOMIZATION (15 Visual Cards) */}
      <CustomizationSection />

      {/* 7. POPULAR FLOOR PLANS FOR SALE & UPLOAD PLAN */}
      <section className="py-12 sm:py-16 bg-[#F7F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B82025]">
                POPULAR DESIGNS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D2521] mt-1 font-display">
                Featured Floor Plans
              </h2>
              <p className="text-xs sm:text-sm text-[#6B716D] mt-1">
                Explore pre-engineered layouts or upload your custom blueprint for a tailored estimate.
              </p>
            </div>
            <Link
              href="/models"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B82025] hover:text-[#8F171C] transition-colors shrink-0"
            >
              <span>Explore All Floor Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4-Column Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredFloorPlans.map((model) => (
              <BuildingCard key={model.id} model={model} />
            ))}
          </div>

          {/* Instant Quote + Upload Floor Plan Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Left Column: Instant Quote */}
            <div className="relative rounded-xs overflow-hidden bg-[#8F171C] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[320px] shadow-sm">
              <div className="absolute inset-0 z-0 opacity-25">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Cabin Interior"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-display">
                  Instant Quote Generator
                </h3>
                <p className="text-sm font-semibold text-[#F7F4EC]">
                  Get an estimated price in minutes.
                </p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md">
                  Select your home type, choose options, and receive a customized budget overview for your site.
                </p>
              </div>

              <div className="relative z-10 pt-6">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#B82025] hover:bg-[#721215] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-colors shadow-md"
                >
                  <span>Start Custom Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Upload Your Floor Plan */}
            <div className="bg-white border border-[#E5E0D4] rounded-xs p-8 sm:p-10 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none" />

              <div className="relative z-10 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1D2521] font-display">
                  Upload Custom Blueprint
                </h3>
                <p className="text-xs sm:text-sm text-[#6B716D] leading-relaxed">
                  Have an architect plan or draft sketch? Upload your floor plan for engineering evaluation.
                </p>

                {/* Dropzone Area */}
                <form onSubmit={handleUploadSubmit} className="pt-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xs p-5 text-center cursor-pointer transition-colors ${
                      dragActive
                        ? "border-[#B82025] bg-[#F7F4EC]"
                        : uploadedFile
                        ? "border-[#B82025] bg-[#F7F4EC]/50"
                        : "border-[#E5E0D4] hover:border-[#B82025] bg-[#F7F4EC]/30"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#B82025]/10 text-[#B82025] mx-auto flex items-center justify-center mb-2">
                      <UploadCloud className="w-5 h-5 text-[#B82025]" />
                    </div>

                    {uploadedFile ? (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#1D2521]">{uploadedFile.name}</p>
                        <p className="text-[11px] text-[#6B716D]">
                          {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to send
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-[#1D2521]">
                          Tap to select or drop floor plan
                        </p>
                        <p className="text-[11px] text-[#6B716D]">
                          (PDF, JPG, PNG)
                        </p>
                      </div>
                    )}
                  </div>

                  {uploadSuccess && (
                    <div className="mt-3 p-2 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#B82025] shrink-0" />
                      <span>Blueprint received! Our engineering team will follow up.</span>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Upload & Request Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. HOW IT WORKS (5-Step Process Timeline) */}
      <HowItWorks />

      {/* 9. FINANCING (Calculator & Payment Options) */}
      <FinancingSection />

      {/* 10. LOCATION / AVAILABILITY ("Find Your Home") */}
      <LocationAvailability />

      {/* 11. VIDEO HIGHLIGHTS */}
      <section className="py-12 sm:py-16 bg-[#8F171C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F7F4EC]">
                PROJECT TOURS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-display">
                See Our Homes in Action
              </h2>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                Video walk-throughs of completed modular homes, cabins, and barndominiums.
              </p>
            </div>
            <Link
              href="/videos"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-[#F7F4EC] transition-colors shrink-0"
            >
              <span>View Video Library</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepageVideos.slice(0, 4).map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="group cursor-pointer bg-[#721215] border border-[#8F171C] hover:border-white rounded-xs overflow-hidden transition-all duration-300 flex flex-col shadow-sm"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/40">
                  <Image
                    src={vid.thumbnail}
                    alt={vid.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#B82025] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-5 h-5 ml-0.5 fill-current" />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-xs flex items-center gap-1 backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-[#B82025]" />
                    <span>{vid.duration}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex items-center">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#F7F4EC] transition-colors line-clamp-2 font-display">
                    {vid.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. TESTIMONIALS */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#B82025]">
              HOMEOWNER STORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D2521] mt-1 font-display">
              What Our Customers Say
            </h2>
            <p className="text-xs sm:text-sm text-[#6B716D] mt-1">
              Read feedback from families and landowners who built with us.
            </p>
          </div>

          <div className="hidden md:grid grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-[#F7F4EC] p-6 rounded-xs border border-[#E5E0D4] shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#B82025]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1D2521] italic leading-relaxed font-body">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-[#E5E0D4]">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-[#E5E0D4]">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1D2521] font-display">{t.name}</h4>
                    <p className="text-[11px] text-[#6B716D]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Testimonial Carousel */}
          <div className="md:hidden">
            <div className="bg-[#F7F4EC] p-6 rounded-xs border border-[#E5E0D4] shadow-xs space-y-4">
              <div className="flex items-center gap-1 text-[#B82025]">
                {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#1D2521] italic leading-relaxed font-body">
                &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E0D4]">
                <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                  <Image src={testimonials[testimonialIndex].avatar} alt={testimonials[testimonialIndex].name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1D2521] font-display">{testimonials[testimonialIndex].name}</h4>
                  <p className="text-[11px] text-[#6B716D]">{testimonials[testimonialIndex].location}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full bg-white border border-[#E5E0D4] flex items-center justify-center text-[#1D2521] hover:text-[#B82025] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-2 h-2 rounded-full ${idx === testimonialIndex ? "bg-[#B82025]" : "bg-[#E5E0D4]"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-8 h-8 rounded-full bg-white border border-[#E5E0D4] flex items-center justify-center text-[#1D2521] hover:text-[#B82025] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. BLOG / RESOURCES SECTION */}
      <ResourcesSection />

      {/* 14. LEAD GENERATION FORM / REQUEST A QUOTE CTA */}
      <CTASection />

      {/* Video Modal Player */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}

