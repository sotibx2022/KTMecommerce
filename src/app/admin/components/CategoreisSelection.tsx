import { ProductFilterContext } from '@/app/context/ProductFilterContext';
import { initialCategories } from '@/app/data/categoriesData';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
import { Category } from '@/app/types/categories';
import { useContext, useState } from 'react';
const CategoriesSelection = () => {
   const { data: navItems = initialCategories } = useCategories();
   const {setFilterState} = useContext(ProductFilterContext)
   const confirmCategorySelection=(categoryValue:string)=>{
    setFilterState((prev)=>({...prev,
      categoryText:categoryValue
    }))
   }
  return (
    <div className="absolute top-[30px] left-0">
        <ul 
          className=" bg-white rounded-md shadow-primaryDark py-1 border"
        >
          <li
              className="w-full text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
              onClick={(()=>confirmCategorySelection("Category"))}
            >
              Category
            </li>
          {navItems.map((item:Category, index:number) => (
            <li
              key={index}
              className="w-full text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
              onClick={(()=>confirmCategorySelection(item.category_name))}
            >
              {item.category_name}
            </li>
          ))}
        </ul>
    </div>
  );
};
export default CategoriesSelection;