import React from "react";
interface RupeeProps {
  price: string | number;   // Price to display
  className?: string;       // Optional className
  useNepaliWord?: boolean;  // Optional: true to use 'रुपैयाँ' instead of 'रु.'
}
export const Rupee: React.FC<RupeeProps> = ({ price, className, useNepaliWord = false }) => {
  // Ensure price is a number
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  // Format number in Nepali style (Indian comma system)
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericPrice);
  return (
    <span className={className}>
      {useNepaliWord ? "रुपैयाँ" : "रु."} {formattedPrice}
    </span>
  );
};
