import React, { useContext } from 'react';
import { SearchContext } from './AdvanceSearchContext';
const HighLightSelection = () => {
  const { searchValues } = useContext(SearchContext);
  const highlightStatus = {
    isOfferItem: searchValues.highlightedValues === 'isOfferItem',
    isTrendingItem: searchValues.highlightedValues === 'isTrendingNow',
    isNewArrival: searchValues.highlightedValues === 'isNewArrival',
    isTopSell: searchValues.highlightedValues === 'isTopSell',
    isRegular: searchValues.highlightedValues === 'isRegular'
  };
  return (
    <div>
      <div>Offer: {highlightStatus.isOfferItem ? 'Yes' : 'No'}</div>
      <div>Trending: {highlightStatus.isTrendingItem ? 'Yes' : 'No'}</div>
      <div>New Arrival: {highlightStatus.isNewArrival ? 'Yes' : 'No'}</div>
      <div>Top Sell: {highlightStatus.isTopSell ? 'Yes' : 'No'}</div>
      <div>Regular: {highlightStatus.isRegular ? 'Yes' : 'No'}</div>
    </div>
  );
};
export default HighLightSelection;