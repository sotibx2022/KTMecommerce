"use client"
import { AdvanceSearchContext } from '@/app/context/AdvanceSearchContext';
import React, { useContext } from 'react';
const SearchByPrice = () => {
const context = useContext(AdvanceSearchContext);
if(!context){
  throw new Error("Context is not defined.")
}
const {advanceSearchValues, setAdvanceSearchValues} = context;
  return (
    <div>
      <label className="block text-primaryDark font-medium mb-2">Price Range</label>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Min"
          className="w-1/2 border border-primaryDark rounded-lg px-3 py-2 bg-primaryDark text-white focus:outline-none focus:ring-2 focus:helper placeholder:text-white"
          value={advanceSearchValues.minPrice}
          onChange={(e) => setAdvanceSearchValues({
            ...advanceSearchValues, // Copy previous state
            minPrice: e.target.value // Update only the minPrice field
          })}
        />
        <input
          type="text"
          placeholder="Max"
          className="w-1/2 border border-primaryDark rounded-lg px-3 py-2 bg-primaryDark text-white focus:outline-none focus:ring-2 focus:helper placeholder:text-white"
          value={advanceSearchValues.maxPrice}
          onChange={(e) => setAdvanceSearchValues({
            ...advanceSearchValues, // Copy previous state
            maxPrice: e.target.value // Update only the minPrice field
          })}
        />
      </div>
    </div>
  );
};
export default SearchByPrice;