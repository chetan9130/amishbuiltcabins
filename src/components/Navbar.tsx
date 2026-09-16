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
      {/* 1. TOP UTILITY BAR (Desktop) */}
      <div className="hidden md:block bg-[#f5f6f7] border-b border-[#e7e9ee] text-[12px] text-[#555d69]">
        <div className="wrap h-[34px] flex items-center justify-between">
          <div className="flex items-center gap-3 font-medium">
            <span className="flex items-center gap-1.5 hover:text-[#e20b16] cursor-pointer transition-colors">
              <span className="text-[#e20b16] text-[8px]">●</span> Facebook
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#e20b16] cursor-pointer transition-colors">
              <span className="text-[#e20b16] text-[8px]">●</span> Instagram
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#e20b16] cursor-pointer transition-colors">
              <span className="text-[#e20b16] text-[8px]">●</span> YouTube
            </span>
            <span className="text-[#d0d4dc] mx-1">|</span>
            <b className="font-bold text-[#101114]">Trusted by 1,000,000+ Followers</b>
          </div>
          <div className="flex items-center gap-3 font-medium">
            <a href="tel:+18125954033" className="hover:text-[#e20b16] transition-colors font-bold text-[#101114]">
              ☎ +1-812-595-4033
            </a>
            <span className="text-[#d0d4dc]">|</span>
            <Link href="#financing" className="hover:text-[#e20b16] transition-colors">Financing</Link>
            <span className="text-[#d0d4dc]">|</span>
            <Link href="/resources" className="hover:text-[#e20b16] transition-colors">Blog</Link>
            <span className="text-[#d0d4dc]">|</span>
            <Link href="#testimonials" className="hover:text-[#e20b16] transition-colors">Customer Reviews</Link>
            <span className="text-[#d0d4dc]">|</span>
            <Link href="/contact" className="hover:text-[#e20b16] transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* 2. MOBILE CONTACT TOP BAR (Mobile Only) */}
      <div className="md:hidden bg-[#101114] text-white h-[44px] px-4 flex items-center justify-between text-xs font-bold">
        <a href="tel:+18125954033" className="flex items-center gap-1.5 text-white font-extrabold hover:text-[#e20b16] transition-colors">
          <span>☎</span> +1-812-595-4033
        </a>
        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-[#e20b16] text-white flex items-center justify-center text-[11px] font-black"
          >
            f
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-[#e20b16] text-white flex items-center justify-center text-[11px] font-black"
          >
            ◎
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noreferrer"
            className="w-7 h-7 rounded-full bg-[#e20b16] text-white flex items-center justify-center text-[11px] font-black"
          >
            ▶
          </a>
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
            <div className="pt-6 space-y-3 border-t border-[#e7e9ee] mt-6">
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
