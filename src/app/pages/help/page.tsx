"use client"
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide'
import React from 'react'
const Page = () => {
  return (
    <div className='container flex justify-between'>
      {[...Array(3)].map((_, i) => (
        <SkeletonSlide key={`skeleton-${i}`} />
      ))}
    </div>
  )
}
export default Page