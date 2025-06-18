import React, { useContext } from 'react';
import { SearchContext } from './AdvanceSearchContext';
import { useCategories } from '@/app/hooks/queryHooks/useCategory';
import { Select, SelectContent, SelectValue,SelectItem,SelectTrigger } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react'; // Import an icon
import { Category } from '@/app/types/categories';
const CategorySelection = () => {
  const { data: categories, isPending } = useCategories();
  const { searchValues, setSearchValues } = useContext(SearchContext);
  return (
    <div className='w-[200px]'>
      <Select 
        value={searchValues.categoryValue}
        onValueChange={(value) => setSearchValues(prev => ({
          ...prev, 
          categoryValue: value
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