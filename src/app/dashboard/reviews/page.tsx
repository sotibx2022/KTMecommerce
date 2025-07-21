"use client"
import { format } from 'date-fns';
import { getSpecificRemarksofUser } from '@/app/services/queryFunctions/remarks'
import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import Image from 'next/image';
import { IRemarksBase } from '@/app/types/remarks';
import LinkComponent from '@/app/_components/linkComponent/LinkComponent';
import DisplaySingleProductRating from '@/app/_components/singleProductReviews/DisplaySingleProductRating';
import ReviewActionButtons from '@/app/_components/singleProductReviews/ReviewActionButtons';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
const Page = () => {
  const { userDetails } = useUserDetails();
  const userId = userDetails?._id;
  const { data: remarks, isPending } = useQuery({
    queryKey: ['specificUserRemarks', userId],
    queryFn: () => getSpecificRemarksofUser(userId!),
    enabled: !!userId
  });
  const remarksData = remarks?.success ? remarks.data : null;
  console.log(remarksData);
  if (isPending) {
    return <LoadingComponent />
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primaryDark mb-8">Your Reviews</h1>
      {remarksData && remarksData.length > 0 ? (
        <div className="space-y-6">
          {remarksData.map((remark: IRemarksBase, index: number) => (
            <div key={index} className="bg-background rounded-lg shadow-primaryLight p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primaryDark border-b border-helper pb-2">Review Details</h3>
                <div className="flex flex-col gap-2 mb-2">
                    <DisplaySingleProductRating rating={parseInt(remark.rating)} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-primaryDark mb-1">Review Description</h4>
                  <p className="text-primaryDark">{remark.reviewDescription}</p>
                </div>
                <div className="text-sm text-primaryLight">
                  <span className='font-bold'>Created :</span> {format(remark.createdAt!, 'MMM dd, yyyy')}
                  {remark.updatedAt && remark.updatedAt !== remark.createdAt && (
                    <span className="ml-2">(<span className='font-bold'>Updated :</span> {format(remark.updatedAt, 'MMM dd, yyyy')})</span>
                  )}
                </div>
              </div>
              <div className="space-y-4 mt-6">
                <h3 className="text-lg font-semibold text-primaryDark border-b border-helper pb-2">Reviewed For</h3>
                <img
                  src={remark.productIdentifier.productImage}
                  alt={remark.productIdentifier.productId}
                  className="w-32 h-32 object-contain border rounded-lg border-helper/20"
                />
                <div className='text-lg font-semibold text-primaryDark'>
                  <LinkComponent
                    href={`/singleProduct/id:${remark.productIdentifier.productId}&slug:${remark.productIdentifier.productName}`}
                    text={remark.productIdentifier.productName}
                  />
                </div>
              </div>
              <div className="mt-6">
                <ReviewActionButtons
                  productIdentifier={{
                    productId: remark.productIdentifier.productId.toString(),
                    productName: remark.productIdentifier.productName,
                    productImage: remark.productIdentifier.productImage
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl text-helper">No reviews found</h3>
          <p className="text-red-500 mt-2">You haven't received any reviews yet.</p>
        </div>
      )}
    </div>
  );
};
export default Page;