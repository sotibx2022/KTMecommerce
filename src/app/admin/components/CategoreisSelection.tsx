import { initialCategories } from '@/app/data/categoriesData';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
import { Category } from '@/app/types/categories';
import { useState } from 'react';
const CategoriesSelection = () => {
   const { data: navItems = initialCategories, isPending:isCategoryPending, isError } = useCategories();
  return (
    <div className="absolute top-[30px] left-0">
        <ul 
          className=" bg-white rounded-md shadow-primaryDark py-1 border"
        >
          {navItems.map((item:Category, index:number) => (
            <li
              key={index}
              className="w-full text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
            >
              {item.category_name}
            </li>
          ))}
        </ul>
    </div>
  );
};
export default CategoriesSelection;