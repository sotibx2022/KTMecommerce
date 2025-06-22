import React from 'react';
const RemarksSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-center animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="w-full md:w-[48%] lg:w-[31%] bg-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
          </div>
          <div className="mt-4 flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default RemarksSkeleton;