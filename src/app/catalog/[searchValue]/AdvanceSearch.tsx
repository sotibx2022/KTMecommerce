"use client"
import React, { useContext, useEffect } from 'react'
import SubCategoriesSelection from './SubCategorySelection';
import PriceSelection from './PriceSelection';
import RatingSelection from './RatingSelection';
import HighLightSelection from './HighLightSelection';
import { useSearchParams } from 'next/navigation';
import CategorySelection from './CategorySelection';
import { SearchContext } from './AdvanceSearchContext';
const AdvanceSearch = () => {
  const { setSearchValues } = useContext(SearchContext);
  const searchParams = useSearchParams();
  useEffect(() => {
    setSearchValues(prev => {
      const isOfferItem = searchParams.get('isOfferItem') === "true";
      const isTrendingItem = searchParams.get('isTrendingItem') === "true";
      const isNewArrival = searchParams.get('isNewArrival') === "true";
      const isTopSell = searchParams.get('isTopSell') === "true";
      const highlightedValues = 
        isNewArrival ? "isNewArrival" :
        isOfferItem ? "isOfferItem" :
        isTopSell ? "isTopSell" :
        isTrendingItem ? "isTrendingNow" : 
        "isRegular";
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
    <div>
      <CategorySelection />
      <SubCategoriesSelection />
      <PriceSelection />
      <RatingSelection />
      <HighLightSelection />
    </div>
  )
}
export default AdvanceSearch