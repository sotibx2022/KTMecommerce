"use client"
import React from 'react'
interface IBannerHeading{
  text1:string;
  text2:string;
}
const BannerHeading:React.FC<IBannerHeading> = ({ text1, text2 }) => {
  return (
    <div className='flex-center flex flex-col justify-center items-center  mb-1 font-bold'>
      <h1 className='inline-block bg-gradient-to-r text-xl sm:text-4xl from-primaryDark to-primaryLight text-transparent bg-clip-text'>
        {text1}
      </h1>
      <h1 className='inline-block bg-gradient-to-r text-lg sm:text-xl from-helper to-[#f38d07] text-transparent bg-clip-text uppercase tracking-wider'>
        {text2}
      </h1>
    </div>
  )
}
export default BannerHeading