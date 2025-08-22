"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useState } from 'react';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import { validateConfirmPassword, validateEmail, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import { RegisterData } from '@/app/types/formData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { APIResponseError, APIResponseSuccess, createUserMutation } from '@/app/services/queryFunctions/users';
import { RegisterUserInput } from '@/app/types/user';
import toast from 'react-hot-toast';
import LoginComponent from './LoginComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import ResetPasswordComponent from './ResetPasswordComponent';
import AuthProvider from './AuthProvider';
import AccountOptionLinks from './AccountOptionLinks';
import Divider from './Divider';
import SocialMediaAuth from './SocialMediaAuth';
import { getUserDetails } from '@/app/services/helperFunctions/getUserDetails';
import FormInput from '../submit/formInput/FormInput';
import { Lock, Mail } from 'lucide-react';
const RegisterComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const { refetch: refetchUserDetails } = useQuery({ queryKey: ['user'], queryFn: getUserDetails });
  const mutation = useMutation<APIResponseSuccess | APIResponseError, Error, RegisterUserInput>({
    mutationFn: createUserMutation,
    onSuccess: async (response) => {
      setVisibleComponent('loadingComponent');
      if (response.success) {
        toast.success(response.message);
        setVisibleComponent('');
        const { data: userDetails } = await refetchUserDetails();
        await Promise.all([
          queryClient.setQueryData(['user'], userDetails),
          await queryClient.invalidateQueries({ queryKey: ['user'] })
        ]);
      } else {
        toast.error(response.message);
        setVisibleComponent('');
      }
    },
    onError: (error) => {
      toast.error(error.message);
      setVisibleComponent('');
    }
  });
  const { register, formState: { errors }, getValues, handleSubmit } = useForm<RegisterData>({ mode: 'onChange' });
  const onSubmit = async (data: RegisterData) => {
    setVisibleComponent('loadingComponent');
    try {
      const { email, password } = data;
      mutation.mutate({ email, password });
    } catch (error: any) {
      toast.error(error.message || "Error To Register User!");
      setVisibleComponent('');
    }
  };
  return (
    <>
      {visibleComponent === 'loadingComponent' ? <LoadingComponent /> :
        <AuthProvider>
          <div className="max-w-[400px] p-6 rounded-lg shadow-lg relative">
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
              <h2 className="secondaryHeading mb-4">Register</h2>
              {/* ✅ Email */}
              <FormInput
                id="email"
                label="Email"
                type="email"
                placeholder="john@example.com"
                required
                icon={Mail}
                register={register}
                rules={{ validate: (value: string) => validateEmail("Email", value) }}
                errors={errors}
              />
              {/* ✅ Password */}
              <FormInput
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                icon={Lock}
                register={register}
                rules={{ validate: (value: string) => validatePassword("Password", value, 8) }}
                errors={errors}
                passwordToogle={true}
              />
              {/* ✅ Confirm Password */}
              <FormInput
                id="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                icon={Lock}
                register={register}
                rules={{
                  validate: (value: string) =>
                    validateConfirmPassword("Confirm Password", getValues("password"), value)
                }}
                errors={errors}
                passwordToogle={true}
              />
              <PrimaryButton searchText='Register' />
            </form>
            <Divider text={'or Login With Google.'} />
            <SocialMediaAuth />
            <Divider text={'Account Access Options'} />
            <AccountOptionLinks visibleItem={'login'} visibleText={'Already Registered?'} />
            <AccountOptionLinks visibleItem={'resetPassword'} visibleText={'Forget Password?'} />
          </div>
        </AuthProvider>
      }
      {visibleComponent === 'login' && <LoginComponent />}
      {visibleComponent === 'resetPassword' && <ResetPasswordComponent />}
    </>
  );
};
export default RegisterComponent;
