"use client";

import { useState, useRef } from "react";
import { 
  UploadCloud, 
  CheckCircle2, 
  X, 
  ArrowRight, 
  FileCheck2,
  Shield
} from "lucide-react";

export default function FloorPlanUploader() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    zip: "",
    approximateSqFt: "",
    description: "",
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="bg-white border border-[#E5E0D4] rounded-sm shadow-md p-6 sm:p-10 text-[#1D2521]">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Drag and Drop Zone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#B82025] mb-3">
              1. Floor Plan Document (PDF, PNG, JPG or CAD)
            </label>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer relative border-2 border-dashed rounded-sm p-8 sm:p-12 text-center transition-all duration-300 ${
                dragActive
                  ? "border-[#B82025] bg-[#F7F4EC]"
                  : file
                  ? "border-[#B82025] bg-[#F7F4EC]"
                  : "border-[#E5E0D4] bg-[#F7F4EC]/60 hover:border-[#B82025] hover:bg-white"
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.dwg,.dxf"
                onChange={handleChange}
                className="hidden"
              />

              {file ? (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#B82025]/10 text-[#B82025] flex items-center justify-center">
                    <FileCheck2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1D2521]">{file.name}</div>
                    <div className="text-xs text-[#6B716D] mt-0.5">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for engineering intake
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="text-xs text-[#B82025] hover:underline flex items-center gap-1 mt-1 font-bold"
                  >
                    <X className="w-3.5 h-3.5" /> Remove & replace file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-white border border-[#E5E0D4] flex items-center justify-center text-[#B82025] group-hover:scale-110 transition-transform shadow-xs">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-base font-bold uppercase tracking-wider text-[#1D2521]">
                      Choose File or Drag & Drop Here
                    </div>
                    <div className="text-xs text-[#6B716D] mt-1">
                      Drag files into this box or click to browse files
                    </div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-white text-[10px] font-mono uppercase tracking-wider text-[#1D2521] rounded-xs border border-[#E5E0D4] shadow-2xs">
                    PDF, JPG, PNG up to 50MB
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Project Details */}
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#B82025] mb-4">
              2. Contact & Site Details
            </div>

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
                  placeholder="e.g. David Vance"
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
                  Project Site ZIP Code *
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

            <div className="mt-4">
              <label className="block text-xs font-bold text-[#1D2521] mb-1">
                Approximate Target Square Footage
              </label>
              <input
                type="text"
                value={form.approximateSqFt}
                onChange={(e) => setForm({ ...form, approximateSqFt: e.target.value })}
                placeholder="e.g. 1,800 sq ft cabin + 600 sq ft porch"
                className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
              />
            </div>

            <div className="mt-4">
              <label className="block text-xs font-bold text-[#1D2521] mb-1">
                Project Notes & Specific Requirements
              </label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe your design intentions, e.g., ceiling height preference, clear-span requirements, porch wraps, or unique property slopes..."
                className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3.5 py-2.5 text-xs text-[#1D2521] focus:outline-none focus:border-[#B82025] rounded-sm"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#B82025] hover:bg-[#8F171C] text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Analyzing Floor Plan Geometry...</span>
              ) : (
                <>
                  <span>Submit Floor Plan For Engineering Review</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-[#6B716D]">
            <Shield className="w-3.5 h-3.5 text-[#B82025]" />
            <span>All uploads remain 100% proprietary and protected by client non-disclosure.</span>
          </div>
        </form>
      ) : (
        /* Submission Success */
        <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#B82025]/10 border border-[#B82025] text-[#B82025] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#B82025]">
              Floor Plan Intake Confirmed
            </div>
            <h3 className="text-3xl font-extrabold uppercase tracking-tight text-[#1D2521] mt-1 font-display">
              Ready For Engineering Analysis
            </h3>
            <p className="text-sm text-[#6B716D] mt-2 leading-relaxed max-w-lg mx-auto">
              Our engineering team has received your plan submission for <span className="text-[#1D2521] font-semibold">{form.name}</span>. A licensed project estimator will review your load lines and deliver a preliminary estimate within 24–48 hours.
            </p>
          </div>

          <div className="bg-[#F7F4EC] border border-[#E5E0D4] p-5 rounded-sm max-w-md mx-auto text-left text-xs space-y-2 text-[#6B716D]">
            <div className="flex justify-between">
              <span>File Attached:</span>
              <span className="text-[#1D2521] font-semibold">{file?.name || "Custom Architectural PDF"}</span>
            </div>
            <div className="flex justify-between">
              <span>Target Region:</span>
              <span className="text-[#1D2521] font-mono">ZIP {form.zip}</span>
            </div>
            <div className="flex justify-between">
              <span>Intake Ticket:</span>
              <span className="text-[#B82025] font-mono font-bold">PLN-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFile(null);
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  zip: "",
                  approximateSqFt: "",
                  description: "",
                });
              }}
              className="px-6 py-2.5 bg-white hover:bg-[#F7F4EC] border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider text-[#1D2521] rounded-sm transition-colors shadow-xs cursor-pointer"
            >
              Upload Another Floor Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
