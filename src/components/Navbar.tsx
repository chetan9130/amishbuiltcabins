"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Phone, 
  Mail,
  ArrowRight,
  ChevronRight,
  Sparkles,
  MapPin
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Cabins", href: "/buildings?category=Cabins" },
    { label: "Barndominiums", href: "/buildings?category=Barndominiums" },
    { label: "Floor Plans", href: "/upload-floor-plan" },
    { label: "Videos", href: "/videos" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* 1. TOP UTILITY BAR (Brand Red #B82025 matching Hero Section) */}
        <div className="bg-[#B82025] text-white py-2.5 px-4 sm:px-6 lg:px-8 border-b border-[#8F171C] shadow-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Left: Contact Info (Phone Number Bigger + Email ID) */}
            <div className="flex items-center gap-4 sm:gap-7">
              {/* Phone Link - Significantly Bigger */}
              <a
                href="tel:+18125954033"
                className="flex items-center gap-2.5 group transition-transform hover:scale-[1.02]"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#B82025] flex items-center justify-center shadow-sm group-hover:bg-[#F7F4EC] transition-all">
                  <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-white text-sm sm:text-base md:text-lg tracking-tight font-display drop-shadow-2xs">
                    +1-812-595-4033
                  </span>
                  <span className="text-white/80 text-[11px] hidden xl:inline font-medium">
                    (Mon–Fri 7am–6pm)
                  </span>
                </div>
              </a>

              <span className="text-white/40 hidden sm:inline">•</span>

              {/* Email Link */}
              <a
                href="mailto:support@modularhome.com"
                className="flex items-center gap-2 text-white/95 hover:text-white transition-colors text-xs sm:text-sm font-semibold group"
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 group-hover:bg-white text-white group-hover:text-[#B82025] flex items-center justify-center transition-all shadow-2xs">
                  <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <span className="hidden md:inline tracking-tight">support@modularhome.com</span>
              </a>
            </div>

            {/* Right: Social Media Icons (Much Bigger) */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 hidden lg:inline mr-1">
                Follow Us:
              </span>
              <div className="flex items-center gap-2 sm:gap-2.5">
                <a
                  href="https://www.facebook.com/share/19NkXAfqGL/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#B82025] hover:bg-[#8F171C] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/amishbuiltcabins_com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#B82025] hover:bg-[#8F171C] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com/@amishbuiltcabins?si=pL-VgoAC8n0WfG5q"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#B82025] hover:bg-[#8F171C] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@amishbuiltcabins"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#B82025] hover:bg-[#8F171C] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-xs"
                >
                  <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.89c.28 0 .54.04.79.11V9.4a6.34 6.34 0 1 0 5.55 6.27V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION BAR (Crisp White / Glassmorphic Sticky Header) */}
        <div
          className={`bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-[#E5E0D4] ${
            isScrolled ? "py-2.5 shadow-md" : "py-3 sm:py-4"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Left: Brand Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <div className="relative h-11 sm:h-14 w-auto flex items-center transition-transform group-hover:scale-105">
                <Image
                  src="/newlogo2.png"
                  alt="ModularHome.com"
                  width={180}
                  height={56}
                  className="h-10 sm:h-13 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-xs group ${
                      isActive
                        ? "text-[#B82025] bg-[#F7F4EC]"
                        : "text-[#1D2521] hover:text-[#B82025] hover:bg-[#F7F4EC]/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#B82025] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Block (Call Badge + Red CTA) */}
            <div className="hidden md:flex items-center space-x-3.5">
              {/* Phone Badge */}
              <a
                href="tel:+18125954033"
                className="hidden xl:flex items-center gap-2.5 px-3 py-1.5 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm hover:border-[#B82025] transition-all group"
              >
                <div className="p-1.5 bg-[#B82025] text-white rounded-2xs group-hover:bg-[#8F171C] transition-colors">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] uppercase font-bold text-[#6B716D] leading-none">Questions? Call Us</span>
                  <span className="text-xs font-black text-[#1D2521] font-display mt-0.5 group-hover:text-[#B82025] transition-colors">
                    +1-812-595-4033
                  </span>
                </div>
              </a>

              {/* Get a Quote Button */}
              <Link
                href="/quote"
                className="px-5 py-2.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-extrabold uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 group"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Actions: Phone Button + Hamburger */}
            <div className="flex lg:hidden items-center gap-2.5">
              <a
                href="tel:+18125954033"
                aria-label="Call +1-812-595-4033"
                className="p-2 rounded-sm bg-[#B82025] text-white hover:bg-[#8F171C] transition-colors flex items-center justify-center shadow-2xs"
              >
                <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#1D2521] hover:bg-[#F7F4EC] rounded-sm border border-[#E5E0D4] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#B82025]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Slide-over Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Dark Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E0D4]">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                  <Image
                    src="/newlogo2.png"
                    alt="ModularHome.com"
                    width={140}
                    height={44}
                    className="h-9 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#6B716D] hover:text-[#B82025] rounded-sm hover:bg-[#F7F4EC] transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="space-y-1.5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`flex items-center justify-between p-3 text-sm font-bold uppercase tracking-wider rounded-sm transition-all ${
                        isActive
                          ? "bg-[#B82025] text-white shadow-xs"
                          : "text-[#1D2521] hover:bg-[#F7F4EC] hover:text-[#B82025]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? "text-white" : "text-[#6B716D]"}`} />
                    </Link>
                  );
                })}
              </nav>

              {/* Support Callout Box */}
              <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#1D2521] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#B82025]" />
                  <span>Custom Modular Estimates</span>
                </div>
                <p className="text-xs text-[#6B716D] leading-relaxed">
                  Have questions or custom floor plans? Call our engineering specialists directly or request a free quote.
                </p>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 space-y-3 border-t border-[#E5E0D4] mt-6">
              <a
                href="tel:+18125954033"
                className="w-full py-3.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>Call +1-812-595-4033</span>
              </a>

              <Link
                href="/quote"
                className="w-full py-3.5 bg-[#8F171C] hover:bg-[#721215] text-white text-xs font-extrabold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Get a Quote Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Email in mobile drawer */}
              <div className="text-center pt-2">
                <a href="mailto:support@modularhome.com" className="text-xs text-[#6B716D] hover:text-[#B82025] transition-colors font-medium">
                  support@modularhome.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
