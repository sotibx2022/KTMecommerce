"use client"
import React, { useState } from 'react'
import ResponsiveHeader from '../navbar/responsiveHeader/ResponsiveHeader'
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { useQuery } from '@tanstack/react-query';
import { Category } from '@/models/categories.model';
import LinkComponent from '../linkComponent/LinkComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
const Footer2 = () => {
    const { data: NavItems = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
      });
      const [activeCategory, setActiveCategory] = useState<number | null>(null);
      // Toggle category visibility
    //   const toggleCategory = (index: number) => {
    //     setActiveCategory((prevState) => (prevState === index ? null : index));
    //   };
  return (
    <div>
        <ul className="container categories flex justify-between  gap-4 mt-4">
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
                      (subItem: Category, subIndex: number) => (
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