"use client"
import React, { useState } from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { Category } from '@/app/types/categories';
import DropDownList from './DropDownList';
const SecondaryHeader = () => {

  const { data: navItems = [], isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });
  const [activeCategory, setActiveCategory] = useState<number | null>(null); // Track active category index
  return (
    <div className="border-2 border-t-primaryDark border-b-primaryDark py-1">
      <ul className="flex-between container">
        {navItems.map((item: Category, index: number) => (
          <li
            key={index}
            className="secondaryHeading uppercase font-bold text-primaryDark relative"
            onMouseEnter={() => setActiveCategory(index)} // Set the current category as active
            onMouseLeave={() => setActiveCategory(null)} // Reset when mouse leaves
          >
            <LinkComponent href={`catalog/category=${item.category_name}`} text={item.category_name} />
            {item.subcategories &&
              item.subcategories.length > 0 &&
              activeCategory === index && ( // Show only if this category is active
                <DropDownList subCategory={item.subcategories}  category={item.category_name}/>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SecondaryHeader;
