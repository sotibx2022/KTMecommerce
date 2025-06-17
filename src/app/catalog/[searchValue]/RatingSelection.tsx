import React from 'react';
interface IRatingSelectionProps {
  initialRatingOrder: string;
}
const RatingSelection: React.FC<IRatingSelectionProps> = ({ 
  initialRatingOrder 
}) => {
  return (
    <div>{initialRatingOrder}</div>
  );
};
export default RatingSelection;