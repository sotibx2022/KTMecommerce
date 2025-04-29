import dynamic from 'next/dynamic';  
import PrimaryButton from '../primaryButton/PrimaryButton';
import { useContext, useState } from 'react';
import { DisplayContext } from '@/app/context/DisplayComponents';
import SubmitError from '../submit/SubmitError';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { useForm } from 'react-hook-form';
const AddSingleProductRating = dynamic(() => import('./AddSingleProductRating'), { ssr: false });
const DisplaySingleProductRating = dynamic(() => import('./DisplaySingleProductRating'), { ssr: false });
interface IAddReviewsProps {
  readOnly: boolean;
  productDetails: {
    _id:string;
  };
}
interface IAddReviewDatas {
  reviewedBy:{
    fullName:string;
    email:string;
  }
  reviewDescription:string;
  productId: string;
  rating:string;
  reviewerImage:string;
}
const AddSingleProductReviews: React.FC<IAddReviewsProps> = ({ readOnly, productDetails }) => {
  const[rating,setRating] = useState(0)
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  const { setVisibleComponent } = useContext(DisplayContext);
  const { register, formState: { errors },handleSubmit,setValue } = useForm<IAddReviewDatas>({ mode: 'onBlur' });
  const addReviews = () => {
    setValue('productId',productDetails._id)
    if (readOnly) {
      setVisibleComponent('login');
    }
  };
  if(userDetails){
    setValue('reviewedBy.fullName',userDetails.fullName);
    setValue('reviewedBy.email',userDetails.email);
    if(userDetails.profileImage){
      setValue('reviewerImage',userDetails.profileImage)
    }
  }
const receiveProductRating =(rating:number) =>{
  const ratingInString = rating.toString();
  setRating(rating)
setValue('rating',ratingInString)
}
  const onSubmit =(data:IAddReviewDatas) =>{
    console.log(data);
  }
  return (
    <form className='w-full lg:w-1/2 flex flex-col gap-2' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-lg font-semibold text-primaryDark'>Add Review</h1>
      {readOnly && <SubmitError message='Please Login to Add Reviews'/>}
      <div className="reviewedBy flex justify-between items-center">
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
      {!readOnly && rating === 0 && <SubmitError message='Please Rate the Product.'/>}
      <div className="multipleButtons flex gap-4">
        <PrimaryButton 
          searchText='Add' 
          onClick={addReviews} 
          disabled={readOnly}
        />
        <PrimaryButton 
          searchText='Login' 
          onClick={addReviews} 
          disabled={!readOnly}
        />
      </div>
    </form>
  );
};
export default AddSingleProductReviews;