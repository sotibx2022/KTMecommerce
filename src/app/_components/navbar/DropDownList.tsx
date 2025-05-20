import { Category, Subcategory } from '@/app/types/categories';
import React, { useState } from 'react';
import LinkComponent from '../linkComponent/LinkComponent';
import Link from 'next/link';
interface DropDownCategory {
    subCategory: Subcategory[];
    category:string, 
}
const DropDownList: React.FC<DropDownCategory> = ({ subCategory,category }) => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    return (
        <div className='absolute top-[100%] left-0 w-[200px] shadow-helper p-4 bg-background z-10'  >
            {subCategory.map((subItem: Subcategory, index: number) => (
<div
  key={index}
  className={`border-b-2 border-primaryDark border-dotted py-2 ${
    activeCategory === index ? 'text-primaryDark' : 'text-primaryLight'
  }`}
  onMouseEnter={() => setActiveCategory(index)}
  onMouseLeave={()=>setActiveCategory(null)}
>
                    <Link href={`/catalog/advanceSearch?category=${category}&subcategory=${subItem.category_name}`}>{subItem.category_name}</Link>
                </div>
            ))}
        </div>
    );
};
export default DropDownList;
