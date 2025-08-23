import { ProductFilterContext } from '@/app/context/ProductFilterContext';
import { useInitialCategories } from '@/app/data/categoriesData';
import { Category } from '@/app/types/categories';
import { useContext, useState } from 'react';
const CategoriesSelection = () => {
  const { data: initialCategories } = useInitialCategories();
  const { setFilterState } = useContext(ProductFilterContext)
  const confirmCategorySelection = (categoryValue: string) => {
    setFilterState((prev) => ({
      ...prev,
      categoryText: categoryValue
    }))
  }
  const navItems = initialCategories?.data ? initialCategories.data : []
  return (
    <div className="absolute top-[30px] left-0">
      <ul
        className="py-1"
      >
        <li
          className="w-full text-left p-4 hover:bg-backgroundLight cursor-pointer"
          onClick={(() => confirmCategorySelection("Category"))}
        >
          Category
        </li>
        {navItems.map((item: Category, index: number) => (
          <li
            key={index}
            className="w-full text-left p-4 hover:bg-backgroundLight  cursor-pointer"
            onClick={(() => confirmCategorySelection(item.category_name))}
          >
            {item.category_name}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CategoriesSelection;