"use client"
import React, { useState } from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { Category } from '@/app/types/categories';
import DropDownList from './DropDownList';
import SkletonText from '../skeletontext/SkletonText';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
const SecondaryHeader = () => {
  const { data: navItems = [], isPending, isError } = useCategories();
  const swappedNavItems = [...navItems];
  const lastIndex = swappedNavItems.length - 1;
  const secondLastIndex = lastIndex - 1;
  [swappedNavItems[lastIndex], swappedNavItems[secondLastIndex]] = [swappedNavItems[secondLastIndex], swappedNavItems[lastIndex]];
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <div className="border-2 border-t-primaryDark border-b-primaryDark py-1">
      <ul className="flex-between container">
        {isPending ? (
          Array.from({ length: 4 }).map((_, index) => (
            <li key={index}>
              <SkletonText />
            </li>
          ))
        ) : (
          // Show actual nav items when data is loaded
          swappedNavItems.map((item: Category, index: number) => (
            <li
              key={index}
              className="secondaryHeading uppercase font-bold text-primaryDark relative"
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <LinkComponent 
                href={`catalog/category=${item.category_name}`} 
                text={item.category_name} 
              />
              {item.subcategories &&
                item.subcategories.length > 0 &&
                activeCategory === index && (
                  <DropDownList 
                    subCategory={item.subcategories}  
                    category={item.category_name}
                  />
                )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default SecondaryHeader;