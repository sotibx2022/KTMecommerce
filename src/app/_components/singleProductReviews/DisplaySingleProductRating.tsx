"use client"
import React from "react";
import StarRatings from "react-star-ratings";
interface Rating{
  rating:number
}
const DisplaySingleProductRating:React.FC<Rating>= ({ rating }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="gold"
      numberOfStars={5}
      starDimension="30px"
      starSpacing="5px"
    />
  );
};
export default DisplaySingleProductRating;
