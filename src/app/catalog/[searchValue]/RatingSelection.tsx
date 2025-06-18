import React, { useContext } from 'react';
import { SearchContext } from './AdvanceSearchContext';
const RatingSelection = () => {
  const { searchValues } = useContext(SearchContext);
  return (
    <div>Rating Order: {searchValues.ratingOrder}</div>
  );
};
export default RatingSelection;