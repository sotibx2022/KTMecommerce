"use client";
import React from "react";
import StarRatings from "react-star-ratings";
const ProductByRating  = () => {
  return (
    <div
      className="flex justify-between items-center border-b-2 border-helper border-dotted h-[40px] my-4 cursor-pointer"
    >
      <StarRatings
        rating={5}
        starRatedColor="gold"
        numberOfStars={5}
        starDimension="30px"
        starSpacing="5px"
      />
       <p className="text-helper font-extrabold">And Up</p>
    </div>
  );
};
export default ProductByRating;
