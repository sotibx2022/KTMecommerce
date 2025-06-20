import React, { useContext } from 'react';
import { ISubCategoryData, useSubCategory } from '@/app/hooks/queryHooks/useSubCategory';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { Category } from '@/app/types/categories';
import { SearchContext } from '@/app/context/AdvanceSearchContext';
const SubCategoriesSelection = () => {
  const context = useContext(SearchContext);
      if (!context) {
          throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
      }
      const {searchValues,setSearchValues} = context
  const {data:subCategoreis, isPending} = useSubCategory(searchValues.categoryValue)
  return (
    <div className='w-full'>
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