import { initialCategories } from '@/app/data/categoriesData';
import { useState } from 'react';
const CategoriesSelection = () => {
  return (
    <div className="absolute top-[30px] left-0">
        <ul 
          className=" bg-white rounded-md shadow-primaryDark py-1 border"
        >
          {initialCategories.map((item, index) => (
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