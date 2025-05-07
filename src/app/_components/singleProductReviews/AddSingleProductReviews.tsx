import dynamic from 'next/dynamic';  
import PrimaryButton from '../primaryButton/PrimaryButton';
import { useContext, useState } from 'react';
import { DisplayContext } from '@/app/context/DisplayComponents';
import SubmitError from '../submit/SubmitError';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { error } from 'console';
import { IAddReviewDatas,IAddReviewsProps } from '@/app/types/remarks';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { postSingleProductReview } from '@/app/services/queryFunctions/remarks';
import LoadingButton from '../primaryButton/LoadingButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
const AddSingleProductRating = dynamic(() => import('./AddSingleProductRating'), { ssr: false });
const DisplaySingleProductRating = dynamic(() => import('./DisplaySingleProductRating'), { ssr: false });
const AddSingleProductReviews: React.FC<IAddReviewsProps> = ({ readOnly, productIdentifier }) => {
  const {productId, productName, productImage} = productIdentifier;
  const { visibleComponent,setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter()
  const mutation = useMutation<APIResponseSuccess| APIResponseError , Error , IAddReviewDatas>({
    mutationFn:postSingleProductReview,
    onSuccess:(response)=>{
toast.success(response.message)
setVisibleComponent('');
router.refresh();
    },onError:(error)=>{
      toast.error(error.message)
    }
  })
  const[reviewSubmitted,setReviewSubmitted] = useState(false);
  const[rating,setRating] = useState(0)
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  const { register, formState: { errors },handleSubmit,setValue } = useForm<IAddReviewDatas>({ mode: 'onBlur' });
  const addReviews = () => {
    setValue('productIdentifier.productId',productIdentifier.productId);
    setValue('productIdentifier.productImage',productIdentifier.productImage);
    setValue('productIdentifier.productName',productIdentifier.productName);
    if (readOnly) {
      setVisibleComponent('login');
    } 
  };
if(userDetails){
  setValue('reviewedBy.fullName',userDetails!.fullName);
  setValue('reviewedBy.email',userDetails!.email);
  if(userDetails!.profileImage){
    setValue('reviewerImage',userDetails!.profileImage)
  }
}
const receiveProductRating =(rating:number) =>{
  const ratingInString = rating.toString();
  setRating(rating)
setValue('rating',ratingInString)
}
  const onSubmit =(data:IAddReviewDatas) =>{
    setReviewSubmitted(true);
    if(!rating){
      toast.error("Please Select the Rating."); 
    }
    mutation.mutate(data)
  }
  return (
    <div className="absolute top-0 left-0 w-screen min-h-screen flex flex-col justify-center items-center z-10 bg-[rgba(0,0,0,0.7)]">
  <div className='bg-background max-w-[450px] p-6 rounded-lg shadow-lg relative'>
    <FontAwesomeIcon
      icon={faTimes}
      className="text-background bg-helper w-[30px] h-[30px] absolute -top-3 -right-3 cursor-pointer rounded-full p-1"
      onClick={() => setVisibleComponent('')}
    />
    <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-xl font-bold text-primaryDark mb-2'>Add Your Review</h1>
      {readOnly && <SubmitError message='Please Login to Add Reviews' />}
      {/* User Profile Section - Display Only */}
      <div className="bg-primaryLight text-white p-4 rounded-lg">
        <div className="flex items-center gap-4 mb-4">
          {readOnly ? (
            <img
              src='../assets/dummyProfile.jpeg'
              alt="Guest Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : userDetails?.profileImage ? (
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
              value={readOnly ? 'Guest User' : userDetails?.fullName || ''}
              readOnly
            />
            <input 
              type="text" 
              className="text-sm text-white bg-transparent border-none pointer-events-none w-full" 
              value={readOnly ? 'guest@example.com' : userDetails?.email || ''}
              readOnly
            />
          </div>
        </div>
      </div>
      {/* Editable Review Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="reviewDescription" className="block text-lg font-bold text-primaryDark mb-1">
            Your Review
          </label>
          <textarea
            id="reviewDescription"
            placeholder="Share your thoughts about this product (10-100 characters)..."
            className="formItem w-full min-h-[120px]"
            readOnly={readOnly}
            {...register('reviewDescription', {
              required: { value: true, message: "Please enter your review" },
              minLength: { value: 10, message: "Minimum 10 characters required" },
              maxLength: { value: 100, message: "Maximum 100 characters allowed" }
            })}
          />
          {errors.reviewDescription?.message && (
            <SubmitError message={errors.reviewDescription.message} />
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-primaryDark mb-2">
            {readOnly ? 'Product Rating' : 'Your Rating'}
          </h3>
          {readOnly ? (
            <DisplaySingleProductRating rating={0} />
          ) : (
            <>
              <AddSingleProductRating getProductRating={receiveProductRating} />
              {rating === 0 && reviewSubmitted && (
                <SubmitError message='Please Rate the Product.' />
              )}
            </>
          )}
        </div>
      </div>
      {/* Submit Buttons */}
      <div className="mt-4 flex gap-4">
        {mutation.isPending ? (
          <LoadingButton />
        ) : (
          <PrimaryButton 
            searchText='Add Review' 
            onClick={addReviews} 
            disabled={readOnly}
          />
        )}
        <PrimaryButton 
          searchText='Login' 
          onClick={addReviews} 
          disabled={!readOnly}
        />
      </div>
    </form>
  </div>
</div>
  );
};
export default AddSingleProductReviews;