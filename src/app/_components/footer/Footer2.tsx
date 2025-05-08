"use client"
import React, { useState } from 'react'
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {Category, Subcategory} from '../../types/categories';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
const Footer2 = () => {
    const { data: NavItems = [] } = useCategories();
      const [activeCategory, setActiveCategory] = useState<number | null>(null);
  return (
    <div className='bg-primaryDark py-4 mt-4'>
        <ul className="container categories flex flex-wrap justify-between  gap-4 mt-4">
          {NavItems.map((item: Category, index: number) => (
            <li key={item.url_slug || index}>
              <div className="categoryHeader flex justify-between items-center text-xl text-primaryDark">
                <Link className='text-white'
                  href={item.url_slug}>{item.category_name}</Link>
              </div>
              {item.subcategories &&
                item.subcategories.length > 0 &&
                 (
                  <ul className=" flex flex-col gap-2 pt-1">
                    {item.subcategories.map(
                      (subItem: Subcategory, subIndex: number) => (
                        <li
                          key={subItem.url_slug || subIndex}
                          className="text-md"
                        >
                         <Link className='text-white'
                  href={subItem.url_slug}>{subItem.category_name}</Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
            </li>
          ))}
        </ul>
    </div>
  )
}
export default Footer2