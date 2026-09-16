"use client";

import { useState } from "react";
import Link from "next/link";
import { DollarSign, Calculator, Phone, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { formatPrice } from "@/utils/currency";

export default function FinancingSection() {
  const [homeCost, setHomeCost] = useState<number>(150000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // Monthly payment formula calculation
  const downPaymentAmount = (homeCost * downPaymentPct) / 100;
  const principal = homeCost - downPaymentAmount;
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  const monthlyPayment = principal > 0 && monthlyRate > 0
    ? Math.round(
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1)
      )
    : 0;

  return (
    <section id="financing" className="py-20 bg-[#F7F4EC] border-b border-[#E5E0D4] text-[#1D2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Flexible Payment Options"
          title="MAKE YOUR DREAM HOME MORE AFFORDABLE"
          subtitle="Modular homes are real property installed on permanent foundations. Explore construction loans, standard residential mortgages, and land-and-home financing packages."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Monthly Payment Calculator (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#E5E0D4] rounded-sm p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex items-center gap-3 pb-4 border-b border-[#E5E0D4]">
              <div className="p-2.5 rounded-sm bg-[#B82025] text-white shadow-xs">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase text-[#1D2521] font-display">
                  Monthly Payment Calculator
                </h3>
                <p className="text-xs text-[#6B716D]">
                  Adjust home cost, down payment, interest rate, and term length.
                </p>
              </div>
            </div>

            {/* Range Controls */}
            <div className="space-y-5">
              {/* Home Cost */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1D2521] mb-1">
                  <span>Estimated Home Cost:</span>
                  <span className="text-[#B82025] font-black">{formatPrice(homeCost)}</span>
                </div>
                <input
                  type="range"
                  min={40000}
                  max={400000}
                  step={5000}
                  value={homeCost}
                  onChange={(e) => setHomeCost(Number(e.target.value))}
                  className="w-full accent-[#B82025] cursor-pointer"
                />
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between text-xs font-bold text-[#1D2521] mb-1">
                  <span>Down Payment ({downPaymentPct}%):</span>
                  <span className="text-[#1D2521] font-bold">{formatPrice(downPaymentAmount)}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={35}
                  step={5}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-[#B82025] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Interest Rate */}
                <div>
                  <label className="block text-xs font-bold text-[#1D2521] mb-1">
                    Interest Rate (%)
                  </label>
                  <select
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs font-semibold text-[#1D2521] rounded-sm cursor-pointer"
                  >
                    <option value={5.5}>5.50% APR</option>
                    <option value={6.0}>6.00% APR</option>
                    <option value={6.5}>6.50% APR</option>
                    <option value={7.0}>7.00% APR</option>
                    <option value={7.5}>7.50% APR</option>
                  </select>
                </div>

                {/* Term Years */}
                <div>
                  <label className="block text-xs font-bold text-[#1D2521] mb-1">
                    Loan Term
                  </label>
                  <select
                    value={loanTermYears}
                    onChange={(e) => setLoanTermYears(Number(e.target.value))}
                    className="w-full bg-[#F7F4EC] border border-[#E5E0D4] px-3 py-2 text-xs font-semibold text-[#1D2521] rounded-sm cursor-pointer"
                  >
                    <option value={15}>15 Years</option>
                    <option value={30}>30 Years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Calculated Result Box */}
            <div className="p-6 bg-[#8F171C] text-white rounded-sm text-center space-y-2 shadow-inner">
              <div className="text-xs uppercase font-bold text-white/80 tracking-wider">
                Estimated Principal & Interest Payment
              </div>
              <div className="text-4xl sm:text-5xl font-black font-display text-white">
                ${monthlyPayment} <span className="text-xs text-white/70 font-normal">/ month</span>
              </div>
              <div className="text-[11px] text-white/70 pt-1">
                Loan Amount: {formatPrice(principal)} over {loanTermYears} years
              </div>
            </div>

            {/* Legal Disclaimer */}
            <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm text-[11px] text-[#6B716D] leading-relaxed flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-[#B82025] shrink-0 mt-0.5" />
              <span>
                Calculated monthly payments are estimates for informational purposes only and do not include property taxes, homeowner insurance, or site utility fees. Final loan approval and interest rates depend on lender underwriting, applicant creditworthiness, and regional loan programs.
              </span>
            </div>
          </div>

          {/* Right Column: Financing Options & Specialist CTA (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E5E0D4] rounded-sm p-6 sm:p-8 space-y-6 shadow-md">
              <h3 className="text-xl font-bold uppercase text-[#1D2521] font-display">
                Financing Programs Available
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 bg-[#F7F4EC] rounded-sm border border-[#E5E0D4] space-y-1">
                  <div className="font-bold text-[#1D2521] uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B82025]" />
                    Single-Close Construction Loans
                  </div>
                  <p className="text-[#6B716D] leading-relaxed">
                    Combines land purchase, site preparation, factory manufacturing, and permanent mortgage into one loan with a single closing transaction.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F4EC] rounded-sm border border-[#E5E0D4] space-y-1">
                  <div className="font-bold text-[#1D2521] uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B82025]" />
                    Conventional & Government Mortgages
                  </div>
                  <p className="text-[#6B716D] leading-relaxed">
                    Qualifies for conventional Fannie Mae/Freddie Mac loans, FHA 3.5% down programs, VA 0% down loans for veterans, and USDA rural housing loans.
                  </p>
                </div>

                <div className="p-4 bg-[#F7F4EC] rounded-sm border border-[#E5E0D4] space-y-1">
                  <div className="font-bold text-[#1D2521] uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B82025]" />
                    Land & Home Financing Packages
                  </div>
                  <p className="text-[#6B716D] leading-relaxed">
                    Use your existing land equity as down payment or bundle property acquisition with your new modular home build.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:+18125954033"
                  className="w-full py-3.5 bg-[#8F171C] hover:bg-[#721215] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Talk to a Financing Specialist</span>
                </a>

                <Link
                  href="/contact"
                  className="w-full py-3 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Explore Preferred Lenders</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
