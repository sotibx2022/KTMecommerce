"use client";
import React, { useEffect, useContext, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import SearchByCategory from './SearchByCategory';
import SearchBySubCategory from './SearchBySubCategory';
import SearchByPrice from './SearchByPrice';
import { useRouter } from 'next/navigation';
import { AdvanceSearchContext } from '@/app/context/AdvanceSearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FilterIconLeft from './filterIcons/FilterIconLeft';
import FilterIconRight from './filterIcons/FilterIconRight';
import gsap from 'gsap'; // ✅ IMPORT GSAP
interface AdvanceSearchProps{
  getShowSearchValue:(value:boolean)=>void;
}
const AdvanceSearch:React.FC<AdvanceSearchProps> = ({getShowSearchValue}) => {
  const context = useContext(AdvanceSearchContext);
  if (!context) throw new Error("Context is Undefined");
  const router = useRouter();
  const { advanceSearchValues } = context;
  const { category, subCategory, rating, minPrice, maxPrice } = advanceSearchValues;
  const [showSearch, setShowSearch] = useState(false);
  const containerRef = useRef(null);
  // ✅ Animate on showSearch toggle
  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: showSearch ? 0 : -350, // Hide at -300px
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [showSearch]);
  // URL Query Update
  useEffect(() => {
    const currentQuery = new URLSearchParams(window.location.search);
    if (category) currentQuery.set('category', category.category_name);
    if (subCategory) currentQuery.set('subcategory', subCategory.category_name);
    if (minPrice) currentQuery.set('minprice', minPrice.toString());
    if (maxPrice) currentQuery.set('maxprice', maxPrice.toString());
    if (rating) currentQuery.set('rating', rating.toString());
    const queryString = currentQuery.toString();
    if (queryString) {
      router.push(`/catalog/${queryString}`);
    }
  }, [category, subCategory, minPrice, maxPrice, rating, router]);
  return (
    <section
    className={`bg-background min-h-screen overflow-hidden ${
      showSearch ? 'min-w-[300px]' : ''
    }`}
  >
      <div
        ref={containerRef}
        className="fixed top-1/2 transform -translate-y-1/2 w-[300px]"
      >
        <div className="shadow-helper p-4">
          {showSearch ? (
            <>
              <FilterIconLeft onClick={() => {setShowSearch(false)
               getShowSearchValue(false) }
              } />
              <div className="searchContainer">
                <SearchByCategory />
                <SearchBySubCategory />
                <SearchByPrice />
              </div>
            </>
          ) : (
            <FilterIconRight onClick={() => {setShowSearch(true)
              getShowSearchValue(true)}
            } />
          )}
        </div>
      </div>
    </section>
  );
};
export default AdvanceSearch;
