"use client"
import React from 'react';
const FooterSkeleton = () => {
  // Mock data structure to match your actual footer layout
  const mockCategories = Array(5).fill(null);
  const mockSubcategories = Array(3).fill(null);
  return (
    <div className="container border-t border-primaryLight">
      <ul className="categories flex flex-wrap justify-between gap-4 mt-4">
        {mockCategories.map((_, index) => (
          <li key={`category-${index}`} className="flex flex-col w-[180px]">
            {/* Category Header Skeleton */}
            <div className="categoryHeader flex justify-between items-center">
              <div className="h-6 w-3/4 bg-gray-300 rounded animate-pulse"></div>
            </div>
            {/* Subcategories Skeleton */}
            <ul className="flex flex-col gap-2 pt-3">
              {mockSubcategories.map((_, subIndex) => (
                <li key={`subcategory-${index}-${subIndex}`} className="text-md">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FooterSkeleton;