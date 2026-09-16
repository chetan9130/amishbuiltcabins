"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  SlidersHorizontal, 
  Search, 
  X, 
  RotateCcw, 
  Building2, 
  Layers, 
  Bed, 
  DollarSign, 
  Maximize2 
} from "lucide-react";
import BuildingCard from "@/components/BuildingCard";
import SectionHeading from "@/components/SectionHeading";
import { BUILDING_MODELS, BuildingModel } from "@/data/models";

const CATEGORY_TABS = [
  "All",
  "Modular Homes",
  "Prefab Homes",
  "Barndominiums",
  "House Kits",
  "Tiny Homes",
  "Cabins",
  "ADUs & Granny Pods",
  "A-Frame Homes",
  "Commercial Buildings",
  "Custom Homes",
];

const ARCHITECTURAL_STYLES = [
  "All",
  "Modern Homes",
  "Farmhouse",
  "Ranch",
  "Cabin",
  "Contemporary",
  "Barndominium",
  "ADU",
  "Multi-Family",
];

export default function ModelsCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedStyle, setSelectedStyle] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [bedroomFilter, setBedroomFilter] = useState<string>("all");
  const [bathroomFilter, setBathroomFilter] = useState<string>("all");
  const [storiesFilter, setStoriesFilter] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(350000);
  const [minSqft, setMinSqft] = useState<number>(0);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && CATEGORY_TABS.includes(cat)) {
      setSelectedCategory(cat);
    }
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Filtering Logic
  const filteredModels = useMemo(() => {
    return BUILDING_MODELS.filter((model) => {
      // Category Filter
      if (selectedCategory !== "All" && model.category !== selectedCategory) {
        return false;
      }

      // Architectural Style Filter
      if (selectedStyle !== "All" && model.architecturalStyle !== selectedStyle) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = model.name.toLowerCase().includes(query);
        const matchesSeries = model.series.toLowerCase().includes(query);
        const matchesTagline = model.tagline.toLowerCase().includes(query);
        const matchesCat = model.category.toLowerCase().includes(query);
        if (!matchesName && !matchesSeries && !matchesTagline && !matchesCat) {
          return false;
        }
      }

      // Bedrooms Filter
      if (bedroomFilter !== "all") {
        const requiredBeds = parseInt(bedroomFilter, 10);
        if (model.bedrooms < requiredBeds) {
          return false;
        }
      }

      // Bathrooms Filter
      if (bathroomFilter !== "all") {
        const requiredBaths = parseInt(bathroomFilter, 10);
        if (model.bathrooms < requiredBaths) {
          return false;
        }
      }

      // Stories / Floors Filter
      if (storiesFilter !== "all") {
        const requiredStories = parseFloat(storiesFilter);
        if (model.stories < requiredStories) {
          return false;
        }
      }

      // Max Price Filter
      if (model.startingPrice > maxPrice) {
        return false;
      }

      // Min Sqft Filter
      if (model.sqft < minSqft) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, selectedStyle, searchQuery, bedroomFilter, bathroomFilter, storiesFilter, maxPrice, minSqft]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSelectedStyle("All");
    setSearchQuery("");
    setBedroomFilter("all");
    setBathroomFilter("all");
    setStoriesFilter("all");
    setMaxPrice(350000);
    setMinSqft(0);
  };

  const isFiltered =
    selectedCategory !== "All" ||
    selectedStyle !== "All" ||
    searchQuery !== "" ||
    bedroomFilter !== "all" ||
    bathroomFilter !== "all" ||
    storiesFilter !== "all" ||
    maxPrice < 350000 ||
    minSqft > 0;

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 text-[#1D2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="py-8 border-b border-[#E5E0D4]">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#B82025] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#B82025]"></span>
            <span>Floor Plans & Architectural Catalog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#1D2521] font-display">
            Explore Floor Plans
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#6B716D] max-w-3xl font-body">
            Discover, compare, and customize factory-built modular homes, prefabs, barndominiums, cabins, ADUs, A-frames, and commercial structures. Filter by bedrooms, bathrooms, square footage, home type, architectural style, and budget.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm shrink-0 transition-all duration-200 ${
                  selectedCategory === tab
                    ? "bg-[#B82025] text-white shadow-md"
                    : "bg-[#F7F4EC] text-[#1D2521] hover:bg-[#B82025] hover:text-white border border-[#E5E0D4] shadow-2xs"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Advanced Filters Bar */}
        <div className="py-6 border-b border-[#E5E0D4] bg-[#F7F4EC] px-4 sm:px-6 rounded-sm shadow-xs mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#6B716D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search floor plans by name, style, or type..."
                className="w-full bg-white border border-[#E5E0D4] pl-10 pr-4 py-2.5 text-xs text-[#1D2521] placeholder-[#6B716D] focus:outline-none focus:border-[#B82025] rounded-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B716D] hover:text-[#1D2521]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Reset Button */}
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#B82025] hover:bg-[#B82025] hover:text-white bg-white border border-[#E5E0D4] rounded-sm transition-colors shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>

          {/* Detailed Multi-Filter Controls */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Architectural Style */}
            <div className="flex flex-col bg-white border border-[#E5E0D4] px-3 py-2 rounded-sm">
              <span className="text-[10px] text-[#6B716D] uppercase font-bold">Style</span>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="bg-transparent text-xs text-[#1D2521] focus:outline-none font-semibold cursor-pointer pt-0.5"
              >
                {ARCHITECTURAL_STYLES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms Dropdown */}
            <div className="flex flex-col bg-white border border-[#E5E0D4] px-3 py-2 rounded-sm">
              <span className="text-[10px] text-[#6B716D] uppercase font-bold">Bedrooms</span>
              <select
                value={bedroomFilter}
                onChange={(e) => setBedroomFilter(e.target.value)}
                className="bg-transparent text-xs text-[#1D2521] focus:outline-none font-semibold cursor-pointer pt-0.5"
              >
                <option value="all">Any Beds</option>
                <option value="1">1+ Bed</option>
                <option value="2">2+ Bed</option>
                <option value="3">3+ Bed</option>
                <option value="4">4+ Bed</option>
              </select>
            </div>

            {/* Bathrooms Dropdown */}
            <div className="flex flex-col bg-white border border-[#E5E0D4] px-3 py-2 rounded-sm">
              <span className="text-[10px] text-[#6B716D] uppercase font-bold">Bathrooms</span>
              <select
                value={bathroomFilter}
                onChange={(e) => setBathroomFilter(e.target.value)}
                className="bg-transparent text-xs text-[#1D2521] focus:outline-none font-semibold cursor-pointer pt-0.5"
              >
                <option value="all">Any Baths</option>
                <option value="1">1+ Bath</option>
                <option value="2">2+ Bath</option>
                <option value="3">3+ Bath</option>
              </select>
            </div>

            {/* Floors / Stories */}
            <div className="flex flex-col bg-white border border-[#E5E0D4] px-3 py-2 rounded-sm">
              <span className="text-[10px] text-[#6B716D] uppercase font-bold">Floors</span>
              <select
                value={storiesFilter}
                onChange={(e) => setStoriesFilter(e.target.value)}
                className="bg-transparent text-xs text-[#1D2521] focus:outline-none font-semibold cursor-pointer pt-0.5"
              >
                <option value="all">Any Floors</option>
                <option value="1">1 Story</option>
                <option value="2">2 Stories</option>
              </select>
            </div>

            {/* Min SQ FT Dropdown */}
            <div className="flex flex-col bg-white border border-[#E5E0D4] px-3 py-2 rounded-sm">
              <span className="text-[10px] text-[#6B716D] uppercase font-bold">Min Sq Ft</span>
              <select
                value={minSqft}
                onChange={(e) => setMinSqft(Number(e.target.value))}
                className="bg-transparent text-xs text-[#1D2521] focus:outline-none font-semibold cursor-pointer pt-0.5"
              >
                <option value={0}>Any Size</option>
                <option value={600}>600+ Sq Ft</option>
                <option value={1200}>1,200+ Sq Ft</option>
                <option value={1800}>1,800+ Sq Ft</option>
                <option value={2400}>2,400+ Sq Ft</option>
              </select>
            </div>

            {/* Max Price Filter */}
            <div className="flex flex-col bg-white border border-[#E5E0D4] px-3 py-2 rounded-sm">
              <span className="text-[10px] text-[#6B716D] uppercase font-bold">Max Price</span>
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="bg-transparent text-xs text-[#1D2521] focus:outline-none font-semibold cursor-pointer pt-0.5"
              >
                <option value={350000}>All Prices</option>
                <option value={250000}>Under $250,000</option>
                <option value={180000}>Under $180,000</option>
                <option value={120000}>Under $120,000</option>
                <option value={75000}>Under $75,000</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter & Active Criteria */}
        <div className="py-4 flex items-center justify-between text-xs text-[#6B716D]">
          <div>
            Showing <span className="text-[#1D2521] font-bold">{filteredModels.length}</span> of {BUILDING_MODELS.length} architectural models
          </div>
          {isFiltered && (
            <span className="text-[#B82025] font-bold">
              Filtered results active
            </span>
          )}
        </div>

        {/* Product Grid */}
        {filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
            {filteredModels.map((model) => (
              <BuildingCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm p-8 space-y-4 shadow-sm">
            <Building2 className="w-12 h-12 text-[#6B716D] mx-auto" />
            <h3 className="text-xl font-bold uppercase text-[#1D2521] font-display">
              No Architectural Models Match Your Criteria
            </h3>
            <p className="text-xs sm:text-sm text-[#6B716D] max-w-md mx-auto">
              Try adjusting your maximum price, bedroom count, or category tabs to view our full collection of engineered plans.
            </p>
            <div className="pt-2">
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#B82025] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#8F171C] transition-colors shadow-xs"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
