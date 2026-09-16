"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Shield, Send } from "lucide-react";
import { BUILDING_MODELS } from "@/data/models";

export default function CTASection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    homeType: "Modular Homes",
    bedrooms: "3 Beds",
    bathrooms: "2 Baths",
    budget: "$150,000 - $250,000",
    interestedModel: "The Blue Ridge",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="request-quote" className="py-16 sm:py-24 bg-[#8F171C] text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-architectural-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side Copy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white bg-white/20 px-3 py-1 rounded-xs border border-white/20 inline-block shadow-xs">
              GET STARTED TODAY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.08] font-display">
              Request a Project Quote
            </h2>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-body">
              Submit your requirements below to receive customized pricing, specs, and timeline estimates for your modular or prefab build.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white text-[#B82025] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Transparent Pricing Sheet</h4>
                  <p className="text-xs text-white/80">Detailed breakdown of manufacturing, delivery, and option costs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white text-[#B82025] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dedicated Specialist Support</h4>
                  <p className="text-xs text-white/80">1-on-1 consultation regarding land suitability, foundations & permits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form Card */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="bg-white text-[#1D2521] border border-[#E5E0D4] rounded-xs p-8 sm:p-12 text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-[#B82025]/10 text-[#B82025] flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#B82025] font-display">
                  Quote Request Submitted!
                </h3>
                <p className="text-xs sm:text-sm text-[#6B716D] max-w-lg mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-[#1D2521]">{form.name}</span>. We have received your request for <span className="font-bold text-[#1D2521]">{form.homeType} ({form.interestedModel})</span>. A modular specialist will review your project details and contact you within 1 business day.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        location: "",
                        homeType: "Modular Homes",
                        bedrooms: "3 Beds",
                        bathrooms: "2 Baths",
                        budget: "$150,000 - $250,000",
                        interestedModel: "The Blue Ridge",
                        message: "",
                      });
                    }}
                    className="px-6 py-3 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-sm"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white text-[#1D2521] border border-[#E5E0D4] rounded-xs p-6 sm:p-8 space-y-4 shadow-2xl">
                <h3 className="text-xl font-bold uppercase text-[#1D2521] font-display pb-2 border-b border-[#E5E0D4]">
                  Project Requirements Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#1D2521] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D2521] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="support@modularhome.com"
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D2521] mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1-812-595-4033"
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D2521] mb-1">Location (State / ZIP) *</label>
                    <input
                      type="text"
                      required
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Austin, TX 78701"
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D2521] mb-1">Preferred Home Type</label>
                    <select
                      value={form.homeType}
                      onChange={(e) => setForm({ ...form, homeType: e.target.value })}
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs cursor-pointer"
                    >
                      <option value="Modular Homes">Modular Homes</option>
                      <option value="Prefab Homes">Prefab Homes</option>
                      <option value="Barndominiums">Barndominiums</option>
                      <option value="House Kits">House Kits</option>
                      <option value="Tiny Homes">Tiny Homes</option>
                      <option value="Cabins">Cabins</option>
                      <option value="ADUs & Granny Pods">ADUs & Granny Pods</option>
                      <option value="A-Frame Homes">A-Frame Homes</option>
                      <option value="Commercial Buildings">Commercial Buildings</option>
                      <option value="Custom Homes">Custom Homes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D2521] mb-1">Interested Model</label>
                    <select
                      value={form.interestedModel}
                      onChange={(e) => setForm({ ...form, interestedModel: e.target.value })}
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs cursor-pointer"
                    >
                      <option value="Not Sure / Custom">Not Sure / Undecided</option>
                      {BUILDING_MODELS.map((m) => (
                        <option key={m.id} value={m.name}>{m.name} ({m.category})</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D2521] mb-1">Bedrooms</label>
                    <select
                      value={form.bedrooms}
                      onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs cursor-pointer"
                    >
                      <option value="1 Bed">1 Bedroom</option>
                      <option value="2 Beds">2 Bedrooms</option>
                      <option value="3 Beds">3 Bedrooms</option>
                      <option value="4+ Beds">4+ Bedrooms</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1D2521] mb-1">Bathrooms</label>
                    <select
                      value={form.bathrooms}
                      onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                      className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs cursor-pointer"
                    >
                      <option value="1 Bath">1 Bathroom</option>
                      <option value="2 Baths">2 Bathrooms</option>
                      <option value="3+ Baths">3+ Bathrooms</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D2521] mb-1">Approximate Budget Range</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs cursor-pointer"
                  >
                    <option value="Under $75,000">Under $75,000</option>
                    <option value="$75,000 - $150,000">$75,000 - $150,000</option>
                    <option value="$150,000 - $250,000">$150,000 - $250,000</option>
                    <option value="$250,000 - $400,000">$250,000 - $400,000</option>
                    <option value="$400,000+">$400,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1D2521] mb-1">Project Details / Message</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your land, site status, target timeline, or special customization requests..."
                    className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-xs"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Processing Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B716D] pt-1">
                  <Shield className="w-3.5 h-3.5 text-[#B82025]" />
                  <span>No obligation. We respect your privacy.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

