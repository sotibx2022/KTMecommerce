// components/SearchBarSkeleton.js
import React from 'react'
const SearchBarSkeleton = () => {
  return (
    <div className='container flex justify-between items-center gap-4 my-4 flex-wrap animate-pulse'>
      {/* Logo Skeleton */}
      <div className='w-[150px] h-[50px] bg-gray-200 rounded'></div>
      {/* Search Area Skeleton */}
      <div className="searchArea flex gap-2">
        {/* Input Skeleton */}
        <div className="relative">
          <div className='min-w-[300px] h-10 bg-gray-200 rounded'></div>
          <div className="w-5 h-5 absolute top-1/2 left-[10px] -translate-y-1/2 bg-gray-300 rounded-full"></div>
        </div>
        {/* Buttons Skeleton */}
        <div className="searchBarButtons flex gap-2 items-center">
          <div className='w-20 h-10 bg-gray-200 rounded'></div>
          <div className='w-10 h-10 bg-gray-200 rounded'></div>
        </div>
      </div>
      {/* Icon Group Skeleton */}
      <div className="flex gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className='w-8 h-8 bg-gray-200 rounded-full'></div>
        ))}
      </div>
    </div>
  )
}
export default SearchBarSkeleton