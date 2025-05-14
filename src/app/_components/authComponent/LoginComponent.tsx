"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faCaretRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import SocialMediaAuth from './SocialMediaAuth';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import { LoginData } from '@/app/types/formData';
import { validateEmail, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import SubmitError from '../submit/SubmitError';
import loginUser from '@/app/services/firebaseFunctions/loginUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIResponseError, APIResponseSuccess, loginUserMutation } from '@/app/services/queryFunctions/users';
import LoadingButton from '../primaryButton/LoadingButton';
import toast from 'react-hot-toast';
import LoadingContainer from '../loadingComponent/LoadingContainer';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
const LoginComponent = () => {
  const {setVisibleComponent} = useContext(DisplayContext);
  const {register, formState:{errors}, handleSubmit} = useForm<LoginData>({mode:'onBlur'})
  const queryCLient = useQueryClient()
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, LoginData>({
    mutationFn:loginUserMutation,
    onSuccess:async(response)=>{
      if(response.success){
toast.success(response.message);
queryCLient.setQueryData(['user'],response.data);
await queryCLient.invalidateQueries({queryKey:['user']});
setVisibleComponent('')
      }else{
toast.error(response.message);
      setVisibleComponent('')
      }
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })
  const onSubmit=async(data:LoginData)=>{
const {success,message} = await loginUser(data.email,data.password);
if(success){
 mutation.mutate({email:data.email,password:data.password});
}
  }
  return (
    <>
      <AbsoluteComponent>
         {mutation.isPending ? <LoadingContainer/>: <div className="bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Close Icon */}
            <h2 className="subHeading mb-4">Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="formItem" id='email'
              {...register("email",{
                validate:(value)=>validateEmail("Email",value)
              })}
            />
            {errors.email?.message && <SubmitError message={errors.email.message}/>}
            <input
              type="password"
              placeholder="Password"
              className="formItem" id='password'
              autoComplete='off'
              {...register("password",{
                validate:(value)=>validatePassword("Password",value,8)
              })}
            />
            {errors.password?.message && <SubmitError message={errors.password.message}/>}
            {mutation.isPending ? <LoadingButton/>:<PrimaryButton searchText='Login' />}
            </form>
            <div className="usefulLinks my-2">
              <p className="secondaryHeading">
                <FontAwesomeIcon icon={faCaretRight} className="mr-2" />
                Don't have an account? <span className="link">Sign up</span>
              </p>
              <p className="secondaryHeading">
                <FontAwesomeIcon icon={faCaretRight} className="mr-2" />
                Forget Password ? <span className="link">Reset Password</span>
              </p>
            </div>
        {/* Social Media Auth Section */}
        <SocialMediaAuth action="Login"/>
      </div>}
      </AbsoluteComponent>
    </>
  );
};
export default LoginComponent;
