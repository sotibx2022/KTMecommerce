"use client"
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import SubCategoriesSelection from './SubCategorySelection';
import PriceSelection from './PriceSelection';
import RatingSelection from './RatingSelection';
import HighLightSelection from './HighLightSelection';
import { useRouter, useSearchParams } from 'next/navigation';
import CategorySelection from './CategorySelection';
import ProductsLayout from './ProductsLayout';
import { AdvanceSearchProvider, SearchContext } from '@/app/context/AdvanceSearchContext';
import { AbsoluteComponent } from '@/app/_components/absoluteComponent/AbsoluteComponent';
import { updateUrl } from './updateUrl';
import KeywordSearch from './KeywordSearch';
import { DisplayContext } from '@/app/context/DisplayComponents';
const AdvanceSearch = () => {
  const{visibleComponent,setVisibleComponent} = useContext(DisplayContext)
  const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
    }
    const {searchValues,setSearchValues} = context
  const prevSearchValuesRef = useRef(context?.searchValues);
  const router = useRouter();
  const searchParams = useSearchParams();
useEffect(() => {
    if (prevSearchValuesRef.current && 
        JSON.stringify(prevSearchValuesRef.current) !== JSON.stringify(searchValues) &&
        visibleComponent === 'advanceSearch') {
      setVisibleComponent("");
    }
    prevSearchValuesRef.current = searchValues;
  }, [searchValues, visibleComponent, setVisibleComponent]);
  return (
    <AbsoluteComponent>
      <h2 className='subHeading'>Advance Filter</h2>
    <div className='flex-col container w-full flex justify-between my-2 gap-4  items-center shadow-primaryLight p-4'>
      <KeywordSearch/>
       <CategorySelection />
      <SubCategoriesSelection />
      <PriceSelection />
      <RatingSelection />
      <HighLightSelection />
    </div>
    </AbsoluteComponent>
  )
}
export default AdvanceSearch