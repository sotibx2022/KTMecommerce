"use client"
import dynamic from "next/dynamic";
import React from "react";
const DisplaySingleProductRating = dynamic(
  () => import('@/app/_components/singleProductReviews/DisplaySingleProductRating'),
  { ssr: false }
);
const TotalReviews = () => {
  const totalReviews = 1256;
  const averageRating = 4.3; // out of 5
  return (
    <div className=" text-primaryDark rounded-lg p-6 w-64">
      <h3 className="text-xl font-semibold mb-2">Total Reviews</h3>
      <p className="text-4xl font-bold">{totalReviews}</p>
      <div className=" mt-3">
        <span className="mr-2 text-sm font-medium">Average Rating:</span>
        <DisplaySingleProductRating rating={averageRating}/>
      </div>
    </div>
  );
};
export default TotalReviews;
