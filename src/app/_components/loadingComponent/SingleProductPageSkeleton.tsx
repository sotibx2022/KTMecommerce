import React from "react";
import LoadingComponent from "./LoadingComponent";
const SingleProductPageSkeleton = () => {
  return (
    <div className="container animate-pulse">
      <LoadingComponent/>
      <div className="flex-col md:flex-row flex justify-between items-center py-4 gap-4 min-h-[50vh]">
        {/* Left side - Product details */}
        <div className="singleProductLeft md:w-1/2 w-full space-y-4">
          {/* Product title */}
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="h-5 bg-gray-200 rounded w-24"></div>
          </div>
          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          {/* Product details */}
          <div className="productDetails flex items-center gap-4 my-2">
            <div className="h-8 bg-gray-200 rounded-md w-24"></div>
            <div className="h-8 bg-gray-200 rounded-md w-20"></div>
            <div className="h-8 bg-gray-200 rounded-md w-16"></div>
          </div>
          {/* Features title */}
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          {/* Features list */}
          <ul className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <li key={i} className="flex items-center gap-1">
                <div className="h-4 bg-gray-200 rounded w-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </li>
            ))}
          </ul>
        </div>
        {/* Right side - Product image */}
        <div className="md:w-1/2 h-auto">
          <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
      {/* Action buttons */}
      <div className="productActions flex gap-4 my-4 items-center justify-center md:justify-start">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
        ))}
      </div>
      {/* Potential message area */}
      <div className="h-12 bg-gray-100 rounded"></div>
    </div>
  );
};
export default SingleProductPageSkeleton;