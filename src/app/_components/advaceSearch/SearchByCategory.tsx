"use client";
import { AdvanceSearchContext } from '@/app/context/AdvanceSearchContext';
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { Category } from '@/app/types/categories';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
const SearchByCategory = () => {
  const { data: categories = [], isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  // Get the context value
  const context = useContext(AdvanceSearchContext);
  // Check if the context is undefined (it will be undefined if the provider is missing)
  if (!context) {
    throw new Error('AdvanceSearchContext must be used within an AdvanceSearchContextComponent');
  }
  const { setAdvanceSearchValues } = context;
  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryValue = e.target.value;
    if (categoryValue) {
      const category = JSON.parse(categoryValue); // Parse the JSON string back to an object
      setAdvanceSearchValues((prevValues) => ({
        ...prevValues, // Spread the previous values
        category, // Update the category value
      }));
    }
  };
  return (
    <div>
      <label className="block text-primaryDark font-medium mb-2">Category</label>
      <select className="selectInput" onChange={handleCategoryChange}>
        {/* Show a default "Select One" option */}
        {!isLoading && <option value="">Select One</option>}
        {/* Loading state */}
        {isLoading && <option value="">Loading ...</option>}
        {/* Categories options */}
        {categories &&
          categories.length > 0 &&
          categories.map((category: Category, index: number) => {
            return (
              <option value={JSON.stringify(category)} key={index}>
                {category.category_name}
              </option>
            );
          })}
      </select>
    </div>
  );
};
export default SearchByCategory;
