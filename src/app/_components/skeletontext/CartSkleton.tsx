import React from "react";
const CartSkeleton = () => {
  return (
    <div className="cartDetailsWrapper flex flex-col gap-4">
      {/* Compact Cart Table Skeleton (2 columns) */}
      <div className="bg-background shadow-helper flex-1">
        <div className="bg-primaryDark text-white h-[40px] flex items-center px-4">
          <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse ml-4"></div>
        </div>
        <div className="divide-y divide-helper">
          {[1, 2].map((item) => (
            <div key={item} className="flex items-center p-3 hover:bg-primaryLight">
              <div className="w-1/2 flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded animate-pulse mr-3"></div>
                <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
              </div>
              <div className="w-1/2 flex justify-end space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Compact Cart Summary Skeleton (3 items) */}
      <div className="CartSummary flex flex-col gap-1 w-full md:w-[300px]">
        <h2 className="subHeading h-5 bg-gray-300 rounded animate-pulse mb-2"></h2>
        <div className="summaryLine flex justify-between items-center py-1">
          <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="summaryLine flex justify-between items-center py-1">
          <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          <div className="h-3 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        </div>
        <div className="summaryLine flex justify-between items-center py-1">
          <div className="h-3 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
export default CartSkeleton;