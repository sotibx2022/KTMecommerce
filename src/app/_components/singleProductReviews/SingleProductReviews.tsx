"use client"
import React, { useContext } from 'react'
import DisplaySingleProductRating from './DisplaySingleProductRating'
import { DateFormator, shortName } from '@/app/services/helperFunctions/functions'
import { IAddReviewDatas, IDisplayReviewDatas } from '@/app/types/remarks'
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent'
import ReviewActionButtons from './ReviewActionButtons'
import { MessageSquare, Edit, Calendar, User } from 'lucide-react'
const SingleProductReviews: React.FC<IDisplayReviewDatas> = ({
  reviewedBy,
  reviewerImage,
  rating,
  reviewDescription,
  createdAt,
  updatedAt,
  productIdentifier
}) => {
  const { productId } = productIdentifier;
  const user = useContext(UserDetailsContext);
  const isCurrentUserReview = user?.userDetails?._id === reviewedBy.userId;
  return (
    <div className="border border-primaryLight/20 rounded-lg p-4 w-full max-w-[350px] hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 mb-4">
        {reviewerImage ? (
          <img
            src={reviewerImage}
            alt="Reviewer Image"
            className="w-12 h-12 rounded-full object-cover border-2 border-primaryLight/30"
          />
        ) : (
          <div className="inline-flex w-12 h-12 rounded-full border-2 border-primaryDark text-primaryDark bg-background justify-center items-center">
            <User className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-primaryDark">
              {reviewedBy.fullName}
            </h3>
            {isCurrentUserReview && (
              <ReviewActionButtons productIdentifier={productIdentifier} />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-primaryLight mt-1">
            <Calendar className="w-4 h-4" />
            <span>Reviewed on: {DateFormator(createdAt)}</span>
          </div>
          {updatedAt && createdAt !== updatedAt && (
            <div className="flex items-center gap-2 text-sm text-primaryLight mt-1">
              <Edit className="w-4 h-4" />
              <span>Updated on: {DateFormator(updatedAt)}</span>
            </div>
          )}
        </div>
      </div>
      <div className="space-y-3">
        <DisplaySingleProductRating rating={parseInt(rating)} />
        <div className="flex items-start gap-2">
          <MessageSquare className="w-5 h-5 mt-0.5 text-primaryLight flex-shrink-0" />
          <p className="text-primaryDark">
            {reviewDescription}
          </p>
        </div>
      </div>
    </div>
  )
}
export default SingleProductReviews