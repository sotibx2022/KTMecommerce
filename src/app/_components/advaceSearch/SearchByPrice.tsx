"use client"
import React, { useState } from 'react';
interface SearchByPriceProps{
  sendValuesToParent:(minVal:number,maxVal:number)=>void;
}
const SearchByPrice:React.FC<SearchByPriceProps> = ({sendValuesToParent}) => {
  const [minPrice, setMinPrice] = useState<number|null>(null);
  const [maxPrice, setMaxPrice] = useState<number|null>(null);
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const updatedMinPrice = isNaN(value) ? 0 : value; // Ensure we handle invalid numbers
    setMinPrice(updatedMinPrice);
    sendValuesToParent(updatedMinPrice, maxPrice ?? 0); // Use default value if maxPrice is null
  };
  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    const updatedMaxPrice = isNaN(value) ? 0 : value; // Ensure we handle invalid numbers
    setMaxPrice(updatedMaxPrice);
    sendValuesToParent(minPrice ?? 0, updatedMaxPrice); // Use default value if minPrice is null
  };
  return (
    <div>
      <label className="block text-primaryDark font-medium mb-2">Price Range</label>
      <div className="flex space-x-4">
      <input
  type="number" // Use input type number for numeric inputs
  placeholder="Min"
  value={minPrice ?? ''} // Provide a fallback value for null
  onChange={handleMinPriceChange}
  className="w-1/2 border border-primaryDark rounded-lg px-3 py-2 bg-primaryDark text-white focus:outline-none focus:ring-2 focus:helper placeholder:text-white"
/>
<input
  type="number" // Use input type number for numeric inputs
  placeholder="Max"
  value={maxPrice ?? ''} // Provide a fallback value for null
  onChange={handleMaxPriceChange}
  className="w-1/2 border border-primaryDark rounded-lg px-3 py-2 bg-primaryDark text-white focus:outline-none focus:ring-2 focus:helper placeholder:text-white"
/>
      </div>
    </div>
  );
};
export default SearchByPrice;
