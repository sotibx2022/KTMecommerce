"use client";
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import React, { useContext, useEffect } from 'react';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import ProfileAdditionalDetails from '@/app/_components/ProfileAdditionalDetails/ProfileAdditionalDetails';
import UploadProfile from '@/app/_components/UploadProfile/UploadProfile';
import { useForm } from 'react-hook-form';
import { validateEmail, validateNumber, validateWord } from '@/app/services/helperFunctions/validatorFunctions';
import SubmitError from '@/app/_components/submit/SubmitError';
import { IUpdateUserData } from '@/app/types/formData';
import { error } from 'console';
import toast from 'react-hot-toast';
const Page = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details Context is not defined");
  }
  const { userDetails } = context;
  const {register,formState:{errors},handleSubmit,setValue} = useForm<IUpdateUserData>({mode:"all"})
  const onSubmit = (data:IUpdateUserData) => {
    if(!data.profileUrl){
      toast.error("Please upload the Image first !")
    }else if(data.fullName === userDetails?.fullName && data.email === userDetails.email &&
data.phoneNumber === userDetails.phoneNumber && data.fullAddress === userDetails.addresses && data.profileUrl ===userDetails.profileImage){
  toast.error("There is Nothing to Update !")
}else{
  toast.success("Now you can update the details");
  console.log(data);
}
  };
  const receiveImageURL =(imageUrl:string) =>{
    setValue("profileUrl",imageUrl)
  }
  useEffect(()=>{
    if(userDetails){
      setValue("fullName",userDetails.fullName);
      setValue("email",userDetails.email);
      setValue("phoneNumber",userDetails.phoneNumber);
    }
  },[])
  return (
    <form className='container my-4' onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between mb-4">
        <div className="w-2/5 flex flex-col gap-2">
          <div>
            <label className="formLabel">Full Name</label>
            <input type="text" className="formItem " placeholder="Binaya Raj Soti" id='fullName'
              {...register("fullName", {
                              validate: (value) => validateWord("Full Name", value, 3, 20)
              })}
            />
            {errors.fullName?.message && <SubmitError message={errors?.fullName?.message}/>}
          </div>
          <div>
            <label className="formLabel">Email</label>
            <input type="text" className="formItem " placeholder="example@email.com" id='email'
           {...register("email", {
                            validate: (value) => validateEmail("Email", value)
                          })}/>
                          {errors.email?.message && <SubmitError message={errors.email?.message}/>}
          </div>
          <div>
            <label className="formLabel">Phone Number</label>
            <input type="text" className="formItem " placeholder="+123 456 7890" id="phoneNumber"
            {...register("phoneNumber",{
              validate: (value) =>validateNumber("Phone Number",value,10,10)
            })} />
            {errors.phoneNumber?.message && <SubmitError message={errors.phoneNumber.message}/>}
          </div>
          <div>
            <label className="formLabel">Full Address</label>
            <input
  type="text"
  className="formItem"
  placeholder="123 Main St, City, Country"
  id="fullAddress"
  {...register("fullAddress", {
    required: "Full Address is Required.",
    minLength: {
      value: 5,
      message: "Minimum 5 characters are required."
    },
    maxLength: {
      value: 30,
      message: "No more than 30 characters are allowed."
    }
  })}
/>
{errors.fullAddress?.message && <SubmitError message={errors.fullAddress.message}/>}
          </div>
        </div>
        <div className="w-2/5">
          <div className="flex flex-col w-full h-full ">
           <UploadProfile profileImageURL ={receiveImageURL}/>
            <ProfileAdditionalDetails />
          </div>
        </div>
      </div>
      <PrimaryButton searchText="Update" />
    </form>
  );
};
export default Page;
