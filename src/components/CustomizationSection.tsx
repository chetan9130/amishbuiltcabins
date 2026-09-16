"use client";

import { 
  Sliders, 
  Layout, 
  Utensils, 
  Bath, 
  Maximize, 
  Home, 
  Layers, 
  Paintbrush, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Sun,
  Grid,
  CheckCircle2,
  Hammer
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const CUSTOMIZATION_ITEMS = [
  {
    icon: Layout,
    title: "Floor Plan Modifications",
    desc: "Expand living rooms, adjust hallway clearance, or add multi-generational wings.",
  },
  {
    icon: Grid,
    title: "Room Layouts",
    desc: "Reconfigure bedroom counts, home office placements, and open great room proportions.",
  },
  {
    icon: Utensils,
    title: "Kitchen Configuration",
    desc: "Custom island dimensions, prep pantries, appliance placement, and breakfast nooks.",
  },
  {
    icon: Bath,
    title: "Bathroom Layouts",
    desc: "Double-vanity master ensuites, walk-in stone showers, and soaking tub placement.",
  },
  {
    icon: Sun,
    title: "Windows & Doors",
    desc: "Energy Star Low-E glass, floor-to-ceiling gable glass walls, and sliding patio doors.",
  },
  {
    icon: Home,
    title: "Exterior Finishes",
    desc: "Engineered lap siding, rustic timber log wraps, board & batten, or stone veneer accents.",
  },
  {
    icon: Layers,
    title: "Roofing Options",
    desc: "Standing seam concealed fastener metal, architectural shingles, or alpine snow roofs.",
  },
  {
    icon: Compass,
    title: "Flooring Materials",
    desc: "Waterproof LVP timber planks, stained concrete, solid hardwood, or tile.",
  },
  {
    icon: Hammer,
    title: "Custom Cabinets",
    desc: "Solid wood shaker cabinets, soft-close hardware, and custom pantry shelving.",
  },
  {
    icon: Sparkles,
    title: "Fixtures & Hardware",
    desc: "Matte black, brushed brass, or oil-rubbed bronze plumbing and lighting fixtures.",
  },
  {
    icon: Sliders,
    title: "Porches & Decks",
    desc: "Covered timber breezeways, wraparound cedar decks, and screened-in porches.",
  },
  {
    icon: Maximize,
    title: "Square Footage",
    desc: "Scale footprints from cozy 650 sq ft ADUs up to 4,000+ sq ft multi-level estates.",
  },
  {
    icon: Paintbrush,
    title: "Interior Finishes",
    desc: "Tongue-and-groove pine ceilings, drywalled accent walls, and timber beam wraps.",
  },
  {
    icon: ShieldCheck,
    title: "Exterior Colors",
    desc: "Curated architectural color palettes, Kynar 500 paint finishes, and custom stains.",
  },
];

export default function CustomizationSection() {
  return (
    <section id="customization" className="py-20 bg-[#F7F4EC] border-b border-[#E5E0D4] text-[#1D2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Architectural Freedom"
          title="CUSTOMIZE EVERY DETAIL OF YOUR HOME"
          subtitle="Modular homes are not one-size-fits-all. Every floor plan, interior finish, and exterior feature can be tailored to match your property and lifestyle."
          align="center"
        />

        {/* 14 Feature Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {CUSTOMIZATION_ITEMS.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5E0D4] rounded-sm p-5 space-y-3 hover:border-[#B82025] hover:shadow-md transition-all group duration-200"
              >
                <div className="w-10 h-10 rounded-sm bg-[#F7F4EC] group-hover:bg-[#B82025] group-hover:text-white text-[#B82025] flex items-center justify-center transition-colors border border-[#E5E0D4]">
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase text-[#1D2521] font-display group-hover:text-[#B82025] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#6B716D] mt-1 leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-[#8F171C] text-white p-6 sm:p-8 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-extrabold uppercase font-display">Have Custom Blueprints or Architectural Sketches?</h4>
            <p className="text-xs text-white/90">Our engineering team can convert your existing floor plans into factory-ready modular blueprints.</p>
          </div>
          <a
            href="/upload-floor-plan"
            className="px-6 py-3 bg-white hover:bg-[#F7F4EC] text-[#B82025] text-xs font-bold uppercase tracking-wider rounded-sm shrink-0 transition-colors shadow-sm"
          >
            Upload Custom Floor Plan
          </a>
        </div>
      </div>
    </section>
  );
}
