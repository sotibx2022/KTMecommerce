"use client"
import React, { useContext } from 'react';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
import { Select, SelectContent, SelectItem,SelectTrigger } from '@/components/ui/select';
import { Category } from '@/app/types/categories';
import { SearchContext } from '@/app/context/AdvanceSearchContext';
const CategorySelection = () => {
  const { data: categories, isPending } = useCategories();
 const context = useContext(SearchContext);
     if (!context) {
         throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
     }
     const {searchValues,setSearchValues} = context
  return (
    <div className='w-full'>
      <Select 
        value={searchValues.categoryValue}
        onValueChange={(value) => setSearchValues(prev => ({
          ...prev, 
          categoryValue: value,
          subCategoryValue:'subCategory'
        }))}
      >
        <SelectTrigger>
         <Select>{isPending ? "Loading":searchValues.categoryValue}</Select>
        </SelectTrigger>
        <SelectContent>
          {categories?.map((category: Category, index: number) => (
            <SelectItem value={category.category_name} key={index}>
              {category.category_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default CategorySelection;