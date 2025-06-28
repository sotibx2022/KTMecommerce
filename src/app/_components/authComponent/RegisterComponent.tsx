"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faCaretRight, faUser, faEnvelope, faPhone, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import SubmitError from '../submit/SubmitError';
import { validateConfirmPassword, validateEmail, validateFullName, validateNumber, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import { RegisterData } from '@/app/types/formData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIResponseError, APIResponseSuccess, createUserMutation } from '@/app/services/queryFunctions/users';
import { IUser, RegisterUserInput } from '@/app/types/user';
import LoadingButton from '../primaryButton/LoadingButton';
import toast from 'react-hot-toast';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import LoginComponent from './LoginComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { signIn } from 'next-auth/react';
import ResetPasswordComponent from './ResetPasswordComponent';
import AuthProvider from './AuthProvider';
import AccountOptionLinks from './AccountOptionLinks';
import Divider from './Divider';
import SocialMediaAuth from './SocialMediaAuth';
const RegisterComponent = () => {
  const[showPassword,setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const { visibleComponent,setVisibleComponent } = useContext(DisplayContext);
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, RegisterUserInput>({
    mutationFn: createUserMutation,
    onSuccess: async (response,variables) => {
      setVisibleComponent('loadingComponent');
      if (response.success) {
        toast.success(response.message);
        setVisibleComponent('')
        queryClient.setQueryData(['user'], response.data);
        await queryClient.invalidateQueries({queryKey:['user']});
        signIn("credentials", {
      email: response.data.email,
      password: variables.password,
      redirect: false,
    });
      } else {
        toast.error(response.message);
        setVisibleComponent('')
      }
    },
    onError: (error) => {
      toast.error(error.message);
      setVisibleComponent('')
    }
  });
  const { register, formState: { errors }, getValues, handleSubmit } = useForm<RegisterData>({ mode: 'onBlur' });
const onSubmit = async (data: RegisterData) => {
  setVisibleComponent('loadingComponent');
  try {
    const { email,password } = data;
    mutation.mutate({
      email,
      password
    });
  } catch (error: any) {
    toast.error(error.message || "Error To Register User!");
    setVisibleComponent('')
  }
};
  return (
    <>
      {visibleComponent==='loadingComponent' ? <LoadingComponent/> : 
<AuthProvider>
  <div className="max-w-[400px] p-6 rounded-lg shadow-lg relative">
      <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
        <h2 className="subHeading mb-4">Register</h2>
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
            {...register("email", {
              validate: (value) => validateEmail("Email", value)
            })}
          />
          {errors.email?.message && <SubmitError message={errors.email.message} />}
        </div>
        {/* Password */}
        <div>
          <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faLock} className='text-primaryDark mr-2' />
            <label htmlFor="password" className='primaryParagraph'>
              Password <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="passwordArea relative">
          <input
            type={showPassword?"text":"password"}
            placeholder="••••••••"
            className="formItem w-full"
            autoComplete='off'
            {...register("password", {
              validate: (value) => validatePassword("Password", value, 8)
            })}
          />
           <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
        </div>
          {errors.password?.message && <SubmitError message={errors.password.message} />}
        </div>
        {/* Confirm Password */}
        <div>
          <div className="flex items-center mb-1">
            <FontAwesomeIcon icon={faLock} className='text-primaryDark mr-2' />
            <label htmlFor="confirmPassword" className='primaryParagraph'>
              Confirm Password <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="passwordArea relative">
          <input
            type={showPassword? "text" :"password"}
            placeholder="••••••••"
            className="formItem w-full"
            autoComplete='off'
            {...register("confirmPassword", {
              validate: (value) => validateConfirmPassword("Confirm Password", getValues("password"), value)
            })}
          />
           <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
        </div>
          {errors.confirmPassword?.message && <SubmitError message={errors.confirmPassword.message} />}
        </div>
      <PrimaryButton searchText='Register' />
      </form>
      <Divider text={'orLogin With Social Accounts.'}/>
      <SocialMediaAuth/>
      <Divider text={'Account Access Options'}/>
      <AccountOptionLinks visibleItem={'login'} visibleText={'Already Registered?'}/>
      <AccountOptionLinks visibleItem={'resetPassword'} visibleText={'Forget Password?'}/>
  </div>
</AuthProvider>
      }
    {visibleComponent==='login' && <LoginComponent/>}
    {visibleComponent==='resetPassword' && <ResetPasswordComponent/>}
    </>
  );
};
export default RegisterComponent;
