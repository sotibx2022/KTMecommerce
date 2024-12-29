"use client";
import { AdvanceSearchContext } from '@/app/context/AdvanceSearchContext';
import React, { useContext } from 'react';
const SearchBySubCategory = () => {
  const context = useContext(AdvanceSearchContext);
  if (!context) {
    throw new Error("The context is undefined");
  }
  const { advanceSearchValues, setAdvanceSearchValues } = context;
  console.log(advanceSearchValues);
  const subcategories = advanceSearchValues.category?.subcategories;
  return (
    <div>
      <label className="block text-primaryDark font-medium mb-2">Subcategory</label>
      <select className="selectInput"disabled={!advanceSearchValues.category}>
        <option value="">Select One</option>
        {/* Check if subcategories is a valid array and has items */}
        {Array.isArray(subcategories) && subcategories.length > 0 && 
          subcategories.map((subcategory, index) => {
            return (
              <option key={index} value={JSON.stringify(subcategory)}>
                {subcategory.category_name}
              </option>
            );
          })
        }
      </select>
    </div>
  );
};
export default SearchBySubCategory;
