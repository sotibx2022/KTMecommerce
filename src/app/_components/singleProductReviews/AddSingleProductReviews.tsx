import React from 'react'
import AddSingleProductRating from './AddSingleProductRating'
import PrimaryButton from '../primaryButton/PrimaryButton'
const AddSingleProductReviews = () => {
  return (
    <div className='w-full lg:w-1/2 flex flex-col gap-2'>
        <h1 className='text-lg font-semibold text-primaryDark'>Add Review</h1>
        <input type='text' placeholder='FullName' className='formItem'/>
        <input type='text' placeholder='email' className='formItem'/>
        <textarea
  placeholder="Product Review.....Maximum 100 words"
  className="formItem"/>
        <AddSingleProductRating/>
        <PrimaryButton searchText='Add'/>
    </div>
  )
}
export default AddSingleProductReviews