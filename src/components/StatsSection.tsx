"use client";

import { useEffect, useRef, useState } from "react";
import { Shield, Award, Building, HardHat } from "lucide-react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
}

const STATS: StatItem[] = [
  {
    value: 15,
    suffix: "+",
    label: "Years Experience",
    sublabel: "Specialized in cabin, tiny home & modular housing engineering",
    icon: Award,
  },
  {
    value: 500,
    suffix: "+",
    label: "Engineered Builds",
    sublabel: "Completed residential, agricultural & commercial modular structures",
    icon: Building,
  },
  {
    value: 50,
    suffix: "+",
    label: "Architectural Plans",
    sublabel: "Pre-stamped architectural floor plans & custom configurations",
    icon: HardHat,
  },
  {
    value: 100,
    suffix: "%",
    label: "Structural Commitment",
    sublabel: "Precision factory engineering with 40 to 50 year structural guarantees",
    icon: Shield,
  },
];

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-[#f6f7f9] border-y border-[#e7e9ee] relative overflow-hidden">
      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="card p-6 flex flex-col justify-between group hover:-translate-y-1 transition-all bg-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#e7e9ee]">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#e20b16]">
                  0{idx + 1}
                </span>
                <stat.icon className="w-5 h-5 text-[#6b7280] group-hover:text-[#e20b16] transition-colors" />
              </div>

              <div className="py-5">
                <div className="text-4xl sm:text-5xl font-black text-[#101114] tracking-tight flex items-baseline">
                  <span>{isVisible ? stat.value : 0}</span>
                  <span className="text-[#e20b16] ml-0.5">{stat.suffix}</span>
                </div>
                <div className="text-sm sm:text-base font-black text-[#101114] mt-2">
                  {stat.label}
                </div>
              </div>

              <p className="text-xs text-[#6b7280] leading-relaxed m-0 font-medium">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
