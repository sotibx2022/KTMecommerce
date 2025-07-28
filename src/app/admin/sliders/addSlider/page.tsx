"use client"
import React, { useState } from 'react'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import SingleSliderItem from './addSliderComponents/SingleSliderItem'
const page = () => {
  function submitHandler(): void {
    throw new Error('Function not implemented.')
  }
  return (
    <div className='container w-full h-full  flex-col gap-4 my-4'>
      <div className="imagePlaceholdersWrapper flex flex-wrap justify-between w-full">
          <SingleSliderItem />
      </div>
    </div>
  )
}
export default page