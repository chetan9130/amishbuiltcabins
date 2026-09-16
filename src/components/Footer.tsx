"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-white text-[#1D2521] border-t border-[#E5E0D4]">
      {/* Top 4-Column Section (White matching main Navbar header) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 border-b border-[#E5E0D4]">
          {/* Column 1: Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center group shrink-0">
              <div className="relative h-10 sm:h-12 w-auto flex items-center transition-transform group-hover:scale-105">
                <Image
                  src="/newlogo2.png"
                  alt="ModularHome.com"
                  width={160}
                  height={50}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs text-[#6B716D] leading-relaxed max-w-sm">
              Quality modular homes, prefabs, barndominiums, cabins, ADUs, and custom floor plans engineered for your land, your lifestyle, and your future.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://www.facebook.com/share/19NkXAfqGL/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-[#B82025] hover:bg-[#8F171C] text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/amishbuiltcabins_com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-[#B82025] hover:bg-[#8F171C] text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@amishbuiltcabins?si=pL-VgoAC8n0WfG5q"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-[#B82025] hover:bg-[#8F171C] text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@amishbuiltcabins"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-7 h-7 rounded-full bg-[#B82025] hover:bg-[#8F171C] text-white flex items-center justify-center transition-all hover:scale-105 shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.89-2.89c.28 0 .54.04.79.11V9.4a6.34 6.34 0 1 0 5.55 6.27V8.69a8.18 8.18 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B82025]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#6B716D]">
              <li><Link href="/" className="hover:text-[#B82025] transition-colors">Home</Link></li>
              <li><Link href="/buildings?category=Cabins" className="hover:text-[#B82025] transition-colors">Cabins</Link></li>
              <li><Link href="/buildings?category=Barndominiums" className="hover:text-[#B82025] transition-colors">Barndominiums</Link></li>
              <li><Link href="/upload-floor-plan" className="hover:text-[#B82025] transition-colors">Floor Plans</Link></li>
              <li><Link href="/videos" className="hover:text-[#B82025] transition-colors">Videos</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B82025]">
              Our Company
            </h4>
            <ul className="space-y-2 text-xs text-[#6B716D]">
              <li><Link href="/about" className="hover:text-[#B82025] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#B82025] transition-colors">Contact</Link></li>
              <li><Link href="/quote" className="hover:text-[#B82025] transition-colors">Get a Quote</Link></li>
              <li><Link href="/contact#faq" className="hover:text-[#B82025] transition-colors">FAQ</Link></li>
              <li><Link href="/contact#delivery" className="hover:text-[#B82025] transition-colors">Delivery Info</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#B82025]">
              Join Our Newsletter
            </h4>
            <p className="text-xs text-[#6B716D] leading-relaxed">
              Get the latest updates, new floor plans and special offers.
            </p>
            {subscribed ? (
              <div className="p-2.5 bg-[#F7F4EC] border border-[#E5E0D4] rounded-xs text-xs text-[#B82025] font-semibold">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full text-xs px-3 py-2 bg-[#F7F4EC] border border-[#E5E0D4] rounded-xs text-[#1D2521] placeholder:text-[#6B716D] focus:outline-none focus:border-[#B82025]"
                  required
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-xs shrink-0 transition-colors shadow-xs"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar (Brand Red matching Header Top Utility Bar #B82025) */}
      <div className="bg-[#B82025] text-white/90 border-t border-[#8F171C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} ModularHome.com. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
