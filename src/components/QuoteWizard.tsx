"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  Sliders, 
  Maximize, 
  CheckCircle2, 
  RotateCcw,
  Phone,
  HelpCircle,
  FileCheck
} from "lucide-react";
import { BUILDING_MODELS, CATEGORIES, BuildingModel } from "@/data/models";
import { formatPrice } from "@/utils/currency";

const AVAILABLE_OPTIONS = [
  { id: "opt-porch", name: "Wraparound Covered Timber Porch", price: 14500, desc: "Solid 8x8 posts with black structural brackets" },
  { id: "opt-insul", name: "Extreme Climate R-38 Spray Foam Insulation", price: 9200, desc: "Superior closed-cell thermal break envelope" },
  { id: "opt-garage", name: "Attached 2-Car Insulated Garage Bay", price: 21000, desc: "Includes high-lift 10ft doors and concrete threshold" },
  { id: "opt-glass", name: "16ft Black Aluminum Panoramic Glass Wall", price: 12800, desc: "Multi-slide low-E architectural glass opening" },
  { id: "opt-loft", name: "Second-Story Structural Mezzanine / Loft", price: 16400, desc: "Adds 500+ sq ft floor joists and iron railing" },
  { id: "opt-standing-seam", name: "Concealed Fastener Standing Seam Roof Upgrade", price: 7800, desc: "26-gauge ultra-durability concealed roof fasteners" },
];

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<string>("Cabins");
  const [selectedModel, setSelectedModel] = useState<BuildingModel>(BUILDING_MODELS[0]);
  const [sqft, setSqft] = useState<number>(1200);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["opt-insul", "opt-porch"]);

  // Contact Info
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    timeline: "3-6 months",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Available models filtered by chosen category
  const filteredModels = useMemo(() => {
    const matched = BUILDING_MODELS.filter((m) => m.category === category);
    return matched.length > 0 ? matched : BUILDING_MODELS;
  }, [category]);

  // Price Calculation Engine
  const calculation = useMemo(() => {
    const standardSqft = selectedModel.sqft || 1000;
    const basePrice = selectedModel.startingPrice;
    const costPerSqFt = basePrice / standardSqft;

    const sizeAdjustedPrice = Math.round(sqft * costPerSqFt);

    const optionsTotal = selectedOptions.reduce((acc, optId) => {
      const opt = AVAILABLE_OPTIONS.find((o) => o.id === optId);
      return acc + (opt ? opt.price : 0);
    }, 0);

    const totalEstimate = sizeAdjustedPrice + optionsTotal;

    return {
      sizeAdjustedPrice,
      optionsTotal,
      totalEstimate,
    };
  }, [selectedModel, sqft, selectedOptions]);

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#B82025", "#8F171C", "#721215", "#F7F4EC"],
      });
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setStep(1);
    setSelectedOptions(["opt-insul", "opt-porch"]);
  };

  const formatCurrency = (val: number) => formatPrice(val);

  return (
    <div className="bg-white border border-[#E5E0D4] rounded-sm shadow-xl overflow-hidden text-[#1D2521]">
      {/* Wizard Progress Bar */}
      <div className="bg-[#F7F4EC] p-4 sm:p-6 border-b border-[#E5E0D4]">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {[
            { num: 1, label: "Building Type" },
            { num: 2, label: "Model" },
            { num: 3, label: "Size" },
            { num: 4, label: "Options" },
            { num: 5, label: "Estimate" },
            { num: 6, label: "Finalize" },
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center relative group">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                  step === s.num
                    ? "bg-[#B82025] text-white shadow-md"
                    : step > s.num
                    ? "bg-white text-[#B82025] border border-[#B82025]"
                    : "bg-white text-[#6B716D] border border-[#E5E0D4]"
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4 text-[#B82025]" /> : s.num}
              </div>
              <span
                className={`hidden md:block text-[11px] uppercase tracking-wider mt-2 font-semibold ${
                  step === s.num ? "text-[#1D2521]" : "text-[#6B716D]"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Interactive Step Container */}
      <div className="p-6 sm:p-10 min-h-[460px] flex flex-col justify-between bg-white">
        {!isSubmitted ? (
          <>
            {/* STEP 1: CHOOSE CATEGORY */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                    Step 01 of 06
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                    Select Building Type
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B716D] mt-1">
                    Choose the primary category for your planned structure.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = category === cat.id;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => {
                          setCategory(cat.id);
                          const firstMatching = BUILDING_MODELS.find((m) => m.category === cat.id);
                          if (firstMatching) {
                            setSelectedModel(firstMatching);
                            setSqft(firstMatching.sqft);
                          }
                        }}
                        className={`cursor-pointer relative p-5 rounded-sm border transition-all duration-300 flex items-start gap-4 ${
                          isSelected
                            ? "bg-[#F7F4EC] border-[#B82025] shadow-sm ring-1 ring-[#B82025]"
                            : "bg-white border-[#E5E0D4] hover:border-[#B82025] hover:bg-[#F7F4EC]/50"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "border-[#B82025] bg-[#B82025] text-white"
                              : "border-[#6B716D]"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                        <div>
                          <div className="text-base font-bold uppercase tracking-wide text-[#1D2521]">
                            {cat.title}
                          </div>
                          <p className="text-xs text-[#6B716D] mt-1 leading-relaxed">
                            {cat.tagline}
                          </p>
                          <span className="inline-block mt-3 text-[10px] uppercase font-bold tracking-wider text-[#B82025]">
                            {cat.count} Pre-Engineered Plans
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE MODEL */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                    Step 02 of 06
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                    Select Base Architectural Model
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B716D] mt-1">
                    Showing available models under <span className="text-[#B82025] font-semibold">{category}</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {filteredModels.map((m) => {
                    const isSelected = selectedModel.id === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => {
                          setSelectedModel(m);
                          setSqft(m.sqft);
                        }}
                        className={`cursor-pointer rounded-sm border overflow-hidden transition-all duration-300 ${
                          isSelected
                            ? "bg-[#F7F4EC] border-[#B82025] ring-1 ring-[#B82025] shadow-md"
                            : "bg-white border-[#E5E0D4] hover:border-[#B82025]"
                        }`}
                      >
                        <div className="relative aspect-[16/10] w-full bg-[#F7F4EC]">
                          <Image
                            src={m.primaryImage}
                            alt={m.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold bg-white/95 text-[#1D2521] rounded-xs shadow-xs">
                            {formatCurrency(m.startingPrice)}
                          </div>
                        </div>

                        <div className="p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase text-[#B82025]">
                              {m.series}
                            </span>
                            <span className="text-xs text-[#6B716D] font-semibold">
                              {m.sqft} SQ FT
                            </span>
                          </div>
                          <div className="text-sm font-bold uppercase text-[#1D2521]">
                            {m.name}
                          </div>
                          <div className="text-xs text-[#6B716D]">
                            {m.bedrooms > 0 ? `${m.bedrooms} Bed • ${m.bathrooms} Bath` : "Commercial Clear Span"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: ENTER SIZE */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                    Step 03 of 06
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                    Customize Square Footage
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B716D] mt-1">
                    Scale your footprint. The structural frame price automatically adjusts dynamically.
                  </p>
                </div>

                <div className="bg-[#F7F4EC] border border-[#E5E0D4] p-8 rounded-sm text-center space-y-6 shadow-xs">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B716D]">
                      Selected Model:
                    </span>
                    <div className="text-xl font-bold uppercase text-[#1D2521] mt-0.5">
                      {selectedModel.name}
                    </div>
                  </div>

                  <div className="py-4">
                    <div className="text-5xl sm:text-6xl font-black text-[#1D2521] font-display">
                      {new Intl.NumberFormat("en-US").format(sqft)}
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-[#B82025] mt-2">
                      SQUARE FEET
                    </div>
                  </div>

                  {/* Range Slider */}
                  <div className="space-y-2">
                    <input
                      type="range"
                      min={400}
                      max={6000}
                      step={50}
                      value={sqft}
                      onChange={(e) => setSqft(Number(e.target.value))}
                      className="w-full accent-[#B82025] cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[#6B716D]">
                      <span>400 SQ FT (Compact)</span>
                      <span>1,200 SQ FT (Cabin)</span>
                      <span>6,000 SQ FT (Large Estate)</span>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {[650, 1200, 1850, 2200, 2800, 3500].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSqft(preset)}
                        className={`px-3 py-1 text-xs font-semibold rounded-xs border transition-colors ${
                          sqft === preset
                            ? "bg-[#B82025] text-white border-[#B82025]"
                            : "bg-white text-[#1D2521] border-[#E5E0D4] hover:bg-[#B82025] hover:text-white"
                        }`}
                      >
                        {preset} SQ FT
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CHOOSE OPTIONS */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                    Step 04 of 06
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                    Select Upgrades & Packages
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B716D] mt-1">
                    Add factory-engineered porches, insulation, garage bays, or glass walls.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {AVAILABLE_OPTIONS.map((opt) => {
                    const isSelected = selectedOptions.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => toggleOption(opt.id)}
                        className={`cursor-pointer p-4 rounded-sm border transition-all duration-200 flex items-start justify-between gap-4 ${
                          isSelected
                            ? "bg-[#F7F4EC] border-[#B82025] shadow-xs"
                            : "bg-white border-[#E5E0D4] hover:border-[#B82025]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-5 h-5 rounded-xs border mt-0.5 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "border-[#B82025] bg-[#B82025] text-white"
                                : "border-[#6B716D]"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <div>
                            <div className="text-sm font-bold uppercase text-[#1D2521]">
                              {opt.name}
                            </div>
                            <p className="text-xs text-[#6B716D] mt-0.5 leading-relaxed">
                              {opt.desc}
                            </p>
                          </div>
                        </div>

                        <div className="text-xs font-bold text-[#B82025] shrink-0">
                          +{formatCurrency(opt.price)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: ESTIMATED PRICE REVIEW */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in duration-200 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                    Step 05 of 06
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                    Your Structural Estimate
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B716D] mt-1">
                    Based on your selected model footprint, square footage, and chosen upgrades.
                  </p>
                </div>

                <div className="bg-[#F7F4EC] border border-[#E5E0D4] p-6 sm:p-8 rounded-sm space-y-6 shadow-xs">
                  {/* Big Price Display */}
                  <div className="text-center py-4 border-b border-[#E5E0D4]">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#6B716D]">
                      Estimated Shell Cost
                    </span>
                    <div className="text-4xl sm:text-6xl font-black text-[#1D2521] font-display mt-2">
                      {formatCurrency(calculation.totalEstimate)}
                    </div>
                    <div className="text-xs text-[#B82025] font-bold mt-1">
                      Approx. {formatCurrency(Math.round(calculation.totalEstimate / sqft))} / SQ FT
                    </div>
                  </div>

                  {/* Breakdown Table */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-[#1D2521]">
                      <span>
                        {selectedModel.name} ({new Intl.NumberFormat("en-US").format(sqft)} SQ FT Engineered Shell)
                      </span>
                      <span className="font-bold">{formatCurrency(calculation.sizeAdjustedPrice)}</span>
                    </div>

                    {selectedOptions.map((optId) => {
                      const opt = AVAILABLE_OPTIONS.find((o) => o.id === optId);
                      if (!opt) return null;
                      return (
                        <div key={optId} className="flex justify-between text-xs text-[#6B716D]">
                          <span>+ {opt.name}</span>
                          <span className="text-[#B82025] font-bold">+{formatCurrency(opt.price)}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Disclaimer */}
                  <div className="p-4 bg-white border border-[#E5E0D4] rounded-sm text-[11px] text-[#6B716D] leading-relaxed flex items-start gap-3 shadow-xs">
                    <ShieldAlert className="w-4 h-4 text-[#B82025] shrink-0 mt-0.5" />
                    <span>
                      This is an estimated price. Final pricing may vary based on delivery distance, site soil conditions, regional snow/wind engineering calculations, and interior finish selections.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: CONTACT INFORMATION */}
            {step === 6 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                    Step 06 of 06
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                    Finalize & Lock Your Estimate
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B716D] mt-1">
                    Provide your delivery location and contact information to receive the full itemized spec packet.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2521] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Anderson"
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2521] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="support@modularhome.com"
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2521] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1-812-595-4033"
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2521] mb-1">
                      Build Site ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      placeholder="e.g. 78701"
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2521] mb-1">
                    Target Build Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm cursor-pointer"
                  >
                    <option value="Ready Immediately">Ready Immediately (Have Land & Permits)</option>
                    <option value="3-6 months">3 to 6 months</option>
                    <option value="6-12 months">6 to 12 months</option>
                    <option value="Planning & Research">Early Planning / Budgeting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1D2521] mb-1">
                    Special Requests or Site Conditions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about your property, slope, crane access or desired custom modifications..."
                    className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#B82025] hover:bg-[#8F171C] text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request My Official Estimate Packet</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Navigation Buttons (Back / Next) */}
            <div className="pt-8 mt-8 border-t border-[#E5E0D4] flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-5 py-2.5 bg-[#F7F4EC] hover:bg-[#B82025] hover:text-white border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider text-[#1D2521] rounded-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div></div>
              )}

              {step < 6 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 bg-[#B82025] hover:bg-[#8F171C] text-xs font-bold uppercase tracking-wider text-white rounded-sm transition-all duration-200 flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        ) : (
          /* SUCCESS STATE */
          <div className="text-center py-12 px-4 max-w-xl mx-auto space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#B82025]/10 border border-[#B82025] text-[#B82025] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#B82025]">
                Quote Request Received
              </div>
              <h3 className="text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
                Estimate Successfully Generated
              </h3>
              <p className="text-sm text-[#6B716D] mt-2 leading-relaxed">
                Thank you, <span className="text-[#1D2521] font-semibold">{formData.name || "friend"}</span>. We have generated an initial structural engineering estimate for your <span className="text-[#B82025] font-bold">{sqft} SQ FT {selectedModel.name}</span>.
              </p>
            </div>

            <div className="bg-[#F7F4EC] border border-[#E5E0D4] p-5 rounded-sm text-left space-y-2">
              <div className="flex justify-between text-xs text-[#6B716D]">
                <span>Reference ID:</span>
                <span className="font-mono text-[#1D2521] font-bold">VTX-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#6B716D]">
                <span>Estimated Shell Cost:</span>
                <span className="font-bold text-[#1D2521]">{formatCurrency(calculation.totalEstimate)}</span>
              </div>
              <div className="flex justify-between text-xs text-[#6B716D]">
                <span>Recipient:</span>
                <span className="text-[#1D2521] font-medium">{formData.email || "Email pending"}</span>
              </div>
            </div>

            <p className="text-xs text-[#6B716D]">
              A structural engineering specialist will review your local wind/snow specs and reach out within 1 business day.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-[#F7F4EC] border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider text-[#1D2521] rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Build Another Quote
              </button>
              <Link
                href="/buildings"
                className="w-full sm:w-auto px-6 py-2.5 bg-[#B82025] hover:bg-[#8F171C] text-xs font-bold uppercase tracking-wider text-white rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                Explore More Buildings
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
