import React, { useContext } from 'react';
import { SearchContext } from './AdvanceSearchContext';
import { ISubCategoryData, useSubCategory } from '@/app/hooks/queryHooks/useSubCategory';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { Category } from '@/app/types/categories';
const SubCategoriesSelection = () => {
  const { searchValues,setSearchValues } = useContext(SearchContext);
  const {data:subCategoreis, isPending} = useSubCategory(searchValues.categoryValue)
  return (
    <div className='w-[200px]'>
     <Select 
        value={searchValues.categoryValue}
        onValueChange={(value) => setSearchValues(prev => ({
          ...prev, 
          subCategoryValue: value
        }))}
      >
        <SelectTrigger>
         <Select>{isPending ? "Loading":searchValues.subCategoryValue}</Select>
        </SelectTrigger>
        <SelectContent>
          {subCategoreis && subCategoreis.success && subCategoreis.data?.subcategories.map((category:ISubCategoryData, index: number) => (
            <SelectItem value={category.category_name} key={index}>
              {category.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select> 
    </div>
  );
};
export default SubCategoriesSelection;