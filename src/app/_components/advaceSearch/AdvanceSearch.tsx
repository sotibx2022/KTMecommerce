import React, { useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from Next.js
import SearchByCategory from './SearchByCategory';
import SearchByBrand from './SearchByBrand';
import SearchByPrice from './SearchByPrice';
import SearchBySubCategory from './SearchBySubCategory';
import { Category } from '@/app/types/categories';
// Dynamically import ProductByRating with no SSR (client-side only)
const ProductByRating = dynamic(() => import('./ProductByRating'), { 
  ssr: false,
});
const AdvanceSearch = () => {
  const [category, setCategory] = useState<Category | null>(null); // State to store the category object (or null)
  const [subcategory, setSubCategory] = useState<Category | null>(null); // State to store the subcategory object (or null)
  const [values, setValues] = useState<{
    maxValue: number | null;
    minValue: number | null;
  }>({
    maxValue: null,
    minValue: null,
  });
  const [rating, setRating] = useState(0);
  const receiveCategoryFromChild = (value: Category | null) => {
    setCategory(value); // Store the selected category (or null) from child
  };
  const receiveSubCategoryFromChild = (value: Category | null) => {
    setSubCategory(value); // Store the selected subcategory (or null) from child
  };
  const receiveValuesFromChild = (minVal: number, maxVal: number) => {
    setValues((prev) => ({
      ...prev,
      maxValue: maxVal,
      minValue: minVal,
    }));
  };
  const handleRatingChange = (selectedRating: number) => {
    setRating(selectedRating);
  };
  return (
    <div className="bg-primaryLight p-6 rounded-lg shadow-md min-w-[300px] h-[800px]">
      <h2 className="text-xl font-semibold text-primaryDark mb-4">Advanced Search</h2>
      <SearchByCategory sendCategoryToParent={receiveCategoryFromChild} />
      <SearchBySubCategory 
        category={category} 
        sendSubCategoryToParent={receiveSubCategoryFromChild} // Fixed the prop name
      />
      <SearchByPrice sendValuesToParent={receiveValuesFromChild} />
      {/* Dynamically render ProductByRating */}
      <ProductByRating rating={5} onClick={() => handleRatingChange(5)} />
      <ProductByRating rating={4} onClick={() => handleRatingChange(4)} />
      <ProductByRating rating={3} onClick={() => handleRatingChange(3)} />
      <ProductByRating rating={2} onClick={() => handleRatingChange(2)} />
      <ProductByRating rating={1} onClick={() => handleRatingChange(1)} />
    </div>
  );
};
export default AdvanceSearch;
