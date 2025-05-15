"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faCaretRight, faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import SocialMediaAuth from './SocialMediaAuth';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import SubmitError from '../submit/SubmitError';
import { validateConfirmPassword, validateEmail, validateFullName, validateNumber, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import { RegisterData } from '@/app/types/formData';
import registerUser from '@/app/services/firebaseFunctions/registerUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIResponseError, APIResponseSuccess, createUserMutation } from '@/app/services/queryFunctions/users';
import { IUser, RegisterUserInput } from '@/app/types/user';
import LoadingButton from '../primaryButton/LoadingButton';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LoadingContainer from '../loadingComponent/LoadingContainer';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import LoginComponent from './LoginComponent';
const RegisterComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { visibleComponent,setVisibleComponent } = useContext(DisplayContext);
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, RegisterUserInput>({
    mutationFn: createUserMutation,
    onSuccess: async (response) => {
      setIsLoading(false);
      if (response.success) {
        toast.success(response.message);
        queryClient.setQueryData(['user'], response.data);
        await queryClient.invalidateQueries({queryKey:['user']});
        setVisibleComponent('')
      } else {
        toast.error(response.message);
        setVisibleComponent('')
      }
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    }
  });
  const { register, formState: { errors }, getValues, handleSubmit } = useForm<RegisterData>({ mode: 'onBlur' });
  const onSubmit = async (data: RegisterData) => {
    setIsLoading(true);
    const { firstName, lastName, email, phoneNumber } = data;
    const fullName = `${firstName} ${lastName}`;
    try {
      const user = await registerUser(data.email, data.password);
      if (user) {
        mutation.mutate({
          fullName,
          email,
          phoneNumber,
          firebaseId: user.uid,
        });
      }
    } catch (error: any) {
      toast.error(error.message || "Error To Register User!");
      setIsLoading(false);
    }
  };
  return (
    <>
    <AbsoluteComponent>
      {isLoading ? <LoadingContainer/> : 
        <div className="bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative">
          <div className="registerComponentWrapper">
            <h2 className="subHeading mb-4">Register</h2>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
              {/* First Name */}
              <div>
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faUser} className='text-primaryDark mr-2' />
                  <label htmlFor="firstName" className='primaryParagraph'>
                    First Name <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="John"
                  className="formItem w-full"
                  id='firstName'
                  disabled={isLoading}
                  {...register("firstName", {
                    validate: (value) => validateFullName("First Name", value, 2, 20)
                  })}
                />
                {errors.firstName?.message && <SubmitError message={errors.firstName.message} />}
              </div>
              {/* Last Name */}
              <div>
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faUser} className="text-primaryDark mr-2" />
                  <label htmlFor="lastName" className='primaryParagraph'>
                    Last Name <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Doe"
                  className="formItem w-full"
                  id='lastName'
                  disabled={isLoading}
                  {...register("lastName", {
                    validate: (value) => validateFullName("Last Name", value, 2, 20)
                  })}
                />
                {errors.lastName?.message && <SubmitError message={errors.lastName.message} />}
              </div>
              {/* Email */}
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
                  disabled={isLoading}
                  {...register("email", {
                    validate: (value) => validateEmail("Email", value)
                  })}
                />
                {errors.email?.message && <SubmitError message={errors.email.message} />}
              </div>
              {/* Phone Number */}
              <div>
                <div className="flex items-center mb-1">
                  <FontAwesomeIcon icon={faPhone} className='text-primaryDark mr-2' />
                  <label htmlFor="phoneNumber" className='primaryParagraph'>
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="1234567890"
                  className="formItem w-full"
                  id='phoneNumber'
                  disabled={isLoading}
                  {...register("phoneNumber", {
                    validate: (value) => validateNumber("Phone Number", value, 10, 10)
                  })}
                />
                {errors.phoneNumber?.message && <SubmitError message={errors.phoneNumber.message} />}
              </div>
              {/* Password */}
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
                  disabled={isLoading}
                  {...register("password", {
                    validate: (value) => validatePassword("Password", value, 8)
                  })}
                />
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
                <input
                  type="password"
                  placeholder="••••••••"
                  className="formItem w-full"
                  id='confirmPassword'
                  autoComplete='off'
                  disabled={isLoading}
                  {...register("confirmPassword", {
                    validate: (value) => validateConfirmPassword("Confirm Password", getValues("password"), value)
                  })}
                />
                {errors.confirmPassword?.message && <SubmitError message={errors.confirmPassword.message} />}
              </div>
              {isLoading ? <LoadingButton/> : <PrimaryButton searchText='Register' />}
            </form>
            <div className="usefulLinks mt-6 space-y-3 border-t border-primaryLight pt-4">
              <p className='text-sm text-primaryParagraph'>
                <FontAwesomeIcon icon={faCaretRight} className='mr-2 primaryParagraph' />
                Already have an account? <span className='link' onClick={()=>setVisibleComponent('login')}>Login</span>
              </p>
            </div>
          </div>
          <SocialMediaAuth action="Register"/>
        </div>
      }
    </AbsoluteComponent>
    {visibleComponent==='login' && <LoginComponent/>}
    </>
  );
};
export default RegisterComponent;