"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    interest: "Cabins",
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

  if (isSubmitted) {
    return (
      <div className="bg-white border border-[#E5E0D4] rounded-sm p-8 sm:p-10 text-center space-y-4 animate-in zoom-in-95 duration-200 shadow-md">
        <div className="w-14 h-14 rounded-full bg-[#B82025]/10 border border-[#B82025] text-[#B82025] flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-2xl font-black uppercase text-[#1D2521] font-display">
          Message Dispatched
        </h3>
        <p className="text-xs sm:text-sm text-[#6B716D] max-w-md mx-auto leading-relaxed">
          Thank you, <span className="text-[#1D2521] font-semibold">{form.name}</span>. A dedicated building specialist has received your inquiry and will follow up within 1 business day.
        </p>
        <div className="pt-2">
          <button
            onClick={() => {
              setIsSubmitted(false);
              setForm({
                name: "",
                email: "",
                phone: "",
                zip: "",
                interest: "Cabins",
                message: "",
              });
            }}
            className="px-5 py-2.5 bg-[#F7F4EC] hover:bg-[#B82025] hover:text-white border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider text-[#1D2521] rounded-sm transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E5E0D4] rounded-sm p-6 sm:p-10 space-y-5 shadow-md text-[#1D2521]">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025]">
        Direct Engineering Consultation
      </div>
      <h3 className="text-xl sm:text-2xl font-black uppercase text-[#1D2521] font-display">
        Send Us Your Project Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#1D2521] mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1D2521] mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="support@modularhome.com"
            className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1D2521] mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+1-812-595-4033"
            className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1D2521] mb-1">
            Build Site ZIP Code *
          </label>
          <input
            type="text"
            required
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
            placeholder="e.g. 78701"
            className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#1D2521] mb-1">
          Primary Building Interest
        </label>
        <select
          value={form.interest}
          onChange={(e) => setForm({ ...form, interest: e.target.value })}
          className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm cursor-pointer"
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
        <label className="block text-xs font-bold text-[#1D2521] mb-1">
          Project Notes or Questions *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Describe your site location, desired square footage, timeline, and questions for our engineers..."
          className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Transmitting Request...</span>
          ) : (
            <>
              <span>Send Consultation Request</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-[#6B716D] pt-1">
        <Shield className="w-3.5 h-3.5 text-[#B82025]" />
        <span>Your contact details are strictly confidential and will never be shared.</span>
      </div>
    </form>
  );
}
