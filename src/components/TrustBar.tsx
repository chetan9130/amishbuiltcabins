import { Home, DollarSign, Leaf, CheckCircle2 } from "lucide-react";

export default function TrustBar() {
  const items = [
    { 
      icon: Home, 
      label: "Faster Build Times" 
    },
    { 
      icon: DollarSign, 
      label: "Lower Costs" 
    },
    { 
      icon: Leaf, 
      label: "Energy Efficient" 
    },
    { 
      icon: CheckCircle2, 
      label: "Nationwide Delivery" 
    },
  ];

  return (
    <div className="wrap relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 -mt-10 sm:-mt-14 lg:-mt-16">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="card bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(252,185,7,0.18)] text-center py-7 sm:py-9 lg:py-11 px-4 sm:px-6 flex flex-col items-center justify-center min-h-[140px] sm:min-h-[170px] lg:min-h-[195px] hover:-translate-y-1.5 transition-all duration-300 group cursor-default"
            >
              <div className="mb-3 sm:mb-4 text-[#fcb907] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" strokeWidth={2.5} />
              </div>
              <span className="text-[#101114] font-extrabold text-base sm:text-lg lg:text-xl tracking-tight leading-snug">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

