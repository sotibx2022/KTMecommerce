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
const AddSingleProductReviews: React.FC<IAddReviewsProps> = ({ readOnly, productDetails }) => {
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
    setValue('productId',productDetails._id)
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
    <div className="absolute top-0 left-0 w-screen min-h-screen flex flex-col justify-center items-center z-10"
    style={{ background: "var(--gradientwithOpacity)" }}>
      <div className='bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative'>
        <FontAwesomeIcon
                      icon={faTimes}
                      className="text-background bg-helper w-[30px] h-[30px] absolute top-0 right-0 cursor-pointer"
        onClick={()=>setVisibleComponent('')}
                    />
    <form className='w-full flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-lg font-semibold text-primaryDark'>Add Review</h1>
      {readOnly && <SubmitError message='Please Login to Add Reviews'/>}
      <div className="reviewedBy flex justify-between gap-4 items-center">
        {readOnly ? (
          <div className='w-[100px] h-[100px]'>
            <img src='../assets/dummyProfile.jpeg'/>
          </div>
        ) : userDetails?.profileImage ? (
          <img
            src={userDetails.profileImage}
            alt="User Profile"
            className="w-[100px] h-[100px]"
          />
        ) : (
          <h1 className="text-primaryDark uppercase bg-background w-[100px] h-[100px] flex items-center justify-center text-xl">
            {userDetails?.fullName?.[0]?.toUpperCase()}
          </h1>
        )}
        <div className="reviewdByInputs">
          <input 
            type='text' 
            placeholder='FullName' 
            className='formItem mb-2' 
            readOnly
            {...register('reviewedBy.fullName')}
          />
          <input 
            type='text' 
            placeholder='email' 
            className='formItem' 
            readOnly
            {...register('reviewedBy.email')}
          />
        </div>
      </div>
      <textarea 
        placeholder="Product Review.....Maximum 100 words" 
        className="formItem" 
        readOnly={readOnly}
        maxLength={100}
        {...register('reviewDescription',{required:{value:true,message:"Please Enter Product Review"},
        minLength:{value:10,message:"Minimum 10 Characters are required."},
      maxLength:{value:100,message:"No More than 100 characters"}})}
      />
      {errors.reviewDescription?.message && <SubmitError message={errors.reviewDescription.message}/>}
      {readOnly ? (
        <DisplaySingleProductRating rating={0}/>
      ) : (
        <AddSingleProductRating getProductRating={receiveProductRating}/>
      )}
      {!readOnly && rating === 0 && reviewSubmitted && <SubmitError message='Please Rate the Product.'/>}
      <div className="multipleButtons flex gap-4">
        {mutation.isPending ? <LoadingButton/>:<PrimaryButton 
          searchText='Add' 
          onClick={addReviews} 
          disabled={readOnly}
        />}
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