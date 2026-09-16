"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Truck, ArrowRight, CheckCircle2, Search, Building2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { BUILDING_MODELS } from "@/data/models";
import { formatPrice } from "@/utils/currency";

const STATES_DATA = [
  { state: "Indiana", code: "IN", leadTime: "3–4 Weeks", permitRating: "Fast Approval", shippingMultiplier: 1.0 },
  { state: "Kentucky", code: "KY", leadTime: "4–5 Weeks", permitRating: "Standard", shippingMultiplier: 1.02 },
  { state: "Ohio", code: "OH", leadTime: "4–5 Weeks", permitRating: "Fast Approval", shippingMultiplier: 1.03 },
  { state: "Tennessee", code: "TN", leadTime: "4–6 Weeks", permitRating: "Standard", shippingMultiplier: 1.05 },
  { state: "Texas", code: "TX", leadTime: "5–6 Weeks", permitRating: "Fast Approval", shippingMultiplier: 1.08 },
  { state: "North Carolina", code: "NC", leadTime: "5–6 Weeks", permitRating: "Standard", shippingMultiplier: 1.06 },
  { state: "Georgia", code: "GA", leadTime: "4–6 Weeks", permitRating: "Standard", shippingMultiplier: 1.05 },
  { state: "Missouri", code: "MO", leadTime: "4–5 Weeks", permitRating: "Fast Approval", shippingMultiplier: 1.04 },
  { state: "Michigan", code: "MI", leadTime: "4–6 Weeks", permitRating: "Standard", shippingMultiplier: 1.05 },
  { state: "Florida", code: "FL", leadTime: "5–7 Weeks", permitRating: "Hurricane Certified", shippingMultiplier: 1.1 },
];

export default function LocationAvailability() {
  const [selectedState, setSelectedState] = useState<string>("IN");
  const [cityInput, setCityInput] = useState<string>("");
  const [zipInput, setZipInput] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);

  const activeStateObj = STATES_DATA.find((s) => s.code === selectedState) || STATES_DATA[0];

  const availableHomes = BUILDING_MODELS.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <section id="location" className="py-20 bg-white border-b border-[#E5E0D4] text-[#1D2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Nationwide Delivery & Permits"
          title="FIND HOMES AVAILABLE IN YOUR LOCATION"
          subtitle="Explore factory modular home availability, estimated local delivery lead times, and regional building code compliance for your state."
          align="center"
        />

        {/* Location Selector Bar */}
        <form onSubmit={handleSearch} className="mt-10 max-w-4xl mx-auto bg-[#F7F4EC] border border-[#E5E0D4] p-4 sm:p-6 rounded-sm shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-[#1D2521] mb-1">
                Select State *
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-white border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm font-semibold cursor-pointer"
              >
                {STATES_DATA.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.state} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[#1D2521] mb-1">
                City Name (Optional)
              </label>
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="e.g. Indianapolis"
                className="w-full bg-white border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-[#1D2521] mb-1">
                ZIP Code (Optional)
              </label>
              <input
                type="text"
                value={zipInput}
                onChange={(e) => setZipInput(e.target.value)}
                placeholder="e.g. 47170"
                className="w-full bg-white border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Check Local Delivery & Availability</span>
            </button>
          </div>
        </form>

        {/* Location Status Results Box */}
        <div className="mt-8 max-w-4xl mx-auto bg-white border border-[#E5E0D4] rounded-sm p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E0D4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B82025] text-white flex items-center justify-center shrink-0 font-bold shadow-xs">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-[#6B716D] uppercase font-bold">Active Region:</div>
                <div className="text-lg font-extrabold text-[#1D2521] font-display">
                  {activeStateObj.state} {cityInput ? `• ${cityInput}` : ""} {zipInput ? `(${zipInput})` : ""}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[#B82025] bg-red-50 border border-red-200 px-3 py-1.5 rounded-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Factory Delivery Available to {activeStateObj.state}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-[#F7F4EC] rounded-sm border border-[#E5E0D4]">
              <span className="text-[#6B716D] uppercase font-bold block mb-1">Estimated Delivery Lead Time</span>
              <span className="text-sm font-extrabold text-[#1D2521] font-display">{activeStateObj.leadTime}</span>
            </div>

            <div className="p-4 bg-[#F7F4EC] rounded-sm border border-[#E5E0D4]">
              <span className="text-[#6B716D] uppercase font-bold block mb-1">Building Code Status</span>
              <span className="text-sm font-extrabold text-[#1D2521] font-display">{activeStateObj.permitRating} Compliant</span>
            </div>

            <div className="p-4 bg-[#F7F4EC] rounded-sm border border-[#E5E0D4]">
              <span className="text-[#6B716D] uppercase font-bold block mb-1">Local Engineering Packet</span>
              <span className="text-sm font-extrabold text-[#B82025] font-display">Wet-Stamped Included</span>
            </div>
          </div>

          {/* Sample Available Homes in this Region */}
          <div className="pt-2">
            <div className="text-xs font-bold uppercase text-[#1D2521] tracking-wider mb-3">
              Popular Home Models Delivered to {activeStateObj.state}:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {availableHomes.map((home) => {
                const adjustedPrice = Math.round(home.startingPrice * activeStateObj.shippingMultiplier);
                return (
                  <div key={home.id} className="bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm overflow-hidden flex flex-col justify-between">
                    <div className="relative aspect-[16/10] w-full">
                      <Image src={home.primaryImage} alt={home.name} fill className="object-cover" />
                    </div>
                    <div className="p-3 space-y-1">
                      <div className="text-xs font-bold text-[#1D2521]">{home.name}</div>
                      <div className="text-[11px] text-[#6B716D]">{home.sqft} SQ FT • {home.bedrooms} Bed • {home.bathrooms} Bath</div>
                      <div className="text-xs font-extrabold text-[#B82025] pt-1">Starting at {formatPrice(adjustedPrice)}</div>
                    </div>
                    <div className="p-3 pt-0">
                      <Link href={`/buildings/${home.slug}`} className="block w-full text-center text-[11px] font-bold uppercase py-1.5 bg-white border border-[#E5E0D4] hover:bg-[#B82025] hover:text-white rounded-xs transition-colors">
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
