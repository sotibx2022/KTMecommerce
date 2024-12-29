"use client";
import { AdvanceSearchContext } from "@/app/context/AdvanceSearchContext";
import React, { useContext } from "react";
import StarRatings from "react-star-ratings";
// Define the interface for props
interface ProductRating {
  rating: number;
}
// Define the ProductByRating component that accepts a rating prop
const ProductByRating: React.FC<ProductRating> = ({ rating }) => {
  const context = useContext(AdvanceSearchContext);
  if(!context){
    throw new Error("the context is undefined.")
  }
  const {setAdvanceSearchValues} = context;
  return (
    <div className="flex justify-between items-center border-b-2 border-helper border-dotted h-[40px] my-4 cursor-pointer"
    onClick={() => setAdvanceSearchValues((prev) => ({
      ...prev, 
      rating: rating.toString()  // Only update the rating, keep other properties intact
    }))}>
      <StarRatings
        starRatedColor="gold"
        numberOfStars={5} // Always set to 5 stars for the component
        rating={rating}   // The actual rating will be passed as a prop
        starDimension="30px"
        starSpacing="5px"
      />
      {rating<5 && <p className="text-helper font-extrabold">And Up</p>}
    </div>
  );
};
export default ProductByRating;
