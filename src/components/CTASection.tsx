import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="wrap">
        <div 
          className="rounded-[22px] p-7 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden bg-center bg-cover"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.45) 100%), url('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80')`
          }}
        >
          <div className="relative z-10 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black text-white m-0 tracking-[-1px] leading-tight">
              Ready to Build Your Dream Home?
            </h2>
            <div className="text-sm sm:text-base text-white/90 mt-2 font-medium">
              Get a personalized quote and take the first step today.
            </div>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="#quote"
              className="btn-primary py-3.5 px-7 text-sm sm:text-base font-extrabold rounded-[11px] w-full md:w-auto shadow-lg hover:scale-105"
            >
              Get a Quote →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
