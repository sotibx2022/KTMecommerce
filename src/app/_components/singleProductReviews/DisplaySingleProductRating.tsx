"use client"
import React from "react";
import StarRatings from "react-star-ratings";
interface Rating{
  rating:number
  stars?:number
  size?:string
}
const DisplaySingleProductRating:React.FC<Rating>= ({ rating,stars,size }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="gold"
      numberOfStars={stars?stars:5}
      starDimension={size === "small" ? "15px":"30px"}
      starSpacing="5px"
    />
  );
};
export default DisplaySingleProductRating;
