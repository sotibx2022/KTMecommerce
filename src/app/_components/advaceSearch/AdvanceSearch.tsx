import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchByCategory from './SearchByCategory';
import SearchBySubCategory from './SearchBySubCategory';
import SearchByPrice from './SearchByPrice';
import { Category } from '@/app/types/categories';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useSearchParams from next/navigation
import { findCategoryObjfromCategoryText, findSubCatObjfromSubCatText } from '@/app/services/apiFunctions/categoryText2CategoryObj';
const ProductByRating = dynamic(() => import('./ProductByRating'), { ssr: false });
const AdvanceSearch = () => {
  return (
    <div className="bg-primaryLight p-6 rounded-lg shadow-md min-w-[300px] w-[400px] h-[800px]">
      <h2 className="text-xl font-semibold text-primaryDark mb-4">Advanced Search</h2>
      {/* Category Component */}
      <SearchByCategory/>
      {/* Subcategory Component */}
      <SearchBySubCategory/>
      {/* Price Component */}
      <SearchByPrice/>
      {/* Product Rating Component */}
      {[5, 4, 3, 2, 1].map((ratingValue) => (
        <ProductByRating/>
      ))}
    </div>
  );
};
export default AdvanceSearch;
