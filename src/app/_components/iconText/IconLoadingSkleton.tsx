import React from 'react'
const IconLoadingSkleton = () => {
  return (
    <div><div className="relative flex flex-col items-center justify-center p-1 rounded-lg border border-[var(--primaryLight)] w-[60px]">
      {/* Icon skeleton */}
      <div className="bg-[var(--primaryLight)] bg-opacity-20 rounded-full w-8 h-8 animate-pulse" />
      {/* Text skeleton */}
      <div className="bg-[var(--primaryLight)] bg-opacity-20 rounded-full w-12 h-4 mt-1 animate-pulse" />
    </div></div>
  )
}
export default IconLoadingSkleton