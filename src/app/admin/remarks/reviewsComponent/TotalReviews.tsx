"use client"
import dynamic from "next/dynamic";
import React from "react";
const DisplaySingleProductRating = dynamic(
  () => import('@/app/_components/singleProductReviews/DisplaySingleProductRating'),
  { ssr: false }
);
interface ITotalReviewsProps {
  totalRemarks: number | undefined,
  averageRating: number | undefined
}
const TotalReviews: React.FC<ITotalReviewsProps> = ({ totalRemarks, averageRating }) => {
  const isLoading = totalRemarks === undefined || averageRating === undefined;
  if (isLoading) {
    return (
      <div className="rounded-lg p-6 w-64" style={{ background: "var(--primaryLight)" }}>
        <div className="h-6 w-32 mb-2 rounded-md animate-pulse" style={{ background: "var(--primaryDark)" }} />
        <div className="h-10 w-16 rounded-md animate-pulse" style={{ background: "var(--primary)" }} />
        <div className="mt-3 flex flex-col gap-2">
          <div className="h-4 w-24 rounded-md animate-pulse" style={{ background: "var(--primaryDark)" }} />
          <div className="h-4 w-32 rounded-md animate-pulse" style={{ background: "var(--helper)" }} />
        </div>
      </div>
    );
  }
  return (
    <div className="text-primaryDark rounded-lg p-6 shadow-primaryLight" >
      <h3 className="secondaryHeading">Total Reviews</h3>
      <p className="primaryHeading">{totalRemarks}</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="primaryParagraph">Average Rating:</span>
        <DisplaySingleProductRating rating={averageRating} />
      </div>
    </div>
  );
};
export default TotalReviews;
