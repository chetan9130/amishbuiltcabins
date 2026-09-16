"use client";

import { Compass, CheckSquare, Sliders, FileText, Truck, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const STEPS = [
  {
    num: "01",
    title: "Explore",
    desc: "Browse available modular homes, prefabs, cabins, barndominiums, and housing kits online.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Choose",
    desc: "Select a structural design that perfectly matches your land, family size, and target budget.",
    icon: CheckSquare,
  },
  {
    num: "03",
    title: "Customize",
    desc: "Modify floor plan dimensions, kitchen layouts, finishes, windows, siding, and porch options.",
    icon: Sliders,
  },
  {
    num: "04",
    title: "Request a Quote",
    desc: "Submit your project requirements and receive transparent, itemized engineering pricing.",
    icon: FileText,
  },
  {
    num: "05",
    title: "Build & Deliver",
    desc: "Your home is factory-manufactured, transported, and installed on your engineered foundation.",
    icon: Truck,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[var(--soft)] border-b border-[var(--line)] text-[var(--ink)]">
      <div className="wrap">
        <SectionHeading
          eyebrow="Step-By-Step Journey"
          title="HOW THE BUILDING PROCESS WORKS"
          subtitle="From initial discovery to final set day, our structured 5-step process ensures complete transparency, precision manufacturing, and seamless site delivery."
          align="center"
        />

        {/* Desktop Horizontal Connected Timeline (Hidden on Mobile) */}
        <div className="hidden lg:block mt-16 relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-[var(--line)] -translate-y-6 z-0" />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white border border-[var(--line)] rounded-[18px] p-5 space-y-3 flex flex-col justify-between hover:border-[var(--r)] hover:shadow-lg transition-all group duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black font-display text-[var(--r)]">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[var(--soft)] group-hover:bg-[var(--r)] group-hover:text-white text-[var(--r)] flex items-center justify-center transition-colors border border-[var(--line)]">
                      <IconComp className="w-4.5 h-4.5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-extrabold uppercase text-[var(--ink)] font-display group-hover:text-[var(--r)] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[11px] text-[var(--muted)] mt-1.5 leading-relaxed font-body">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Timeline */}
        <div className="lg:hidden mt-12 space-y-4">
          {STEPS.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white border border-[var(--line)] rounded-[18px] p-5 flex items-start gap-4 shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--r)] text-white flex items-center justify-center shrink-0 font-bold font-display text-sm shadow-xs">
                  {step.num}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold uppercase text-[var(--ink)] font-display">
                      {step.title}
                    </h3>
                    <IconComp className="w-4 h-4 text-[var(--r)]" />
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed font-body">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <a
            href="/quote"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--r)] hover:bg-[var(--r-dark)] text-white text-xs font-bold uppercase tracking-wider rounded-[14px] transition-all shadow-md"
          >
            <span>Start Step 01: Get Your Instant Quote</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
