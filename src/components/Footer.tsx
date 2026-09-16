"use client";

import { useState } from "react";
import Link from "next/link";

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
    <footer className="bg-white border-t border-[#e7e9ee] pt-12 sm:pt-14 pb-8">
      <div className="wrap">
        {/* 4 Columns: Brand (1.5fr), Quick Links (1fr), Home Types & Resources (1fr), Contact & Newsletter (1fr) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-8 sm:gap-10 pb-8 text-center md:text-left">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-1.5 justify-center md:justify-start">
              <span className="text-[#e20b16] text-2xl font-black">⌂</span>
              <span className="text-xl sm:text-2xl font-black tracking-[-1px] text-[#101114]">
                MODULAR<b className="text-[#e20b16]">HOME</b>.COM
              </span>
            </Link>

            <p className="text-sm text-[#69707d] leading-relaxed max-w-sm mx-auto md:mx-0">
              Modern Homes. A Smarter Way to Build.
              <br />
              Premium modular housing, floor plans and nationwide support.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 justify-center md:justify-start pt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#e20b16] text-white flex items-center justify-center font-black text-sm hover:bg-[#c50812] transition-all hover:scale-110 shadow-sm"
              >
                f
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#e20b16] text-white flex items-center justify-center font-black text-sm hover:bg-[#c50812] transition-all hover:scale-110 shadow-sm"
              >
                ◎
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-[#e20b16] text-white flex items-center justify-center font-black text-sm hover:bg-[#c50812] transition-all hover:scale-110 shadow-sm"
              >
                ▶
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-10 h-10 rounded-full bg-[#e20b16] text-white flex items-center justify-center font-black text-sm hover:bg-[#c50812] transition-all hover:scale-110 shadow-sm"
              >
                p
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-[#e20b16] text-white flex items-center justify-center font-black text-sm hover:bg-[#c50812] transition-all hover:scale-110 shadow-sm"
              >
                in
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-black text-[#101114] mt-0 mb-3">
              Quick Links
            </h4>
            <div className="space-y-2 text-sm text-[#555d69] font-medium">
              <div><Link href="/" className="hover:text-[#e20b16] transition-colors">Home</Link></div>
              <div><Link href="/buildings" className="hover:text-[#e20b16] transition-colors">Homes</Link></div>
              <div><Link href="/upload-floor-plan" className="hover:text-[#e20b16] transition-colors">Floor Plans</Link></div>
              <div><Link href="/videos" className="hover:text-[#e20b16] transition-colors">Gallery</Link></div>
              <div><Link href="/about" className="hover:text-[#e20b16] transition-colors">About Us</Link></div>
              <div><Link href="/contact" className="hover:text-[#e20b16] transition-colors">Contact</Link></div>
            </div>
          </div>

          {/* Column 3: Home Types & Resources */}
          <div>
            <h4 className="text-base font-black text-[#101114] mt-0 mb-3">
              Home Types & Resources
            </h4>
            <div className="space-y-2 text-sm text-[#555d69] font-medium">
              <div><Link href="/buildings?category=Modular+Homes" className="hover:text-[#e20b16] transition-colors">Modular Homes</Link></div>
              <div><Link href="/buildings?category=Prefab+Homes" className="hover:text-[#e20b16] transition-colors">Prefab Homes</Link></div>
              <div><Link href="/buildings?category=Barndominiums" className="hover:text-[#e20b16] transition-colors">Barndominiums</Link></div>
              <div><Link href="/buildings?category=Tiny+Homes" className="hover:text-[#e20b16] transition-colors">Tiny Homes</Link></div>
              <div><Link href="/buildings?category=ADUs+%26+Granny+Pods" className="hover:text-[#e20b16] transition-colors">ADUs</Link></div>
              <div><Link href="/resources" className="hover:text-[#e20b16] transition-colors">Buying Guide</Link></div>
              <div><Link href="#financing" className="hover:text-[#e20b16] transition-colors">Financing</Link></div>
            </div>
          </div>

          {/* Column 4: Contact Us & Newsletter */}
          <div>
            <h4 className="text-base font-black text-[#101114] mt-0 mb-3">
              Contact Us
            </h4>
            <div className="space-y-2 text-sm text-[#555d69] font-medium">
              <div><a href="tel:+18005551234" className="hover:text-[#e20b16]">☎ (800) 555-1234</a></div>
              <div><a href="mailto:info@modularhome.com" className="hover:text-[#e20b16]">✉ info@modularhome.com</a></div>
              <div><span>Nationwide USA</span></div>
            </div>

            <h4 className="text-base font-black text-[#101114] mt-5 mb-2">
              Stay Updated
            </h4>
            {subscribed ? (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-[9px]">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm mx-auto md:mx-0">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="min-w-0 flex-1 p-2.5 border border-[#dfe2e7] rounded-[9px] text-xs text-[#101114] focus:outline-none focus:border-[#e20b16]"
                />
                <button
                  type="submit"
                  className="btn-primary py-2.5 px-3.5 text-xs font-extrabold rounded-[9px]"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="border-t border-[#e7e9ee] pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6b7280]">
          <div>© 2026 ModularHome.com. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-[#e20b16]">Privacy Policy</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-[#e20b16]">Terms of Service</Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-[#e20b16]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
