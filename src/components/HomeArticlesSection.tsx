import Link from "next/link";
import Image from "next/image";

export default function HomeArticlesSection() {
  const articles = [
    {
      title: "5 Benefits of Modular Homes",
      category: "Buying Guide",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
      href: "/resources",
    },
    {
      title: "How Much Does a Modular Home Really Cost?",
      category: "Pricing Guide",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
      href: "/resources",
    },
    {
      title: "Modular vs. Traditional Homes",
      category: "Home Building",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      href: "/resources",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#f6f7f9]">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-[-1.3px] text-[#101114] m-0">
              Latest News & Resources
            </h2>
            <p className="text-sm sm:text-base text-[#6b7280] mt-1.5 mb-0">
              Tips, guides and inspiration for your modular home journey.
            </p>
          </div>
          <Link
            href="/resources"
            className="text-[#d97706] hover:text-[#b45309] font-extrabold text-sm sm:text-base hover:underline whitespace-nowrap self-start sm:self-auto"
          >
            View All Articles →
          </Link>
        </div>

        {/* 3 Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {articles.map((art, idx) => (
            <Link
              key={idx}
              href={art.href}
              className="card overflow-hidden group hover:-translate-y-1 transition-all block bg-white"
            >
              <div className="relative h-[160px] sm:h-[175px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-black text-[#101114] mb-1.5 group-hover:text-[#d97706] transition-colors leading-snug">
                  {art.title}
                </h3>
                <div className="text-xs text-[#6b7280] font-semibold">
                  {art.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
