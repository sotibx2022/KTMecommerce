import dynamic from 'next/dynamic';
import PrimaryButton from '../primaryButton/PrimaryButton';
import { useContext, useEffect, useState, useRef } from 'react';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { IRemarksBase, IProductIdentifier } from '@/app/types/remarks';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import { getSpecificReviewofProductbyUser, updateSingleProductReview } from '@/app/services/queryFunctions/remarks';
import toast from 'react-hot-toast';
import LoadingButton from '../primaryButton/LoadingButton';
import ReadOnlyUserProfile from './ReadOnlyUserProfile';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
const AddSingleProductRating = dynamic(() => import('./AddSingleProductRating'), { ssr: false });
interface EditSingleProductReviewProps {
  productIdentifier: IProductIdentifier;
}
const EditSingleProductReview: React.FC<EditSingleProductReviewProps> = ({ productIdentifier }) => {
  const queryClient = useQueryClient();
  const { productId } = productIdentifier;
  const { setVisibleComponent } = useContext(DisplayContext);
  const { userDetails } = useUserDetails();
  const userId = userDetails?._id;
  const updateMutation = useMutation<APIResponseSuccess | APIResponseError, Error, IRemarksBase>({
    mutationFn: updateSingleProductReview,
    onSuccess: async (response) => {
      if (response.success) toast.success(response.message);
      else toast.error(response.message);
      setVisibleComponent('');
      const isSingleProductPage = window.location.pathname.includes('/singleProduct');
      const isRemarksPage = window.location.pathname.includes('/reviews');
      const invalidations = [];
      if (isSingleProductPage) {
        invalidations.push(queryClient.invalidateQueries({ queryKey: ['specificRemarks', productId], refetchType: 'active' }));
      }
      if (isRemarksPage) {
        invalidations.push(queryClient.invalidateQueries({ queryKey: ['specificUserRemarks', userId], refetchType: 'active' }));
      }
      invalidations.push(queryClient.invalidateQueries({ queryKey: ['specificProduct', productId], refetchType: 'active' }));
      await Promise.all(invalidations);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const { register, formState: { errors }, handleSubmit, setValue } = useForm<IRemarksBase>({ mode: 'onBlur' });
  const { data: remarks, isPending } = useQuery<APIResponseSuccess<IRemarksBase> | APIResponseError>({
    queryKey: ['specificRemark', userId, productId],
    queryFn: () => getSpecificReviewofProductbyUser(userId!, productId),
    enabled: !!userId && !!productId
  });
  const initialValuesSet = useRef(false); // Prevent overwriting user input
  useEffect(() => {
    if (remarks && remarks.success && remarks.data && !initialValuesSet.current) {
      setValue('reviewedBy.fullName', remarks.data.reviewedBy.fullName);
      setValue('reviewedBy.userId', remarks.data.reviewedBy.userId);
      setValue('productIdentifier.productId', remarks.data.productIdentifier.productId);
      setValue('productIdentifier.productName', remarks.data.productIdentifier.productName);
      setValue('productIdentifier.productImage', remarks.data.productIdentifier.productImage);
      setValue('reviewDescription', remarks.data.reviewDescription);
      setValue('rating', remarks.data.rating);
      if (userDetails?.profileImage) {
        setValue('reviewerImage', userDetails.profileImage);
      }
      initialValuesSet.current = true; // Mark as set
    }
  }, [remarks, setValue, userDetails?.profileImage]);
  const receiveProductRating = (rating: number) => {
    setValue('rating', rating.toString());
  };
  const onSubmit = (formData: IRemarksBase) => {
    updateMutation.mutate({
      rating: formData.rating,
      productIdentifier: {
        productId: formData.productIdentifier.productId,
        productName: formData.productIdentifier.productName,
        productImage: formData.productIdentifier.productImage
      },
      reviewedBy: {
        userId: userId || '',
        fullName: userDetails?.fullName || ''
      },
      reviewDescription: formData.reviewDescription
    });
  };
  if (updateMutation.isPending) return <LoadingComponent />;
  return (
    <AbsoluteComponent>
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-bold text-primaryDark mb-2">Update Your Review</h1>
        <ReadOnlyUserProfile />
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
        <div className="mt-4">
          {updateMutation.isPending ? <LoadingButton /> : <PrimaryButton searchText="Update" />}
        </div>
      </form>
    </AbsoluteComponent>
  );
};
export default EditSingleProductReview;
