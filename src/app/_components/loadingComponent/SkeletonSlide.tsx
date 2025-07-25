import React from 'react';
import "../loadingComponent/loading.css";
const SkeletonSlide = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className='bg-primaryLight animate-pulse h-[250px] rounded-md'>
      </div>
      <div className="w-full">
        <div className="h-4 w-3/4 bg-primaryLight rounded animate-pulse mb-2 mx-auto"></div>
        <div className="h-4 w-1/2 bg-helper rounded animate-pulse mx-auto"></div>
      </div>
    </div>
  );
};
export default SkeletonSlide;
