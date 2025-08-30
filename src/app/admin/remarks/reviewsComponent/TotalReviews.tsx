"use client"
import dynamic from "next/dynamic";
import React from "react";
const DisplaySingleProductRating = dynamic(
  () => import('@/app/_components/singleProductReviews/DisplaySingleProductRating'),
  { ssr: false }
);
interface ITotalReviewsProps {
  totalRemarks: number | undefined,
  averageRating: number | undefined,
  theme:string,
}
const TotalReviews: React.FC<ITotalReviewsProps> = ({ totalRemarks, averageRating,theme }) => {
  const isLoading = totalRemarks === undefined || averageRating === undefined;
  if (isLoading) {
    return (
      <div className="rounded-lg p-6 max-w-[500px] shadow-primaryLight mb-4" >
        <div className="h-6 w-32 mb-2 rounded-md animate-pulse text-primaryLight"  />
        <div className="h-10 w-16 rounded-md animate-pulse text-primaryLight"  />
        <div className="mt-3 flex flex-col gap-2 text-primaryDark">
          <div className="h-4 w-24 rounded-md animate-pulse text-helper"  />
          <div className="h-4 w-32 rounded-md animate-pulse text-helper"  />
        </div>
      </div>
    );
  }
  return (
    <div className="text-primaryDark rounded-lg p-6 shadow-primaryLight max-w-[500px]" >
       <h1 className={`${theme === 'dark' ? 'text-background' : 'text-primaryDark'} text-xl`}>Total Reviews</h1>
      <p className="primaryHeading">{totalRemarks}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className={theme==="dark"?"text-white":"text-primaryDark"}>Average Rating:</span>
        <DisplaySingleProductRating rating={averageRating} />
      </div>
    </div>
  );
};
export default TotalReviews;
