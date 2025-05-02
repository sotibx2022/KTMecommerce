import React from 'react'
import DisplaySingleProductRating from './DisplaySingleProductRating'
import { DateFormator, shortName } from '@/app/services/helperFunctions/functions'
import { IAddReviewDatas, IDisplayReviewDatas } from '@/app/types/remarks'
const SingleProductReviews:React.FC<IDisplayReviewDatas> = ({reviewedBy,reviewerImage,rating,reviewDescription,createdAt,updatedAt}) => {
  return (
    <div className="remarks-container">
    <div className="remark-item" id="remark-1">
      <div className="reviewer-details flex items-center gap-4 mb-4">
        <img
          src={reviewerImage ? reviewerImage : shortName(reviewedBy.fullName)}
          alt="Reviewer Image"
          className="reviewer-image w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="reviewer-name text-lg font-semibold text-primaryDark">{reviewedBy.fullName}</h3>
          <p className="review-date text-sm text-primaryLight">Reviewed on: {DateFormator(createdAt)}</p>
          <p className="review-date text-sm text-primaryLight">Updated on: {DateFormator(updatedAt)}</p>
        </div>
      </div>
      <div className="review-content">
        <DisplaySingleProductRating rating={parseInt(rating)}/>
        <p className="review-description primaryParagraph">
          {reviewDescription}
        </p>
      </div>
    </div>
  </div>
  )
}
export default SingleProductReviews