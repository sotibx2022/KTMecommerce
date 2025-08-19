"use client";
export type ResetresetPasswordData = {
  resetEmail: string;
  newresetPassword: string;
  confirmNewresetPassword: string;
  checkResetEmail:boolean;
  passwordExist:boolean;
};
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import React, { useContext, useState } from 'react';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import toast from 'react-hot-toast';
import Divider from './Divider';
import AccountOptionLinks from './AccountOptionLinks';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import CheckEmail from './CheckEmail';
import UpdatePassword from './UpdatePassword';
import { Info } from 'lucide-react';
const ResetresetPasswordComponent = () => {
  const formMethod = useForm<ResetresetPasswordData>({mode:'onBlur',
    defaultValues:{
      resetEmail:"",
      newresetPassword:"",
      confirmNewresetPassword:"",
      checkResetEmail:false,
      passwordExist:false,
    }
  })
  const checkResetEmail = useWatch({
  control: formMethod.control,
  name: 'checkResetEmail'
});
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const updateNewresetPassword = async (data: ResetresetPasswordData): Promise<APIResponseSuccess | APIResponseError> => {
    setVisibleComponent('loadingComponent');
    try {
      const response = await axios.post('/api/auth/resetPassword', data);
      return response.data;
    } catch (error) {
      return { message: "Axios Error Occurred.", status: 400, success: false };
    }
  };
  const resetPasswordMutation = useMutation<APIResponseSuccess | APIResponseError, Error, ResetresetPasswordData>({
    mutationFn: updateNewresetPassword,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        setVisibleComponent('');
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
  const onSubmit = async (data: ResetresetPasswordData) => {
    if(data.checkResetEmail || data.checkResetEmail || data.newresetPassword || data.confirmNewresetPassword){
resetPasswordMutation.mutate(data);
    }
  };
  return (
    <>
      {visibleComponent === 'loadingComponent' ? (
        <LoadingComponent />
      ) : (
        <AbsoluteComponent>
          <div className="bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative">
            <div className="resetresetPasswordComponentWrapper">
              <h2 className="secondaryHeading mb-4">Reset Password</h2>
             <FormProvider {...formMethod}>
               <form className="flex flex-col gap-4" onSubmit={formMethod.handleSubmit(onSubmit)}>
                {!checkResetEmail && <CheckEmail />}
                {checkResetEmail && <UpdatePassword/>}
                {checkResetEmail && <PrimaryButton searchText="Reset" />}
              </form>
             </FormProvider>
              <Divider text='account access Options' />
              <AccountOptionLinks visibleItem={'login'} visibleText={'Remember your resetPassword?'} />
              <AccountOptionLinks visibleItem={'register'} visibleText={'Not Registered Yet?'} />
            </div>
          </div>
        </AbsoluteComponent>
      )}
      {visibleComponent === "login" && <LoginComponent />}
      {visibleComponent === "register" && <RegisterComponent />}
    </>
  );
};
export default ResetresetPasswordComponent;