"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faCaretRight, faEnvelope, faLock, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
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
import RegisterComponent from './RegisterComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
const LoginComponent = () => {
  const {visibleComponent,setVisibleComponent} = useContext(DisplayContext);
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
         {mutation.isPending ? <LoadingComponent/>: <div className="bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            {/* Close Icon */}
            <h2 className="subHeading mb-4">Login</h2>
            <div>
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faEnvelope} className='text-primaryDark mr-2' />
                  <label htmlFor="email" className='primaryParagraph'>
                    Email <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="formItem w-full"
                  id='email'
                  {...register("email", {
                    validate: (value) => validateEmail("Email", value)
                  })}
                />
                {errors.email?.message && <SubmitError message={errors.email.message} />}
              </div>
            <div>
                            <div className="flex items-center mb-1">
                              <FontAwesomeIcon icon={faLock} className='text-primaryDark mr-2' />
                              <label htmlFor="password" className='primaryParagraph'>
                                Password <span className="text-red-500">*</span>
                              </label>
                            </div>
                            <input
                              type="password"
                              placeholder="••••••••"
                              className="formItem w-full"
                              autoComplete='off'
                              id='password'
                              {...register("password", {
                                validate: (value) => validatePassword("Password", value, 8)
                              })}
                            />
                            {errors.password?.message && <SubmitError message={errors.password.message} />}
                          </div>
            {mutation.isPending ? <LoadingButton/>:<PrimaryButton searchText='Login' />}
            </form>
            <div className="usefulLinks mt-6 space-y-3 border-t border-primaryLight pt-4">
                         <p className='text-sm text-primaryParagraph'>
                           <FontAwesomeIcon icon={faCaretRight} className='mr-2 primaryParagraph' />
                           Already have an account? <span className='link' onClick={() => {
      setVisibleComponent('register');
      console.log(visibleComponent); // Use console.log instead of alert for debugging
    }} >Register</span>
                         </p>
                       </div>
      </div>}
      </AbsoluteComponent>
      {visibleComponent==='register' && <RegisterComponent/>}
    </>
  );
};
export default LoginComponent;
