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
  const router = useRouter(); // Router instance for navigation
  const searchParams = useSearchParams(); // Use searchParams hook to read query parameters
  // Read initial values from URL query parameters
  const [categoryState, setCategory] = useState<Category | null>(null);
  const [subcategoryState, setSubCategory] = useState<Category | null>(null);
  const [values, setValues] = useState<{
    maxValue: number | null;
    minValue: number | null;
  }>({
    maxValue: null,
    minValue: null,
  });
  const [valuesOfUrl, setValuesOfUrl] = useState({
    categoryFromUrl:"",
    subcategoryFromUrl:"",
    minpriceFromUrl:"",
    maxpriceFromUrl:"",
    ratingFromUrl:""
  })
  const [ratingState, setRating] = useState<number>(0);
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction
  // Initialize the form state based on the URL query parameters
  useEffect(() => {
    // Assuming `window.location.search` contains the query string
    const searchParams = new URLSearchParams(window.location.search);
    // Update the state based on the URL parameters
    setValuesOfUrl({
      categoryFromUrl: searchParams.get('category') || "",  // Default to empty string if not present
      subcategoryFromUrl: searchParams.get('subcategory') || "",
      minpriceFromUrl: searchParams.get('minprice') || "",
      maxpriceFromUrl: searchParams.get('maxprice') || "",
      ratingFromUrl: searchParams.get('rating') || ""
    });
  }, []);
  // Handle interaction with the form fields
  const handleInteraction = () => {
    setHasInteracted(true);
  };
  // Update URL with query parameters
  const updateQueryParams = () => {
    const params = new URLSearchParams();
    if (categoryState) params.append('category', categoryState.category_name);
    if (subcategoryState) params.append('subcategory', subcategoryState.category_name);
    if (values.minValue !== null) params.append('minprice', values.minValue.toString());
    if (values.maxValue !== null) params.append('maxprice', values.maxValue.toString());
    if (ratingState > 0) params.append('rating', ratingState.toString());
    // Redirect to /catalog only if the user has interacted with the form
    if (hasInteracted) {
      router.push(`/catalog/${params.toString()}`);
      setHasInteracted(false); // Reset after navigation
    }
  };
  // Trigger update when form values change
  React.useEffect(() => {
    updateQueryParams();
  }, [categoryState, subcategoryState, values, ratingState, hasInteracted]);
  return (
    <div className="bg-primaryLight p-6 rounded-lg shadow-md min-w-[300px] w-[400px] h-[800px]">
      <h2 className="text-xl font-semibold text-primaryDark mb-4">Advanced Search</h2>
      {/* Category Component */}
      <SearchByCategory
        sendCategoryToParent={(value: Category | null) => {
          setCategory(value);
          handleInteraction();
        }}
        categoryFromUrl = {valuesOfUrl.categoryFromUrl}
      />
      {/* Subcategory Component */}
      <SearchBySubCategory
        category={categoryState}
        sendSubCategoryToParent={(value: Category | null) => {
          setSubCategory(value);
          handleInteraction();
        }}
      />
      {/* Price Component */}
      <SearchByPrice
        sendValuesToParent={(minVal: number, maxVal: number) => {
          setValues({ minValue: minVal, maxValue: maxVal });
          handleInteraction();
        }}
      />
      {/* Product Rating Component */}
      {[5, 4, 3, 2, 1].map((ratingValue) => (
        <ProductByRating
          key={ratingValue}
          rating={ratingValue}
          onClick={() => {
            setRating(ratingValue);
            handleInteraction();
          }}
        />
      ))}
    </div>
  );
};
export default AdvanceSearch;
