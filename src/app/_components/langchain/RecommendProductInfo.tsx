import React from "react";
import { CheckCircle } from "lucide-react";
const RecommendedProductInfo: React.FC = () => {
  const points = [
    "Find main product category",
    "Select best subcategory",
    "Match product details",
    "Filter by price if given",
    "Return cheapest matched item",
  ];
  return (
    <div
      className="max-w-md mx-auto p-6 rounded-[var(--radius)] bg-[var(--backgroundLight)] shadow-md text-[var(--primaryDark)]"
      style={{ borderRadius: "var(--radius)" }}
    >
      <h3 className="text-xl font-semibold mb-4 text-[var(--primaryDark)]">
        How recommendation works
      </h3>
      <ul className="space-y-2  text-sm leading-relaxed">
        {points.map((point, i) => (
          <li key={i} className="flex items-center gap-2">
            <CheckCircle
              size={16}
              strokeWidth={2}
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RecommendedProductInfo;
