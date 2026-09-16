"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FloorPlanUploadCard() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setUploaded(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploaded(false);
    }
  };

  const handleUpload = () => {
    if (file) {
      setUploaded(true);
    }
  };

  return (
    <div className="bg-white border border-[var(--line)] rounded-[20px] p-6 sm:p-8 flex flex-col justify-between shadow-md">
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[var(--ink)] font-display">
          HAVE A FLOOR PLAN?
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-body">
          Upload your floor plan and let our engineering team provide a detailed custom quote.
        </p>

        {/* Upload Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`mt-6 border-2 border-dashed rounded-[18px] p-8 sm:p-10 text-center transition-colors ${
            isDragging
              ? "border-[var(--r)] bg-red-50/50"
              : "border-[var(--line)] hover:border-[var(--r)] bg-[var(--soft)]"
          }`}
        >
          {uploaded ? (
            <div className="space-y-3">
              <CheckCircle2 className="w-10 h-10 text-[var(--r)] mx-auto" />
              <div className="text-sm font-bold text-[var(--ink)]">
                Floor Plan Received!
              </div>
              <p className="text-xs text-[var(--muted)]">
                Our structural engineering team will review your plans and contact you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setFile(null);
                  setUploaded(false);
                }}
                className="text-xs font-bold text-[var(--r)] hover:underline uppercase tracking-wider mt-2 cursor-pointer"
              >
                Upload another file
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-13 h-13 rounded-full bg-white border border-[var(--line)] flex items-center justify-center text-[var(--r)] shadow-xs">
                <UploadCloud className="w-6 h-6" />
              </div>

              <div>
                <p className="text-sm font-bold text-[var(--ink)]">
                  {file ? file.name : "Choose File or Drag & Drop Here"}
                </p>
                <p className="text-xs text-[var(--muted)] mt-1">
                  PDF, JPG or PNG (Up to 25MB)
                </p>
              </div>

              <input
                id="plan-file-input"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <label
                  htmlFor="plan-file-input"
                  className="px-5 py-2.5 bg-white border border-[var(--line)] hover:border-[var(--r)] text-[var(--ink)] text-xs font-bold uppercase tracking-wider rounded-[12px] cursor-pointer transition-colors shadow-xs"
                >
                  Browse Files
                </label>

                {file && (
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="px-6 py-2.5 bg-[var(--r)] hover:bg-[var(--r-dark)] text-white text-xs font-bold uppercase tracking-wider rounded-[12px] transition-all shadow-sm cursor-pointer"
                  >
                    Upload Plan
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs text-[var(--muted)]">
        <span>Need full custom blueprints?</span>
        <Link
          href="/upload-floor-plan"
          className="font-bold text-[var(--r)] hover:text-[var(--r-dark)] uppercase tracking-wider inline-flex items-center gap-1"
        >
          <span>Advanced Uploader</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
