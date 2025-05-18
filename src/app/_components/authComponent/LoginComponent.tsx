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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingButton from '../primaryButton/LoadingButton';
import toast from 'react-hot-toast';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import RegisterComponent from './RegisterComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { signIn } from 'next-auth/react';
import { getUserDetails } from '@/app/services/helperFunctions/getUserDetails';
const LoginComponent = () => {
  const[showPassword,setShowPassword] = useState(false);
  const {refetch:refetchUserDetails} = useQuery({queryKey:['user'],queryFn:getUserDetails,enabled:false})
  const[isLoading,setIsLoading] = useState(false);
  const {visibleComponent,setVisibleComponent} = useContext(DisplayContext);
  const {register, formState:{errors}, handleSubmit} = useForm<LoginData>({mode:'onBlur'})
  const queryCLient = useQueryClient()
 const onSubmit = async (data: LoginData) => {
  setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        setIsLoading(false);
        try {
          const errorData = JSON.parse(result.error);
          toast.error(errorData.message);
        } catch {
          toast.error(result.error || 'Login failed');
        }
      } else {
        setIsLoading(false);
        toast.success('Login successful');
        setVisibleComponent('')
        const {data:userDetails} =  await refetchUserDetails();
        queryCLient.setQueryData(['user'],userDetails)
await queryCLient.invalidateQueries({queryKey:['user']});
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Login error:', error);
    }
  };
  return (
    <>
         {isLoading ? <LoadingComponent/>: <AbsoluteComponent>
          <div className="bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative">
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
                            <div className="passwordArea relative">
                            <input
                              type={showPassword?"text":"password"}
                              placeholder="••••••••"
                              className="formItem w-full"
                              autoComplete='off'
                              id='password'
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
           <PrimaryButton searchText='Login' />
            </form>
            <div className="usefulLinks mt-6 space-y-3 border-t border-primaryLight pt-4">
                         <p className='text-sm text-primaryParagraph'>
                           <FontAwesomeIcon icon={faCaretRight} className='mr-2 primaryParagraph' />
                           Already have an account? <span className='link' onClick={() => {
      setVisibleComponent('register');
    }} >Register</span>
                         </p>
                       </div>
      </div>
      </AbsoluteComponent>}
      {visibleComponent==='register' && <RegisterComponent/>}
    </>
  );
};
export default LoginComponent;
