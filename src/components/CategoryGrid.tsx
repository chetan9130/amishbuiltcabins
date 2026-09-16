import Link from "next/link";
import Image from "next/image";

export interface CategoryItem {
  id: string;
  name: string;
  image: string;
  href: string;
}

export const CATEGORIES_DATA: CategoryItem[] = [
  {
    id: "modular-homes",
    name: "Modular Homes",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=Modular+Homes",
  },
  {
    id: "prefab-homes",
    name: "Prefab Homes",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=Prefab+Homes",
  },
  {
    id: "barndominiums",
    name: "Barndominiums",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=Barndominiums",
  },
  {
    id: "house-kits",
    name: "House Kits",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=House+Kits",
  },
  {
    id: "tiny-homes",
    name: "Tiny Homes",
    image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=Tiny+Homes",
  },
  {
    id: "modular-cabins",
    name: "Modular Cabins",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=Cabins",
  },
  {
    id: "adus",
    name: "ADUs / Granny Pods",
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=ADUs+%26+Granny+Pods",
  },
  {
    id: "park-models",
    name: "Park Models",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=Park+Models",
  },
  {
    id: "a-frames",
    name: "A-Frames",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=A-Frame+Homes",
  },
  {
    id: "commercial",
    name: "Commercial",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=75",
    href: "/buildings?category=Commercial+Buildings",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-12 sm:py-16 bg-[#f6f7f9]">
      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-[-1.3px] text-[#101114] m-0">
              Shop by Home Type
            </h2>
            <p className="text-sm sm:text-base text-[#6b7280] mt-1.5 mb-0">
              Explore our most popular home categories.
            </p>
          </div>
          <Link
            href="/buildings"
            className="text-[#e20b16] font-extrabold text-sm sm:text-base hover:underline whitespace-nowrap self-start sm:self-auto"
          >
            View All Home Types →
          </Link>
        </div>

        {/* 10 Category Cards 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="card overflow-hidden group hover:-translate-y-1 transition-all block"
            >
              <div className="relative h-[135px] sm:h-[145px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
                />
              </div>
              <div className="p-3.5 bg-white flex items-center justify-between">
                <h3 className="text-sm sm:text-[15px] font-extrabold text-[#101114] group-hover:text-[#e20b16] transition-colors m-0">
                  {cat.name} →
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
