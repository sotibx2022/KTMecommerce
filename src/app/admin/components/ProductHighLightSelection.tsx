import React, { useContext } from 'react';
import { ProductFilterContext } from '@/app/context/ProductFilterContext';
const highlightOptions = [
  { id: 'isNewArrival', label: 'New Arrival' },
  { id: 'isTrendingNow', label: 'Trending' },
  { id: 'isTopSell', label: 'Top Sell' },
  { id: 'isOfferItem', label: 'Offer Item' },
  { id: 'isRegular', label: 'Regular' },
];
const ProductHighLightSelection = () => {
  const context = useContext(ProductFilterContext);
  if (!context) {
    throw new Error('ProductHighLightSelection must be used within a ProductFilterContext Provider');
  }
  const { filterState, setFilterState } = context;
  const confirmHighlightSelection = (highlightValue: string) => {
    setFilterState((prev) => ({
      ...prev,
      highlights: highlightValue,
    }));
  };
  return (
    <div className="absolute top-[30px] left-0 w-full selectAbleTableHead">
      <ul className="py-1 bg-inherit shadow-primaryLight">
        <li
          className="w-full text-left p-4 hover:bg-backgroundLight cursor-pointer"
          onClick={() => confirmHighlightSelection('Select')}
        >
          Normal
        </li>
        {highlightOptions.map((option) => (
          <li
            key={option.id}
            className="w-full text-left p-4 hover:bg-backgroundLight cursor-pointer"
            onClick={() => confirmHighlightSelection(option.id)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ProductHighLightSelection;
