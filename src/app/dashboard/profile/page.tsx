"use client";
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import React, { useContext, useEffect, useState } from 'react';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import ProfileAdditionalDetails from '@/app/_components/ProfileAdditionalDetails/ProfileAdditionalDetails';
import UploadProfile from '@/app/_components/UploadProfile/UploadProfile';
import { useForm } from 'react-hook-form';
import { validateNumber, validateWord } from '@/app/services/helperFunctions/validatorFunctions';
import SubmitError from '@/app/_components/submit/SubmitError';
import { IUpdateUserData } from '@/app/types/formData';
import toast from 'react-hot-toast';
import { APIResponseError, APIResponseSuccess, updateUserMutation } from '@/app/services/queryFunctions/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingButton from '@/app/_components/primaryButton/LoadingButton';
import { IUser } from '@/app/types/user';
const Page = () => {
  const[isLoading,setIsLoading] = useState(false);
  const[profileFile,setProfileFile] = useState<undefined | File>(undefined)
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details Context is not defined");
  }
  const { userDetails } = context;
  const queryClient = useQueryClient();
  const {register,formState:{errors},handleSubmit,setValue} = useForm<IUpdateUserData>({mode:"all"})
 const mutation = useMutation({
  mutationFn: updateUserMutation,
  onSuccess: async (response: APIResponseSuccess<IUser> | APIResponseError) => {
    setIsLoading(false);
    if ('data' in response) { // Type guard for APIResponseSuccess
      toast.success(response.message);
      queryClient.setQueryData(['user'], response.data);
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    } else {
      // Handle APIResponseError case
      toast.error(response.message);
    }
  },
  onError: (error: Error) => {
    toast.error(error.message);
    setIsLoading(false);
  }
});
  const onSubmit = (data:IUpdateUserData) => {
    setIsLoading(true);
    if(!profileFile){
      setIsLoading(false);
      toast.error("Please upload the Image first !")
    }else{
  const formData = new FormData();
  // Append all user data to FormData
  formData.append("fullName", data.fullName);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("fullAddress", data.fullAddress);
  formData.append("email",data.email)
  // If profileFile exists, append it to the FormData object
  if (profileFile) {
    formData.append("profileFile", profileFile);  // Append the file to FormData
    formData.append("profileFileOriginalName", profileFile.name); // Original file name
    formData.append("profileFileSize", String(profileFile.size)); // Convert the size to string
    formData.append("profileFileType", profileFile.type); // File type
}
  mutation.mutate(formData)
}
  };
  const receiveImageURL =(file:File) =>{
    setValue("profileUrl",URL.createObjectURL(file))
    setProfileFile(file)
  }
  useEffect(()=>{
  if(userDetails){
    setValue("fullName",userDetails.fullName);
    setValue("phoneNumber",userDetails.phoneNumber || "");
    setValue("email",userDetails.email);
    if(userDetails.address){
      setValue("fullAddress",userDetails.address)
    }
  }
  },[userDetails])
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
            <input type="text" className="formItem " placeholder="example@email.com" id='email' readOnly
            {...register("email")}/>
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
           <UploadProfile profileImageURL ={receiveImageURL} imageFromDb={userDetails?.profileImage}/>
            <ProfileAdditionalDetails />
          </div>
        </div>
      </div>
      {isLoading ? <LoadingButton/> :<PrimaryButton searchText="Update" />}
    </form>
  );
};
export default Page;
