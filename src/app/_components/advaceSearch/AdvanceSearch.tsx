import React, { useEffect, useContext } from 'react';
import dynamic from 'next/dynamic';
import SearchByCategory from './SearchByCategory';
import SearchBySubCategory from './SearchBySubCategory';
import SearchByPrice from './SearchByPrice';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { AdvanceSearchContext } from '@/app/context/AdvanceSearchContext';
const ProductByRating = dynamic(
  () => import('./ProductByRating'), 
  { 
    ssr: false, 
    loading: () => <p>Loading...</p>  // Optionally, show loading while the component is being imported
  }
);
const AdvanceSearch = () => {
  const context = useContext(AdvanceSearchContext);
  if (!context) {
    throw new Error("Context is Undefined");
  }
  const router = useRouter(); // Initialize Next.js router
  const { advanceSearchValues } = context;
  const { category, subCategory, rating, minPrice, maxPrice } = advanceSearchValues;
  useEffect(() => {
    const currentQuery = new URLSearchParams(window.location.search);
    // Append parameters conditionally
    if (category) currentQuery.append('category', category.category_name);
    if (subCategory) currentQuery.append('subcategory', subCategory.category_name);
    if (minPrice) currentQuery.append('minprice', minPrice.toString());
    if (maxPrice) currentQuery.append('maxprice', maxPrice.toString());
    if (rating) currentQuery.append('rating', rating.toString());
    // Update the URL
    const queryString = currentQuery.toString();
    if (queryString) {
      router.push(`/catalog/${queryString}`);
    }
  }, [category, subCategory, minPrice, maxPrice, rating, router]);
  return (
    <div className="bg-primaryLight p-6 rounded-lg shadow-md min-w-[300px] w-[400px] h-[800px]">
      <h2 className="text-xl font-semibold text-primaryDark mb-4">Advanced Search</h2>
      {/* Category Component */}
      <SearchByCategory />
      {/* Subcategory Component */}
      <SearchBySubCategory />
      {/* Price Component */}
      <SearchByPrice />
      {/* Product Rating Component */}
      <div>
        {[5, 4, 3, 2, 1].map((ratingValue) => (
          <div key={ratingValue}>
            <ProductByRating rating={ratingValue} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdvanceSearch;
