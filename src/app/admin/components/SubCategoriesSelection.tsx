"use client"
import SkletonText from '@/app/_components/skeletontext/SkletonText';
import { ProductFilterContext } from '@/app/context/ProductFilterContext';
import { useSubCategory } from '@/app/hooks/queryHooks/useSubCategory';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Menu } from 'lucide-react';
import { useContext } from 'react';
const SubCategoriesSelection = () => {
  const { filterState, setFilterState } = useContext(ProductFilterContext);
 const {data:subCategories,isPending:subCategoriesPending} = useSubCategory(filterState.categoryText)
  const onSelectionOfSubCategory = (subCategoryValue: string) => {
    setFilterState((prev) => ({...prev, subCategoryText: subCategoryValue}))
  }
  const subCategoryLoading = subCategoriesPending && filterState.categoryText !== "Category";
  return (
    <div className="absolute top-[30px] left-0">
      {subCategoryLoading ? (
        <ul className="bg-background rounded-md shadow-primaryDark p-2 flex flex-col gap-2">
          {Array.from({length: 4}).map((_, index) => (
            <SkletonText key={index} />
          ))}
        </ul>
      ) : (
        <ul className="bg-background rounded-md shadow-primaryDark py-1">
          <li 
            className="w-full text-left p-4 hover:bg-primaryLight hover:text-background cursor-pointer" 
            onClick={() => onSelectionOfSubCategory("Item")}
          >
            Item
          </li>
          {subCategories?.success && subCategories.data?.subcategories.map((item, index) => (
            <li 
              className="w-full text-left p-4 hover:bg-primaryLight hover:text-background cursor-pointer" 
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