"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faCaretRight, faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import { LoginData } from '@/app/types/formData';
import { validateEmail, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import SubmitError from '../submit/SubmitError';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import RegisterComponent from './RegisterComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { signIn } from 'next-auth/react';
import { getUserDetails } from '@/app/services/helperFunctions/getUserDetails';
import ResetPasswordComponent from './ResetPasswordComponent';
import AuthProvider from './AuthProvider';
import SocialMediaAuth from './SocialMediaAuth';
import Divider from './Divider';
import AccountOptionLinks from './AccountOptionLinks';
import axios from 'axios';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { refetch: refetchUserDetails } = useQuery({ queryKey: ['user'], queryFn: getUserDetails, enabled: false })
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const { register, formState: { errors }, handleSubmit } = useForm<LoginData>({ mode: 'onBlur' })
  const queryClient = useQueryClient()
const loginMutation = useMutation<APIResponseSuccess | APIResponseError, Error, LoginData>({
  mutationFn: async (data: LoginData) => {
    try {
      const response = await axios.post('/api/auth/loginUser', data, {
        validateStatus: (status) => {
          return status < 500;
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  onMutate: () => {
    setVisibleComponent('loadingComponent');
  },
  onSuccess: async (response) => {
    if (response.success) {
      setVisibleComponent("");
      toast.success(response.message);
      const { data: userDetails } = await refetchUserDetails();
      await Promise.all([
        queryClient.setQueryData(['user'], userDetails),
        queryClient.invalidateQueries({ queryKey: ['user'] })
      ]);
    } else {
      toast.error(response.message);
    }
  },
  onError: (error) => {
    toast.error(error.message || 'An unexpected error occurred during login.');
  setVisibleComponent('');
  },
  onSettled: () => {
    setVisibleComponent('');
  },
});
  const onSubmit=(data:LoginData)=>{
  loginMutation.mutate(data)
};
  return (
    <>
      {visibleComponent === 'loadingComponent' ? <LoadingComponent /> :
        <AuthProvider>
          <div className="max-w-[400px] p-6 rounded-lg shadow-lg relative">
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
                  {...register("loginEmail", {
                    validate: (value) => validateEmail("Email", value)
                  })}
                />
                {errors.loginEmail?.message && <SubmitError message={errors.loginEmail.message} />}
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faLock} className='text-primaryDark mr-2' />
                  <label htmlFor="password" className='primaryParagraph'>
                    Password <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="passwordArea relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="formItem w-full"
                    autoComplete='off'
                    {...register("loginPassword", {
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
                {errors.loginPassword?.message && <SubmitError message={errors.loginPassword.message} />}
              </div>
              <PrimaryButton searchText='Login' />
            </form>
            <Divider text="or Conitnue with social Media" />
            <SocialMediaAuth />
            <Divider text="Account Access Options" />
            <AccountOptionLinks visibleItem={'register'} visibleText={'Account Not Created Yet?'} />
            <AccountOptionLinks visibleItem={'resetPassword'} visibleText={'Forget Password?'} />
          </div>
        </AuthProvider>}
      {visibleComponent === 'register' && <RegisterComponent />}
      {visibleComponent === 'resetPassword' && <ResetPasswordComponent />}
    </>
  );
};
export default LoginComponent;
