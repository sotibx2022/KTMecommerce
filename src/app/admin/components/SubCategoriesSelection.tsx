"use client"
import SkletonText from '@/app/_components/skeletontext/SkletonText';
import { ProductFilterContext } from '@/app/context/ProductFilterContext';
import { useSubCategory } from '@/app/hooks/queryHooks/useSubCategory';
import { useContext } from 'react';
const SubCategoriesSelection = () => {
  const { filterState, setFilterState } = useContext(ProductFilterContext);
  const { data: subCategories, isPending: subCategoriesPending } = useSubCategory(filterState.categoryText)
  const onSelectionOfSubCategory = (subCategoryValue: string):void => {
    setFilterState((prev) => ({ ...prev, subCategoryText: subCategoryValue }))
  }
  const subCategoryLoading = subCategoriesPending && filterState.categoryText !== "Category";
  return (
    <div className="absolute top-[30px] left-0">
      {subCategoryLoading ? (
        <ul className="p-2 bg-inherit shadow-primaryLight">
          {Array.from({ length: 4 }).map((_, index) => (
            <span key={index} className='bg-primaryLight animate-pulse' ></span>
          ))}
        </ul>
      ) : (
        <ul className="py-1">
          <li
            className="w-full text-left p-4 hover:bg-backgroundLight cursor-pointer"
            onClick={() => onSelectionOfSubCategory("Item")}
          >
            Item
          </li>
          {subCategories?.success && subCategories.data?.subcategories.map((item, index) => (
            <li
              className="w-full text-left p-4 hover:bg-backgroundLight cursor-pointer"
              key={index}
              onClick={() => onSelectionOfSubCategory(item.category_name)}
            >
              {item.category_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SubCategoriesSelection;