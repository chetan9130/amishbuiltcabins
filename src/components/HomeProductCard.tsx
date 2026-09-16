import Link from "next/link";
import Image from "next/image";

export interface ProductItem {
  id: string;
  slug?: string;
  name: string;
  badge?: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  sqft?: number;
  meta?: string;
  price: string | number;
}

interface HomeProductCardProps {
  product: ProductItem;
}

export default function HomeProductCard({ product }: HomeProductCardProps) {
  const formattedPrice = typeof product.price === "number"
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.price)
    : product.price;

  const metaString = product.meta || (
    product.sqft 
      ? `${product.bedrooms} Bed | ${product.bathrooms} Bath | ${new Intl.NumberFormat("en-US").format(product.sqft)} Sq Ft`
      : `${product.bedrooms} Bed | ${product.bathrooms} Bath`
  );

  const href = product.slug ? `/buildings/${product.slug}` : `/buildings`;

  return (
    <div className="card overflow-hidden group hover:-translate-y-1 transition-all flex flex-col justify-between relative bg-white">
      {/* Optional Badge */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-[#e20b16] text-white px-2.5 py-1 rounded-[8px] text-[11px] font-extrabold shadow-sm">
          {product.badge}
        </span>
      )}

      {/* Product Image */}
      <div className="relative h-[170px] sm:h-[185px] w-full overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
        />
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#101114] mb-1 group-hover:text-[#e20b16] transition-colors">
            {product.name}
          </h3>
          <div className="text-[13px] text-[#6b7280] font-medium">
            {metaString}
          </div>
          <div className="text-[21px] text-[#e20b16] font-black my-2.5">
            {formattedPrice}
          </div>
        </div>

        <Link
          href={href}
          className="btn-primary w-full py-2.5 px-3.5 text-[13px] font-extrabold rounded-[9px] text-center justify-center mt-2 shadow-xs"
        >
          View Home →
        </Link>
      </div>
    </div>
  );
}
