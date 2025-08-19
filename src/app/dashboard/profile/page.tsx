"use client";
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import React, { useContext, useEffect, useState } from 'react';
import ProfileAdditionalDetails from '@/app/_components/ProfileAdditionalDetails/ProfileAdditionalDetails';
import UploadProfile from '@/app/_components/UploadProfile/UploadProfile';
import { useForm } from 'react-hook-form';
import { validateFullName, validateNumber, validateWord } from '@/app/services/helperFunctions/validatorFunctions';
import SubmitError from '@/app/_components/submit/SubmitError';
import { IUpdateUserData } from '@/app/types/formData';
import toast from 'react-hot-toast';
import { APIResponseError, APIResponseSuccess, updateUserMutation } from '@/app/services/queryFunctions/users';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingButton from '@/app/_components/primaryButton/LoadingButton';
import { IUser } from '@/app/types/user';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { getUserDetails } from '@/app/services/helperFunctions/getUserDetails';
import { useUser } from '@/app/hooks/queryHooks/useUser';
const Page = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const [isLoading, setIsLoading] = useState(false);
  const [profileFile, setProfileFile] = useState<undefined | File>(undefined)
  const { data: userData, isPending: userDataPending, refetch } = useUser()
  const { register, formState: { errors }, handleSubmit, setValue } = useForm<IUpdateUserData>({ mode: "all" })
  const mutation = useMutation({
    mutationFn: updateUserMutation,
    onSuccess: async (response: APIResponseSuccess<IUser> | APIResponseError) => {
      setIsLoading(false);
      setVisibleComponent('')
      if ('data' in response) { // Type guard for APIResponseSuccess
        toast.success(response.message);
        await refetch()
      } else {
        toast.error(response.message);
      }
    },
    onError: (error: Error) => {
      toast.error(error.message);
      setIsLoading(false);
    }
  });
  const onSubmit = (data: IUpdateUserData) => {
    setVisibleComponent('loadingComponent')
    if (!profileFile) {
      setIsLoading(false);
      setVisibleComponent('');
      toast.error("Please upload the Image first !")
    } else {
      const formData = new FormData();
      // Append all user data to FormData
      formData.append("fullName", data.fullName);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("email", data.email)
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
  const receiveImageURL = (file: File) => {
    setValue("profileUrl", URL.createObjectURL(file))
    setProfileFile(file)
  }
  useEffect(() => {
    if (userDataPending) {
      setValue("fullName", "Loading...");
      setValue("phoneNumber", "Loading...");
      setValue("email", "Loading...");
      setValue('profileUrl', "Loading...");
    } else {
      setValue("fullName", userData?.fullName ?? "");
      setValue("phoneNumber", userData?.phoneNumber || "");
      setValue("email", userData?.email!);
      setValue('profileUrl', userData?.profileImage || "");
    }
  }, [userData, userDataPending, setValue]);
  return (
    <>{isLoading ? <LoadingComponent /> : <form className='container my-4' onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col-reverse sm:flex-row gap-4 justify-between mb-4">
        <h2 className="secondaryHeading">Profile</h2>
        <div className="sm:w-2/5 flex flex-col gap-2">
          <div>
            <label className="formLabel">Full Name</label>
            <input type="text" className="formItem " id='fullName'
              disabled={!userData}
              {...register("fullName", {
                validate: (value) => validateFullName("Full Name", value, 3, 20)
              })}
            />
            {errors.fullName?.message && <SubmitError message={errors?.fullName?.message} />}
          </div>
          <div>
            <label className="formLabel">Email</label>
            <input type="text" className="formItem " id='email' readOnly
              {...register("email")} />
          </div>
          <div>
            <label className="formLabel">Phone Number</label>
            <div className="phoneNumberItem relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                <img
                  src="/assets/nepal-flag-icon.png"
                  alt="Nepal Flag"
                  className="w-5 h-auto object-contain"
                />
                <span className="text-primaryDark text-sm font-medium">+977</span>
              </div>
              <input type="text" className="border border-helper bg-background rounded-md p-3 w-full shadow-helper shadow-sm focus:outline-none text-primaryDark pl-[80px] " placeholder="eg.9804567890" id="phoneNumber"
                disabled={!userData}
                {...register("phoneNumber", {
                  validate: (value) => validateNumber("Phone Number", value, 10, 10)
                })} />
            </div>
            {errors.phoneNumber?.message && <SubmitError message={errors.phoneNumber.message} />}
          </div>
        </div>
        <div className="sm:w-2/5">
          <div className="flex flex-col w-full h-full">
            <UploadProfile profileImageURL={receiveImageURL} imageFromDb={userData?.profileImage} />
            <ProfileAdditionalDetails />
          </div>
        </div>
      </div>
      <PrimaryButton searchText="Update" />
    </form>}</>
  );
};
export default Page;
