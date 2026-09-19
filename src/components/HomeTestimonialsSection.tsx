import Link from "next/link";

export default function HomeTestimonialsSection() {
  const reviews = [
    {
      stars: "★★★★★",
      quote: "The process was easy and the quality is outstanding. We love our new home!",
      author: "— Sarah T.",
      location: "Texas",
    },
    {
      stars: "★★★★★",
      quote: "Great experience from start to finish. Highly recommend ModularHome.com.",
      author: "— Michael R.",
      location: "Tennessee",
    },
    {
      stars: "★★★★★",
      quote: "Beautiful home, built on time and within budget.",
      author: "— Jennifer L.",
      location: "North Carolina",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white" id="testimonials">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-[-1.3px] text-[#101114] m-0">
              What Our Customers Say
            </h2>
            <p className="text-sm sm:text-base text-[#6b7280] mt-1.5 mb-0">
              Real stories from homeowners.
            </p>
          </div>
          <Link
            href="/about"
            className="text-[#d97706] hover:text-[#b45309] font-extrabold text-sm sm:text-base hover:underline whitespace-nowrap self-start sm:self-auto"
          >
            View All Reviews →
          </Link>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="card p-6 flex flex-col justify-between bg-white hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="text-[#fcb907] text-xl font-bold tracking-wider mb-3">
                  {rev.stars}
                </div>
                <p className="text-sm sm:text-base text-[#101114] font-medium leading-relaxed italic mb-4">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#e7e9ee] flex items-center justify-between">
                <b className="text-sm font-black text-[#101114]">
                  {rev.author}
                </b>
                <span className="text-xs text-[#6b7280] font-medium">
                  {rev.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
