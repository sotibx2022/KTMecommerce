"use client"
import SubCategoriesSelection from './SubCategorySelection';
import PriceSelection from './PriceSelection';
import RatingSelection from './RatingSelection';
import HighLightSelection from './HighLightSelection';
import CategorySelection from './CategorySelection';
import ProductsLayout from './ProductsLayout';
const AdvanceSearch = () => {
  return (
    <div className='hidden lg:flex container w-full justify-between my-4 gap-4  items-center shadow-primaryLight p-2'>
       <CategorySelection />
      <SubCategoriesSelection />
      <PriceSelection />
      <RatingSelection />
      <HighLightSelection />
      <ProductsLayout/>
    </div>
  )
}
export default AdvanceSearch