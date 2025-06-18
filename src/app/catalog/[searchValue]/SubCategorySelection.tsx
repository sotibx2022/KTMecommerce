import React, { useContext } from 'react';
import { SearchContext } from './AdvanceSearchContext';
const SubCategoriesSelection = () => {
  const { searchValues } = useContext(SearchContext);
  return (
    <div>Subcategory: {searchValues.subCategoryValue}</div>
  );
};
export default SubCategoriesSelection;