export default function TrustBar() {
  const items = [
    { icon: "⌂", label: "Faster Build Times" },
    { icon: "$", label: "Lower Costs" },
    { icon: "♧", label: "Energy Efficient" },
    { icon: "✓", label: "Nationwide Delivery" },
  ];

  return (
    <div className="wrap relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 -mt-5 sm:-mt-8.5">
        {items.map((item, i) => (
          <div
            key={i}
            className="card text-center py-5 sm:py-5.5 px-3 font-extrabold text-[#101114] text-sm sm:text-base hover:-translate-y-1 transition-transform"
          >
            <strong className="block text-[#e20b16] text-2xl sm:text-[25px] leading-none mb-1 sm:mb-1.5 font-black">
              {item.icon}
            </strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
