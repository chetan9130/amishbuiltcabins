import Link from "next/link";
import Image from "next/image";
import { BuildingModel } from "@/data/models";
import { formatPrice } from "@/utils/currency";

interface BuildingCardProps {
  model: BuildingModel;
  priority?: boolean;
}

export default function BuildingCard({ model, priority = false }: BuildingCardProps) {
  const formattedPrice = formatPrice(model.startingPrice);
  const formattedSqFt = new Intl.NumberFormat("en-US").format(model.sqft);

  return (
    <div className="group flex flex-col bg-white border border-[#E5E0D4] hover:border-[#B82025] rounded-xs overflow-hidden transition-all duration-300 hover:shadow-md">
      {/* Image Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7F4EC]">
        <Image
          src={model.primaryImage || model.image || ""}
          alt={model.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#1D2521] group-hover:text-[#B82025] transition-colors font-display">
            {model.name}
          </h3>
          <p className="text-xs text-[#6B716D] font-medium mt-1">
            {formattedSqFt} sq ft | {model.bedrooms} Bed | {model.bathrooms} Bath
          </p>
          <div className="text-lg font-extrabold text-[#B82025] mt-2 font-display">
            {formattedPrice}
          </div>
        </div>

        {/* Red View Details Button */}
        <div className="pt-1">
          <Link
            href={`/buildings/${model.slug}`}
            className="w-full py-2.5 px-4 bg-[#B82025] hover:bg-[#8F171C] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
