"use client"
import React from 'react'
import SubCategoriesSelection from './SubCategorySelection';
import PriceSelection from './PriceSelection';
import RatingSelection from './RatingSelection';
import HighLightSelection from './HighLightSelection';
import { useSearchParams } from 'next/navigation';
import  CategorySelection  from './CategorySelection';
const AdvanceSearch = () => {
const searchParams = useSearchParams();
    const category = searchParams.get('category')??"";
    const subCategory = searchParams.get('subcategory')??"";
    const isOffferItem = searchParams.get('isOfferItem')??"";
    const isTrendingItem= searchParams.get('isTrendingItem')??"";
    const isNewArrival = searchParams.get('isNewArrival')??"";
    const isTopSell = searchParams.get('isTopSell')??"";
    const priceOrder= searchParams.get('priceOrder')??"";
    const ratingOrder= searchParams.get('ratingOrder')??"";
const initialHighLights = {
  isNewArrival: isNewArrival === "true",
  isOffferItem: isOffferItem === "true",
  isTrendingItem: isTrendingItem === "true",
  isTopSell: isTopSell === "true",
  isRegular: (!isNewArrival||!isOffferItem||!isTrendingItem||!isTopSell)
};
  return (
    <div>
      <CategorySelection intialCategory ={category}/>
      <SubCategoriesSelection initialSubCategory={subCategory} />
      <PriceSelection initialPriceOrder={priceOrder} />
        <RatingSelection initialRatingOrder={ratingOrder}/>
        <HighLightSelection initialHighLights={initialHighLights}/>
    </div>
  )
}
export default AdvanceSearch