import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  ctaText?: string;
  ctaHref?: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  ctaText,
  ctaHref,
  className = "",
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${
        align === "center" ? "text-center max-w-3xl mx-auto" : "flex flex-col md:flex-row md:items-end justify-between gap-6"
      } ${className}`}
    >
      <div className={align === "center" ? "" : "max-w-2xl"}>
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[var(--r)] mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--r)]"></span>
            <span>{eyebrow}</span>
          </div>
        )}
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-[1.08] font-display ${
          light ? "text-white" : "text-[var(--ink)]"
        }`}>
          {title}
        </h2>
        {subtitle && (
          <p className={`mt-3 text-sm sm:text-base leading-relaxed font-body ${
            light ? "text-white/80" : "text-[var(--muted)]"
          }`}>
            {subtitle}
          </p>
        )}
      </div>

      {ctaText && ctaHref && (
        <div className={align === "center" ? "mt-6" : "shrink-0"}>
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors group ${
              light ? "text-white hover:text-[var(--r)]" : "text-[var(--ink)] hover:text-[var(--r)]"
            }`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-[var(--r)] transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}
