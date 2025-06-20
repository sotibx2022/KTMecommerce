import React, { useContext } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { SearchContext } from '@/app/context/AdvanceSearchContext';
const HighLightSelection = () => {
 const context = useContext(SearchContext);
     if (!context) {
         throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
     }
     const {searchValues,setSearchValues} = context
     console.log(searchValues.highlightedValues);
  return (
    <div className='w-full'>
      <Select
        onValueChange={(value: "New Arrival" | "Offer Item" | "Top Sell" | "Trending Item" | "Regular"|"Select") => 
  setSearchValues(prev => ({
    ...prev,
    highlightedValues: value
  }))
}
      >
        <SelectTrigger>
          <Select>{searchValues.highlightedValues}</Select>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New Arrival">New Arrival</SelectItem>
          <SelectItem value="Offer Item">Offer Item</SelectItem>
          <SelectItem value="Trending Item">Trending</SelectItem>
          <SelectItem value="Top Sell">Top Sell</SelectItem>
          <SelectItem value="Regular">Regular</SelectItem>
          <SelectItem value="Select">Normal</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default HighLightSelection;