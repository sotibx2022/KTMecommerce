"use client"
import React, { useState } from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
import DropDownList from './DropDownList';
import { Category } from '@/app/types/categories';
import { useInitialCategories } from '@/app/data/categoriesData';
const SecondaryHeader = () => {
  const { data: navigationItems, isPending, isError } = useInitialCategories();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const navItems = navigationItems ? navigationItems.data : []
  return (
    <div className="border-2 border-t-primaryDark border-b-primaryDark">
      <ul className="flex-between container ">
        {navItems && navItems.map((item: Category, index: number) => (
          <li className='secondaryHeading uppercase font-bold text-primaryDark relative py-2'
            key={item.url_slug || index}
            onMouseEnter={() => setActiveCategory(index)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <LinkComponent
              href={`/catalog/advanceSearch?category=${item.url_slug || item.category_name}`}
              text={item.category_name}
            />
            {item.subcategories?.length > 0 && activeCategory === index && (
              <DropDownList
                subCategory={item.subcategories} category={item.category_name} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SecondaryHeader;