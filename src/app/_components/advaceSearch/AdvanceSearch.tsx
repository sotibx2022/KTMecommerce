import React from 'react'
import ProductByRating from "./ProductByRating";
import SearchByCategory from "./SearchByCategory"
import SearchByBrand from './SearchByBrand';
import SearchByPrice from './SearchByPrice';
import SearchBySubCategory from './SearchBySubCategory';
const AdvanceSearch = () => {
  return (
    <div className="bg-primaryLight p-6 rounded-lg shadow-md min-w-[300px] h-[800px]">
  <h2 className="text-xl font-semibold text-primaryDark mb-4">Advanced Search</h2>
  <SearchByCategory/>
  <SearchBySubCategory/>
  <SearchByBrand/>
  <SearchByPrice/>
  <ProductByRating rating={5}/>
      <ProductByRating rating={4}/> 
      <ProductByRating rating={3}/> 
      <ProductByRating rating={2}/> 
      <ProductByRating rating={1}/> 
</div>
  )
}
export default AdvanceSearch