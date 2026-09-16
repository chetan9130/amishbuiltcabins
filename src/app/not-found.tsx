import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-32 text-center">
      <div className="max-w-md mx-auto space-y-6 flex flex-col items-center">
        <Link href="/" className="inline-block transition-transform hover:scale-105 mb-2">
          <Image
            src="/newlogo2.png"
            alt="ModularHome.com"
            width={180}
            height={56}
            className="h-12 w-auto object-contain mx-auto"
          />
        </Link>

        <div className="w-16 h-16 rounded-full bg-[#F7F4EC] border border-[#B82025]/40 text-[#B82025] shadow-xs flex items-center justify-center mx-auto">
          <Building2 className="w-8 h-8" />
        </div>

        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#B82025]">
            404 Error • Structure Not Found
          </div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#1D2521] mt-2 font-display">
            Off The Blueprint
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#6B716D] leading-relaxed">
            The architectural cabin, model, or page you are looking for does not exist or has been relocated to another building series.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/models"
            className="w-full sm:w-auto px-6 py-3 bg-[#F7F4EC] hover:bg-[#B82025] hover:text-white text-[#1D2521] border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Explore Floor Plans</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

