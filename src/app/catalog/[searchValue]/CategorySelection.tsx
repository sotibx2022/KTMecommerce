import React, { useContext } from 'react';
import { SearchContext } from './AdvanceSearchContext';

const CategorySelection = () => {
  const { searchValues } = useContext(SearchContext);

  return (
    <div>{searchValues.categoryValue}</div>
  );
};

export default CategorySelection;