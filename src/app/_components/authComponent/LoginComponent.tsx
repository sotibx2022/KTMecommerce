"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import React, { useContext, useState } from 'react';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { useForm } from 'react-hook-form';
import { LoginData } from '@/app/types/formData';
import { validateEmail, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
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
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import { useUser } from '@/app/hooks/queryHooks/useUser';
import FormInput from '../submit/formInput/FormInput';
import { Mail, UserLock } from 'lucide-react';
const LoginComponent = () => {
  const { userDetails, setUserDetails } = useUserDetails()
  const [showPassword, setShowPassword] = useState(false);
  const { refetch } = useUser()
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const { register, formState: { errors }, handleSubmit } = useForm<LoginData>({ mode: 'onChange' })
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
        const { data: userData } = await refetch();
        await Promise.all([
          queryClient.setQueryData(['user'], userData),
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
  const onSubmit = (data: LoginData) => {
    loginMutation.mutate(data)
  };
  return (
    <>
      {visibleComponent === 'loadingComponent' ? <LoadingComponent /> :
        <AuthProvider>
          <div className="max-w-[400px] p-6 rounded-lg shadow-lg relative">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              {/* Close Icon */}
              <h2 className="secondaryHeading mb-4">Login</h2>
              <FormInput
                id="loginEmail"
                label="Email"
                type="email"
                placeholder="john@example.com"
                required
                icon={Mail} // example Lucide icon
                register={register}
                rules={{ validate: (value: string) => validateEmail("Email", value) }}
                error={errors?.loginEmail?.message}
              />
              <FormInput
                id="loginPassword"
                label="Password"
                type="password"
                placeholder="••••••••"
                required
                icon={UserLock}
                register={register}
                rules={{ validate: (value: string) => validatePassword("Password", value, 8) }}
                error={errors?.loginPassword?.message}
                passwordToogle={true}
              />
              <PrimaryButton searchText='Login' />
            </form>
            <Divider text="or Conitnue with Google" />
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
