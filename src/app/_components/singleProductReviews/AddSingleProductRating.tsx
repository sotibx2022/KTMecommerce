"use client"
import React, { useState } from "react";
import StarRatings from "react-star-ratings";
interface IAddSingleProductRating{
  getProductRating:(rating:number)=>void;
}
const AddSingleProductRating:React.FC<IAddSingleProductRating> = ({getProductRating}) => {
  const [rating, setRating] = useState(0);
  const handleRatingChange = (newRating:number) => {
    setRating(newRating);
    getProductRating(newRating)
  };
  return (
    <StarRatings
      rating={rating}
      starRatedColor="gold"
      changeRating={handleRatingChange}
      numberOfStars={5}
      starDimension="30px"
      starSpacing="5px"
    />
  );
};
export default AddSingleProductRating;
