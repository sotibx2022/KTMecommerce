import dynamic from 'next/dynamic';  
import PrimaryButton from '../primaryButton/PrimaryButton';
import { useContext, useEffect, useState } from 'react';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IAddReviewDatas, IDisplayReviewDatas, IProductIdentifier, IUpdateRemarkAPIData} from '@/app/types/remarks';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import {getSpecificRemarksofUser, getSpecificReviewofProductbyUser, updateSingleProductReview } from '@/app/services/queryFunctions/remarks';
import toast from 'react-hot-toast';
import LoadingButton from '../primaryButton/LoadingButton';
import SkletonText from '../skeletontext/SkletonText';
const AddSingleProductRating = dynamic(() => import('./AddSingleProductRating'), { ssr: false });
const DisplaySingleProductRating = dynamic(() => import('./DisplaySingleProductRating'), { ssr: false });
interface EditSingleProductReviewProps{
  productIdentifier:IProductIdentifier
}
const EditSingleProductReview: React.FC<EditSingleProductReviewProps> = ({productIdentifier}) => {
  const queryClient = useQueryClient();
  const {productId,productName,productImage} = productIdentifier;
  const { setVisibleComponent } = useContext(DisplayContext);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  const userEmail = userDetails?.email;
  const updateMutation = useMutation<APIResponseSuccess | APIResponseError, Error, IUpdateRemarkAPIData>({
    mutationFn: updateSingleProductReview,
    onSuccess: async (response) => {
      toast.success(response.message);
      setVisibleComponent('');
      // Get current route context
      const isSingleProductPage = window.location.pathname.includes('/singleProduct');
      const isRemarksPage = window.location.pathname.includes('/reviews');
      // Invalidate queries based on current page context
      const invalidations = [];
      if (isSingleProductPage) {
        invalidations.push(
          queryClient.invalidateQueries({ 
            queryKey: ['specificRemarks', productId],
            refetchType: 'active' // Only refetch if currently being observed
          })
        );
      }
      if (isRemarksPage) {
        invalidations.push(
          queryClient.invalidateQueries({ 
            queryKey: ['specificUserRemarks', userEmail],
            refetchType: 'active'
          })
        );
      }
      // Always invalidate product data
      invalidations.push(
        queryClient.invalidateQueries({
          queryKey: ['specificProduct', productId],
          refetchType: 'active'
        })
      );
      await Promise.all(invalidations);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const { 
    register, 
    formState: { errors },
    handleSubmit,
    setValue 
  } = useForm<IAddReviewDatas>({ mode: 'onBlur' });
  const { data: remarks, isPending } = useQuery<
    APIResponseSuccess<IDisplayReviewDatas> | APIResponseError
  >({
    queryKey: ['specificRemark', userEmail, productId],
    queryFn: () => getSpecificReviewofProductbyUser(userEmail!, productId),
    enabled: !!userEmail && !!productId
  });
  useEffect(() => {
    if (isPending) {
      setValue('reviewedBy.fullName', 'Loading...');
      setValue('reviewedBy.email', 'Loading...');
      setValue('reviewDescription', 'Loading...');
      return;
    }
    if (remarks && remarks.success && remarks.data) {
      setValue('reviewedBy.fullName', isPending ? 'Loading ...' :remarks.data.reviewedBy.fullName);
      setValue('reviewedBy.email', isPending ? 'Loading ...' :remarks.data.reviewedBy.email);
      setValue('productIdentifier.productId', isPending ? 'Loading ...' :remarks.data.productIdentifier.productId);
      setValue('reviewDescription', isPending ? 'Loading ...' :remarks.data.reviewDescription);
      setValue('rating', remarks.data.rating);
      if (userDetails?.profileImage) {
        setValue('reviewerImage', userDetails.profileImage);
      }
    }
  }, [remarks, isPending, setValue, userDetails?.profileImage]);
  const receiveProductRating = (rating: number) => {
    const ratingInString = rating.toString();
    setValue('rating', ratingInString);
  };
  const onSubmit = (formData: IAddReviewDatas) => {
    setReviewSubmitted(true);
    updateMutation.mutate({rating:formData.rating,
        productIdentifier:{
          productId:formData.productIdentifier.productId,
          productName:formData.productIdentifier.productName,
          productImage:formData.productIdentifier.productImage
        },
        userEmail:formData.reviewedBy.email,
        reviewDescription:formData.reviewDescription,})
  };
  return (
    <AbsoluteComponent>
      <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-xl font-bold text-primaryDark mb-2'>Update Your Review</h1>
        {/* User Profile Section - Display Only */}
        <div className="bg-primaryLight text-white p-4 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            {userDetails?.profileImage ? (
              <img
                src={userDetails.profileImage}
                alt="User Profile"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                {userDetails?.fullName?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <input 
                type="text" 
                className="font-medium text-white bg-transparent border-none pointer-events-none" 
                value={userDetails?.fullName || ''}
                readOnly
              />
              <input 
                type="text" 
                className="text-sm text-white bg-transparent border-none pointer-events-none w-full" 
                value={userDetails?.email || ''}
                readOnly
              />
              {remarks?.success && remarks.data?.createdAt && (
                <p className="text-sm text-white">
                  Reviewed on: {format(new Date(remarks.data.createdAt), 'MMM dd, yyyy')}
                </p>
              )}
<div className="flex">
  {isPending ? (
    <SkletonText/>
  ) : (
    remarks?.success && remarks.data?.rating && (
      <DisplaySingleProductRating rating={parseInt(remarks.data.rating)} />
    )
  )}
</div>
            </div>
          </div>
        </div>
        {/* Editable Review Section */}
        <div className="space-y-4">
          <div>
            <label htmlFor="reviewDescription" className="block text-lg font-bold text-primaryDark mb-1">
              Update Your Review
            </label>
            <textarea
              id="reviewDescription"
              placeholder="Share your updated thoughts about this product (10-100 characters)..."
              className="formItem w-full min-h-[120px]"
              {...register('reviewDescription', {
                required: { value: true, message: "Please enter your review" },
                minLength: { value: 10, message: "Minimum 10 characters required" },
                maxLength: { value: 100, message: "Maximum 100 characters allowed" }
              })}
            />
            {errors.reviewDescription && (
              <p className="mt-1 text-sm text-red-600">{errors.reviewDescription.message}</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-primaryDark mb-2">Update Your Rating</h3>
            <AddSingleProductRating getProductRating={receiveProductRating} />
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-4">
         {updateMutation.isPending ? <LoadingButton/>: <PrimaryButton searchText='Update' />}
        </div>
      </form>
    </AbsoluteComponent>
  );
};
export default EditSingleProductReview;