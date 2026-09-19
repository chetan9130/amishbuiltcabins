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
    <div className="card overflow-hidden group hover:-translate-y-1 transition-all flex flex-col justify-between bg-white">
      {/* Image Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        <Image
          src={model.primaryImage || model.image || ""}
          alt={model.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-108"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5 bg-white">
        <div>
          <h3 className="text-base sm:text-lg font-black tracking-tight text-[#101114] group-hover:text-[#d97706] transition-colors">
            {model.name}
          </h3>
          <p className="text-xs text-[#6b7280] font-medium mt-1">
            {formattedSqFt} sq ft | {model.bedrooms} Bed | {model.bathrooms} Bath
          </p>
          <div className="text-lg sm:text-[21px] font-black text-[#d97706] mt-2">
            {formattedPrice}
          </div>
        </div>

        {/* View Details Button */}
        <div className="pt-2">
          <Link
            href={`/buildings/${model.slug}`}
            className="w-full py-2.5 px-4 text-xs font-black rounded-[9px] text-center justify-center bg-[#0f1218] hover:bg-[#fcb907] text-white hover:text-[#101114] transition-all duration-200 shadow-xs flex items-center gap-1.5"
          >
            <span>View Details →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
