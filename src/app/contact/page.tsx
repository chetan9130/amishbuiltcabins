import { MapPin, Phone, Mail, Clock, HelpCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Our Team | ModularHome.com",
  description: "Connect with ModularHome.com housing specialists, project estimators, and designers. Request a quote or schedule a design consultation.",
};

const FAQS = [
  {
    q: "How long does fabrication and delivery take?",
    a: "Standard pre-engineered cabins and building kits are manufactured and delivered to your job site in 4 to 6 weeks from final signed engineering blueprint approval.",
  },
  {
    q: "Are the blueprints stamped for my local county?",
    a: "Yes. All Amish Built Cabins kits come with licensed engineering calculation packets wet-stamped for the specific county and state where you are building.",
  },
  {
    q: "What type of foundation is required?",
    a: "Our rigid-frame buildings can be anchored to an engineered monolithic concrete slab, crawlspace stem walls, or pier foundation runners depending on the model.",
  },
  {
    q: "Can I erect the building myself?",
    a: "Yes! All components are pre-punched and bolt-together. Many customers assemble with friends and a telehandler, or hire a local steel erection crew.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white pt-28 pb-28 text-[#1D2521]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Editorial Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#B82025] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#B82025]"></span>
                <span>Get In Touch</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#1D2521] font-display leading-[0.95]">
                Let's Build <br />
                <span className="text-[#B82025]">Something Great.</span>
              </h1>
              <p className="mt-4 text-sm sm:text-base text-[#6B716D] leading-relaxed font-body">
                Whether you have existing architectural sketches or are starting with a blank slate, our licensed structural engineers and cabin advisors are here to help.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4 pt-2 border-t border-[#E5E0D4]">
              {/* Company Identity */}
              <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm shadow-xs space-y-1">
                <div className="text-xs uppercase font-bold text-[#B82025] tracking-wider">Official Company Information</div>
                <div className="text-lg font-black text-[#1D2521] font-display">ModularHome.com</div>
                <div className="text-xs text-[#6B716D] font-medium">ModularHome.com</div>
                <p className="text-xs text-[#1D2521] italic pt-1">
                  &ldquo;Discover, Compare & Customize Your Modular Home.&rdquo;
                </p>
              </div>

              {/* Phone Channels */}
              <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm flex items-start gap-4 shadow-xs">
                <div className="p-2.5 rounded-sm bg-white text-[#B82025] shrink-0 border border-[#E5E0D4]">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs uppercase font-bold text-[#6B716D]">Phone Numbers</div>
                  <div className="flex flex-col">
                    <a href="tel:+18125954033" className="text-base font-bold text-[#1D2521] hover:text-[#B82025] transition-colors">
                      Direct: +1-812-595-4033
                    </a>
                    <a href="tel:+18125954033" className="text-sm font-semibold text-[#1D2521] hover:text-[#B82025] transition-colors">
                      Toll-Free: +1-812-595-4033
                    </a>
                  </div>
                </div>
              </div>

              {/* Email Channel */}
              <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm flex items-start gap-4 shadow-xs">
                <div className="p-2.5 rounded-sm bg-white text-[#B82025] shrink-0 border border-[#E5E0D4]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-[#6B716D]">Email Support & Quotes</div>
                  <a href="mailto:support@modularhome.com" className="text-base font-bold text-[#1D2521] hover:text-[#B82025] transition-colors break-all">
                    support@modularhome.com
                  </a>
                  <div className="text-[11px] text-[#6B716D]">Prompt assistance with pricing, plans & consultations</div>
                </div>
              </div>

              {/* Address Channel */}
              <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm flex items-start gap-4 shadow-xs">
                <div className="p-2.5 rounded-sm bg-white text-[#B82025] shrink-0 border border-[#E5E0D4]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-[#6B716D]">Headquarters & Facility</div>
                  <div className="text-sm font-bold text-[#1D2521]">
                    677 S. Cardinal Lane
                  </div>
                  <div className="text-xs text-[#6B716D]">
                    Scottsburg, Indiana 47170, USA
                  </div>
                  <div className="text-[11px] text-[#B82025] font-semibold mt-0.5">
                    Delivering Quality Modular Homes & Cabins Nationwide
                  </div>
                </div>
              </div>

              {/* Quick Action Buttons Strip */}
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                <a
                  href="tel:+18125954033"
                  className="px-4 py-3 bg-[#8F171C] hover:bg-[#721215] text-white text-xs font-bold uppercase tracking-wider rounded-sm text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-white" />
                  <span>Call Us</span>
                </a>
                <a
                  href="mailto:support@modularhome.com"
                  className="px-4 py-3 bg-[#F7F4EC] hover:bg-white text-[#1D2521] border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider rounded-sm text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-[#B82025]" />
                  <span>Email Us</span>
                </a>
                <a
                  href="/quote"
                  className="px-4 py-3 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-sm text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Request a Quote</span>
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=677+S+Cardinal+Lane,+Scottsburg,+IN+47170"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 bg-[#F7F4EC] hover:bg-white text-[#1D2521] border border-[#E5E0D4] text-xs font-bold uppercase tracking-wider rounded-sm text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#B82025]" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Customer Support Topics Guide */}
              <div className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm space-y-2 mt-4">
                <div className="text-xs uppercase font-bold text-[#1D2521] tracking-wider">
                  What You Can Contact Our Team For:
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-[#6B716D]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span>Cabin pricing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span>Product information</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span>Custom designs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span>Floor plans</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span>Financing information</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span>Delivery information</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span>Installation support</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span>Site preparation</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-1.5 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B82025]"></span>
                    <span className="font-semibold text-[#1D2521]">General project consultation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick FAQs */}
            <div className="pt-6 border-t border-[#E5E0D4] space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1D2521]">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-[#F7F4EC] border border-[#E5E0D4] rounded-sm space-y-1 shadow-2xs">
                    <div className="text-xs font-bold text-[#1D2521] flex items-center gap-2">
                      <HelpCircle className="w-3.5 h-3.5 text-[#B82025] shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                    <p className="text-xs text-[#6B716D] pl-5.5 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
