import { LayoutGrid, List } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { SearchContext } from './AdvanceSearchContext';
const ProductsLayout = () => {
     const {searchValues,setSearchValues} = useContext(SearchContext)
  const toggleLayout = () => {
    setSearchValues((prev)=>({...prev,layout:prev.layout==="grid"?"list":"grid"}));
  };
  return (
        <div className="gridvsListLayout">
  <button 
        onClick={toggleLayout}
        className="p-2 rounded-lg hover:bg-primaryLight transition-colors shadow-helper"
        aria-label={`Switch to ${searchValues.layout === 'grid' ? 'list' : 'grid'} view`}
      >
        {searchValues.layout === 'grid' ? (
          <LayoutGrid className="h-6 w-6 text-helper" />
        ) : (
          <List className="h-6 w-6 text-helper" />
        )}
      </button>
</div>
  )
}
export default ProductsLayout