import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Flame, 
  CheckCircle2, 
  Hammer 
} from "lucide-react";
import StatsSection from "@/components/StatsSection";
import SectionHeading from "@/components/SectionHeading";

export const metadata = {
  title: "About ModularHome.com | Modern Modular Housing Marketplace",
  description: "Learn about ModularHome.com's manufacturing network, customizable floor plans, quality standards, and factory-built housing solutions.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-28 text-[#1D2521]">
      {/* 1. HERO */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-[#F7F4EC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#B82025] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#B82025]"></span>
              <span>ModularHome.com • About Our Company</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#1D2521] font-display leading-[0.95]">
              Building A Better <br />
              <span className="text-[#B82025]">Way To Live.</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-[#1D2521] font-semibold italic">
              &ldquo;Discover, Compare & Customize Your Modular Home.&rdquo;
            </p>
            <p className="mt-4 text-base sm:text-lg text-[#6B716D] leading-relaxed font-body">
              ModularHome.com is a leading marketplace for modular and prefabricated housing solutions, combining factory precision engineering with modern architectural design and transparent pricing.
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <StatsSection />

      {/* 3. COMPANY STORY & PARTNERSHIP */}
      <section className="py-24 bg-[#F7F4EC] border-b border-[#E5E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                <span>Our Heritage & Communities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                Traditional Craftsmanship Meets Modern Modular Innovation
              </h2>
              <p className="text-sm sm:text-base text-[#6B716D] leading-relaxed font-body">
                Headquartered at 677 S. Cardinal Lane in Scottsburg, Indiana, <strong className="text-[#1D2521]">ModularHome.com</strong> works with trusted builders and manufacturing partners to provide modular and customizable housing solutions to customers across the United States.
              </p>
              <p className="text-sm sm:text-base text-[#6B716D] leading-relaxed font-body">
                We specialize in handcrafted cabins, modular homes, prefab homes, tiny homes, barndominiums, steel homes, panelized house kits, and custom residential structures. By combining time-tested carpentry with efficient modular and prefabricated construction methods, we deliver durable, energy-efficient homes faster and at honest, transparent prices.
              </p>

              {/* 8 Core Focus Badges */}
              <div className="pt-2">
                <div className="text-xs uppercase font-bold text-[#1D2521] tracking-wider mb-3">Our Core Company Focus:</div>
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-[#1D2521]">
                  <span className="flex items-center gap-2 p-2 bg-white rounded-sm border border-[#E5E0D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                    Quality Craftsmanship
                  </span>
                  <span className="flex items-center gap-2 p-2 bg-white rounded-sm border border-[#E5E0D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                    Customizable Designs
                  </span>
                  <span className="flex items-center gap-2 p-2 bg-white rounded-sm border border-[#E5E0D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                    Transparent Pricing
                  </span>
                  <span className="flex items-center gap-2 p-2 bg-white rounded-sm border border-[#E5E0D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                    Customer Support
                  </span>
                  <span className="flex items-center gap-2 p-2 bg-white rounded-sm border border-[#E5E0D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                    Modular Construction
                  </span>
                  <span className="flex items-center gap-2 p-2 bg-white rounded-sm border border-[#E5E0D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                    Cabin & Home Delivery
                  </span>
                  <span className="flex items-center gap-2 p-2 bg-white rounded-sm border border-[#E5E0D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                    Installation Support
                  </span>
                  <span className="flex items-center gap-2 p-2 bg-white rounded-sm border border-[#E5E0D4]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                    Custom Housing Solutions
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#E5E0D4] shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Amish Built Cabins Modern Architectural Building Structure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW THE PROCESS WORKS (9-Step Customer Journey) */}
      <section id="process" className="py-24 bg-white border-b border-[#E5E0D4] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Customer Journey"
            title="HOW THE PROCESS WORKS"
            subtitle="From initial discovery to final move-in, our structured 9-step journey ensures your project is smooth and transparent."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { num: "01", title: "Browse Designs", desc: "Explore our diverse portfolio of cabins, modular homes, barndominiums, and house plans online." },
              { num: "02", title: "Choose Your Model", desc: "Select the architectural layout, footprint, and bedroom/bathroom count that fits your lifestyle." },
              { num: "03", title: "Discuss Customization", desc: "Collaborate with our team to customize finishes, interior floor plans, porches, and architectural features." },
              { num: "04", title: "Request Pricing", desc: "Receive transparent, itemized pricing and comprehensive specifications for your chosen package." },
              { num: "05", title: "Prepare Your Site", desc: "Get your property ready with foundation, site grading, utility hookups, and required local permits." },
              { num: "06", title: "Manufacturing / Construction", desc: "Your cabin or modular home is built with precision by experienced Amish, Mennonite, and trusted craftspeople." },
              { num: "07", title: "Delivery", desc: "Coordinated transport delivers your completed cabin or modular components safely to your job site." },
              { num: "08", title: "Installation", desc: "Our installation support team ensures proper anchoring, leveling, and structural assembly." },
              { num: "09", title: "Final Completion", desc: "Final walkthrough, finish trim, and handover—ready for you to move in and enjoy for generations." },
            ].map((step) => (
              <div
                key={step.num}
                className="p-6 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm relative hover:border-[#B82025] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-black font-display text-[#B82025]">
                    {step.num}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B716D] bg-white px-2 py-0.5 border border-[#E5E0D4] rounded-xs">
                    Phase {step.num}
                  </span>
                </div>
                <h3 className="text-base font-bold uppercase tracking-tight text-[#1D2521] font-display">
                  {step.title}
                </h3>
                <p className="text-xs text-[#6B716D] mt-2 leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMIZATION OPTIONS SECTION */}
      <section id="customization" className="py-24 bg-[#F7F4EC] border-b border-[#E5E0D4] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Tailored To You"
            title="CUSTOMIZATION OPTIONS"
            subtitle="Every property and family has unique needs. Tailor available designs to match your vision, tastes, and budget."
            align="left"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {[
              { title: "Floor Plans", desc: "Configurable living rooms, cathedral lofts, and flexible bedroom layouts." },
              { title: "Layouts", desc: "Open-concept or traditional partitioned plans adapted to your footprint." },
              { title: "Exterior Finishes", desc: "Board-and-batten, cedar siding, rustic logs, or standing-seam steel cladding." },
              { title: "Interior Finishes", desc: "Tongue-and-groove pine, modern drywall, rustic exposed timber accents." },
              { title: "Flooring", desc: "Luxury vinyl plank, solid hardwood, polished concrete, or tile." },
              { title: "Kitchen", desc: "Custom solid wood cabinetry, quartz/granite countertops, and appliance packages." },
              { title: "Bathroom", desc: "Custom vanities, walk-in tile showers, freestanding soaker tubs." },
              { title: "Windows", desc: "Energy Star insulated glass, black architectural frames, and panoramic picture windows." },
              { title: "Doors", desc: "Rustic solid wood doors, heavy fiberglass entry doors, and sliding glass patio doors." },
              { title: "Roofing", desc: "Standing-seam metal roofing in multiple colors, architectural shingles." },
              { title: "Colors", desc: "Curated exterior paint and stain palettes to harmonize with your environment." },
              { title: "Additional Upgrades", desc: "Covered porches, solar-ready wiring, off-grid kits, and high-efficiency HVAC." },
            ].map((opt, i) => (
              <div key={i} className="p-5 bg-white border border-[#E5E0D4] rounded-sm space-y-1.5 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="w-2 h-2 rounded-full bg-[#B82025] mb-2" />
                <h4 className="text-sm font-bold uppercase tracking-tight text-[#1D2521] font-display">{opt.title}</h4>
                <p className="text-xs text-[#6B716D] leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SITE PREPARATION SECTION */}
      <section id="site-prep" className="py-24 bg-white border-b border-[#E5E0D4] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                <span>Property Readiness</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                Site Preparation Guide
              </h2>
              <p className="text-sm sm:text-base text-[#6B716D] leading-relaxed font-body">
                Before your handcrafted cabin, modular home, or steel kit arrives for delivery, your property will need to be prepared. Site requirements ensure proper leveling, structural longevity, and utility hookups.
              </p>

              <div className="p-4 bg-[#F7F4EC] border-l-4 border-[#B82025] rounded-r-sm text-xs text-[#1D2521] font-medium leading-relaxed">
                <strong>Important Note:</strong> Exact site requirements depend on the customer&apos;s location, local soil conditions, and the specific building model selected. Our team is available to assist you with recommendations and coordinate with your local contractor.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  { label: "Foundation", detail: "Concrete slab, crawlspace stem wall, pier/runner system, or basement." },
                  { label: "Land Preparation", detail: "Clearing trees/brush, proper site grading, and compaction." },
                  { label: "Electrical Connection", detail: "Main service hookup, panel capacity, or off-grid solar prep." },
                  { label: "Water Supply", detail: "Municipal water connection or private water well coordination." },
                  { label: "Sewer & Septic", detail: "City sewer hookup or approved septic tank & drain field." },
                  { label: "Site Access", detail: "Adequate driveway width, turnarounds, and overhead wire clearance for transport." },
                  { label: "Permits & Approvals", detail: "County/city building permits and stamped architectural drawings." },
                  { label: "Local Zoning", detail: "Setbacks, height limits, and local jurisdiction zoning compliance." },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm space-y-1">
                    <div className="text-xs font-bold text-[#1D2521] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    <p className="text-[11px] text-[#6B716D] leading-normal pl-5">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#8F171C] text-white p-8 sm:p-10 rounded-sm space-y-6 shadow-xl">
                <h3 className="text-2xl font-black uppercase tracking-tight font-display text-white">
                  Need Help With Site Prep & Consultation?
                </h3>
                <p className="text-sm text-white/90 leading-relaxed font-body">
                  Contact our Scottsburg, Indiana team directly for personalized project consultation, foundation specifications, delivery logistics, and financing options.
                </p>

                <div className="space-y-3 pt-2 border-t border-white/20 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 uppercase font-bold w-20">Company:</span>
                    <span className="font-semibold text-white">ModularHome.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 uppercase font-bold w-20">Address:</span>
                    <span className="font-semibold text-white">677 S. Cardinal Lane, Scottsburg, IN 47170</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 uppercase font-bold w-20">Direct:</span>
                    <a href="tel:+18125954033" className="font-bold text-white hover:underline">+1-812-595-4033</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 uppercase font-bold w-20">Toll-Free:</span>
                    <a href="tel:+18125954033" className="font-semibold text-white hover:underline">+1-812-595-4033</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/60 uppercase font-bold w-20">Email:</span>
                    <a href="mailto:support@modularhome.com" className="font-semibold text-white hover:underline break-all">support@modularhome.com</a>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
                  >
                    Contact Support
                  </Link>
                  <Link
                    href="/quote"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors border border-white/30"
                  >
                    Request Pricing
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CRAFTSMANSHIP SHOWCASE BANNER */}
      <section id="craftsmanship" className="py-20 bg-[#F7F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
                Precision & Quality
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#1D2521] font-display">
                Handcrafted Durability Built for Generations
              </h3>
              <p className="text-xs sm:text-sm text-[#6B716D] leading-relaxed font-body">
                Whether you select a timber cabin, a factory-built modular home, or a heavy rigid-frame barndominium, every structure is constructed with uncompromised pride of workmanship and materials designed to withstand decades of weather.
              </p>
              <div className="pt-2">
                <Link
                  href="/quote"
                  className="px-6 py-3.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors inline-flex items-center gap-2 shadow-xs"
                >
                  <span>Build With ModularHome.com</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-sm overflow-hidden border border-[#E5E0D4] shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
                  alt="Quality Handcrafted Framework"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-sm overflow-hidden border border-[#E5E0D4] shadow-xs">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
                  alt="Interior Finished Cabin Space"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
