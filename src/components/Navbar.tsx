"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
      {/* TOP RED ANNOUNCEMENT & CONTACT BAR (ABOVE NAVBAR) */}
      <div className="bg-[#b3141c] text-white text-[12px] sm:text-[13px] border-b border-[#9c1017]">
        <div className="wrap py-2 sm:py-2.5 flex flex-col md:flex-row items-center justify-between gap-2.5 sm:gap-4">
          {/* Left: Phone & Email Contacts */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 sm:gap-4 text-white">
            {/* Phone */}
            <a
              href="tel:+18125954033"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity group"
            >
              <span className="w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center text-[#b3141c] shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.053 15.053 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1.01A11.36 11.36 0 018.57 3.9c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.52c0-.55-.45-1-1-.99z" />
                </svg>
              </span>
              <span className="font-extrabold tracking-tight text-white text-[13px] sm:text-[13.5px]">
                +1-812-595-4033
              </span>
            </a>

            {/* Separator Dot */}
            <span className="text-white/40 text-[10px] hidden md:inline">●</span>

            {/* Email */}
            <a
              href="mailto:support@modularhome.com"
              className="inline-flex items-center gap-2 hover:opacity-90 transition-opacity group"
            >
              <span className="w-[26px] h-[26px] rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </span>
              <span className="font-medium text-white tracking-tight text-[12.5px] sm:text-[13px]">
                support@modularhome.com
              </span>
            </a>
          </div>

          {/* Right: FOLLOW US & Social Media Icons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-white mr-1 select-none">
              FOLLOW US:
            </span>

            {/* Facebook */}
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Facebook"
              className="w-[26px] h-[26px] rounded-full bg-white text-[#b3141c] flex items-center justify-center hover:scale-110 hover:bg-white/95 transition-all shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on Instagram"
              className="w-[26px] h-[26px] rounded-full bg-white text-[#b3141c] flex items-center justify-center hover:scale-110 hover:bg-white/95 transition-all shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on YouTube"
              className="w-[26px] h-[26px] rounded-full bg-white text-[#b3141c] flex items-center justify-center hover:scale-110 hover:bg-white/95 transition-all shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Follow us on TikTok"
              className="w-[26px] h-[26px] rounded-full bg-white text-[#b3141c] flex items-center justify-center hover:scale-110 hover:bg-white/95 transition-all shadow-xs"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.3 1.05.21 2.18-.08 2.96-.8.61-.53.97-1.3 1.01-2.11.05-3.87.02-7.74.03-11.61z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 3. STICKY MAIN HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e7e9ee]">
        <div className="wrap h-[80px] sm:h-[90px] flex items-center justify-between gap-3 sm:gap-6">
          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#101114] hover:text-[#e20b16] text-2xl font-bold cursor-pointer transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center group select-none shrink-0 py-1">
            <Image
              src="/newlogo2.png"
              alt="ModularHome.com"
              width={300}
              height={75}
              priority
              className="h-12 sm:h-14 lg:h-[60px] w-auto object-contain hover:opacity-95 transition-opacity"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 flex-1 text-[13.5px] font-bold text-[#101114]">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`hover:text-[#e20b16] transition-colors whitespace-nowrap py-1 relative group ${
                    active ? "text-[#e20b16]" : "text-[#101114]"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-[#e20b16] transition-all ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Block (Phone & Quote Button) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href="tel:+18125954033"
              className="hidden md:inline-flex items-center gap-1.5 font-extrabold text-[14px] text-[#101114] hover:text-[#e20b16] transition-colors"
            >
              <span>☎</span> +1-812-595-4033
            </a>

            <Link
              href="#quote"
              className="btn-primary py-2.5 sm:py-3.5 px-4 sm:px-6 text-xs sm:text-sm tracking-tight rounded-[11px] shadow-sm"
            >
              <span>Get a Quote</span>
              <span className="hidden sm:inline ml-1">→</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 4. MOBILE SLIDE-OVER DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#e7e9ee]">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                  <Image
                    src="/newlogo2.png"
                    alt="ModularHome.com"
                    width={220}
                    height={55}
                    className="h-11 sm:h-12 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#6b7280] hover:text-[#e20b16] rounded-md transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => {
                  const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3 text-sm font-bold rounded-xl transition-all ${
                        active
                          ? "bg-[#fff2f2] text-[#e20b16]"
                          : "text-[#101114] hover:bg-[#f6f7f9] hover:text-[#e20b16]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Resources */}
              <div className="p-4 bg-[#f6f7f9] border border-[#e7e9ee] rounded-xl space-y-2 text-xs">
                <div className="font-extrabold text-[#101114] uppercase tracking-wider">Help & Resources</div>
                <div className="grid grid-cols-2 gap-2 text-[#555d69] font-medium pt-1">
                  <Link href="#financing" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#e20b16]">Financing</Link>
                  <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#e20b16]">Guides & Blog</Link>
                  <Link href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#e20b16]">Reviews</Link>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#e20b16]">Contact Us</Link>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 space-y-3 border-t border-[#e7e9ee] mt-6">
              {/* Social icons */}
              <div className="flex items-center justify-center gap-3 py-1">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-[#f6f7f9] text-[#101114] hover:bg-[#e20b16] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-[#f6f7f9] text-[#101114] hover:bg-[#e20b16] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-[#f6f7f9] text-[#101114] hover:bg-[#e20b16] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="w-8 h-8 rounded-full bg-[#f6f7f9] text-[#101114] hover:bg-[#e20b16] hover:text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.3 1.05.21 2.18-.08 2.96-.8.61-.53.97-1.3 1.01-2.11.05-3.87.02-7.74.03-11.61z" />
                  </svg>
                </a>
              </div>

              <a
                href="tel:+18125954033"
                className="w-full py-3 bg-[#101114] hover:bg-[#222] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <span>☎ +1-812-595-4033</span>
              </a>

              <Link
                href="#quote"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#e20b16] hover:bg-[#c50812] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
