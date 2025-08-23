import React, { useContext } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { ProductFilterContext } from '@/app/context/ProductFilterContext';
const ProductHighLightSelection = () => {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error('ProductHighLightSelection must be used within a ProductFilterContext Provider');
  }
  const { filterState, setFilterState } = context;
  return (
    <div className="w-full absolute top-[30px] left-0 selectAbleTableHead">
      <Select
        onValueChange={(
          value:
            | "isNewArrival"
            | "isTrendingNow"
            | "isTopSell"
            | "isOfferItem"
            | "isRegular"
            | "Select"
        ) =>
          setFilterState((prev) => ({
            ...prev,
            highlights: value,
          }))
        }
      >
        <SelectTrigger>
          <Select>{filterState.highlights || "Select"}</Select>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="isNewArrival">New Arrival</SelectItem>
          <SelectItem value="isOfferItem">Offer Item</SelectItem>
          <SelectItem value="isTrendingNow">Trending</SelectItem>
          <SelectItem value="isTopSell">Top Sell</SelectItem>
          <SelectItem value="isRegular">Regular</SelectItem>
          <SelectItem value="Select">Normal</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default ProductHighLightSelection;
