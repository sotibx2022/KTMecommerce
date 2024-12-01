"use client"
import React from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/app/services/queryFunctions/categoreis';
import { Category } from '@/app/types/categories';
import DropDownList from './DropDownList';
const SecondaryHeader = () => {
const {data:navItems=[], isLoading, isError} = useQuery({queryKey:['category'], queryFn:getAllCategories})
  return (
    <div className='border-2 border-t-primaryDark border-b-primaryDark py-1'>
      <ul className='flex-between container'>
        {navItems.map((item:Category, index:number) => (
          <li key={index} className="secondaryHeading uppercase font-bold text-primaryDark">
            <LinkComponent href={item.url_slug} text={item.category_name}/>
            {item.subcategories && item.subcategories.length>0 && <DropDownList subCategory={item.subcategories}/>}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SecondaryHeader;