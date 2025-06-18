import React, { useContext } from 'react';
import { SearchContext } from './AdvanceSearchContext';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
const HighLightSelection = () => {
  const { searchValues, setSearchValues } = useContext(SearchContext);
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
          <Select>{searchValues.highlightedValues}</Select>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="isNewArrival">New Arrival</SelectItem>
          <SelectItem value="isOfferItem">Offer Item</SelectItem>
          <SelectItem value="isTrendingItem">Trending</SelectItem>
          <SelectItem value="isTopSell">Top Sell</SelectItem>
          <SelectItem value="isRegular">Regular</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default HighLightSelection;