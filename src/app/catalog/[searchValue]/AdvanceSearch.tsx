"use client"
import React, { useContext, useEffect, useMemo } from 'react'
import SubCategoriesSelection from './SubCategorySelection';
import PriceSelection from './PriceSelection';
import RatingSelection from './RatingSelection';
import HighLightSelection from './HighLightSelection';
import { useRouter, useSearchParams } from 'next/navigation';
import CategorySelection from './CategorySelection';
import ProductsLayout from './ProductsLayout';
import { AdvanceSearchProvider, SearchContext } from '@/app/context/AdvanceSearchContext';
import { updateUrl } from './updateUrl';
import KeywordSearch from './KeywordSearch';
const AdvanceSearch = () => {
const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
    }
    const {searchValues,setSearchValues} = context
  const searchParams = useSearchParams();
  useEffect(() => {
    setSearchValues(prev => {
      const isOfferItem = searchParams.get('isOfferItem') === "true";
      const isTrendingNow = searchParams.get('isTrendingItem') === "true";
      const isNewArrival = searchParams.get('isNewArrival') === "true";
      const isTopSell = searchParams.get('isTopSell') === "true";
      const isRegular = searchParams.get('isRegular') ==="true";
      const highlightedValues = 
        isNewArrival ? "New Arrival" :
        isOfferItem ? "Offer Item" :
        isTopSell ? "Top Sell" :
        isTrendingNow? "Trending Item" : 
        isRegular?"Regular":
        "Select";
      return {
        ...prev,
        categoryValue: searchParams.get('category') ?? prev.categoryValue,
        subCategoryValue: searchParams.get('subcategory') ?? prev.subCategoryValue,
        priceOrder: searchParams.get('priceOrder') as "normal" | "increasing" | "decreasing" ?? prev.priceOrder,
        ratingOrder: searchParams.get('ratingOrder') as "normal" | "increasing" | "decreasing" ?? prev.ratingOrder,
        highlightedValues
      };
    });
  }, [searchParams, setSearchValues]);
  return (
    <div className='hidden lg:flex container w-full justify-between my-4 gap-4  items-center shadow-primaryLight p-2'>
       <CategorySelection />
      <SubCategoriesSelection />
      <PriceSelection />
      <RatingSelection />
      <HighLightSelection />
      <ProductsLayout/>
    </div>
  )
}
export default AdvanceSearch