"use client";
import React from "react";
import StarRatings from "react-star-ratings";
interface Rating {
  rating: number;
  onClick: () => void; // Function type for the onClick prop
}
const ProductByRating: React.FC<Rating> = ({ rating, onClick }) => {
  return (
    <div
      className="flex justify-between items-center border-b-2 border-helper border-dotted h-[40px] my-4 cursor-pointer"
      onClick={onClick} // Attach the onClick handler here
    >
      <StarRatings
        rating={rating}
        starRatedColor="gold"
        numberOfStars={rating}
        starDimension="30px"
        starSpacing="5px"
      />
      {rating < 5 && <p className="text-helper font-extrabold">And Up</p>}
    </div>
  );
};
export default ProductByRating;
