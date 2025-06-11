"use client"
import React, { useState } from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
import { initialCategories } from '@/app/data/categoriesData';
import DropDownList from './DropDownList';
import { Category } from '@/app/types/categories';
const SecondaryHeader = () => {
  const { data: navItems = initialCategories, isPending, isError } = useCategories();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  // Use either fetched data or initial categories
  const displayItems = isPending || isError ? initialCategories : navItems;
  // Swap last two items
  const swappedNavItems = [...displayItems];
  if (swappedNavItems.length > 1) {
    const lastIndex = swappedNavItems.length - 1;
    const secondLastIndex = lastIndex - 1;
    [swappedNavItems[lastIndex], swappedNavItems[secondLastIndex]] = 
      [swappedNavItems[secondLastIndex], swappedNavItems[lastIndex]];
  }
  return (
    <div className="border-2 border-t-primaryDark border-b-primaryDark py-1">
      <ul className="flex-between container">
        {swappedNavItems.map((item: Category, index: number) => (
          <li className='m-0 p-0'
            key={item.url_slug || index}
            onMouseEnter={() => setActiveCategory(index)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <LinkComponent 
              href={`/catalog/advanceSearch?category=${item.url_slug || item.category_name}`} 
              text={item.category_name} 
              className="secondaryHeading uppercase font-bold text-primaryDark relative px-4 py-0 my-0"
            />
            {item.subcategories?.length > 0 && activeCategory === index && (
              <DropDownList 
                subCategory={item.subcategories} category={item.category_name}              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SecondaryHeader;