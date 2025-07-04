"use client";
export type UpdatePasswordData = {
    userEmail: string;
    originalPassword: string;
    checkOriginalPassword: boolean;
    newupdatedPassword: string;
    confirmupdatedPassword: string;
    passwordExist: boolean;
};
interface IDataTOSendForAPI {
    resetEmail: string,
    newresetPassword: string,
    confirmNewresetPassword: string,
}
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import React, { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import toast from 'react-hot-toast';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import CurrentPasswordCheck from './CurrentPasswordCheck';
import NewPasswordEnter from './NewPasswordEnter';
import LoadingButton from '@/app/_components/primaryButton/LoadingButton';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
const UpdatePassword = () => {
    const context = useContext(UserDetailsContext);
    if (!context) {
        throw new Error("user detail context is not defined here.")
    }
    const { userDetails } = context;
    console.log(userDetails)
    const formMethod = useForm<UpdatePasswordData>({
        mode: 'onBlur',
        defaultValues: {
            userEmail: "",
            originalPassword: "",
            checkOriginalPassword: false,
            newupdatedPassword: "",
            confirmupdatedPassword: "",
            passwordExist: false,
        }
    })
    const checkOriginalPassword = useWatch({
        control: formMethod.control,
        name: 'checkOriginalPassword'
    });
    console.log(checkOriginalPassword);
    const updatePasswordMutation = useMutation<APIResponseSuccess | APIResponseError, Error, IDataTOSendForAPI>({
        mutationFn: async (data: IDataTOSendForAPI) => {
            const response = await axios.post('/api/auth/resetPassword', data);
            return response.data;
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    const onSubmit = async (data: UpdatePasswordData) => {
        if (data.newupdatedPassword || data.confirmupdatedPassword || data.checkOriginalPassword) {
            const dataToSend = {
                resetEmail: userDetails!.email! as string,
                newresetPassword: data.newupdatedPassword,
                confirmNewresetPassword: data.confirmupdatedPassword,
            }
            updatePasswordMutation.mutate(dataToSend);
        }
    };
    const showPasswordCheck = !checkOriginalPassword || (userDetails?.passwordHistory?.length === 0);
    const showPasswordEnter = checkOriginalPassword
    return (
        <div className="resetresetPasswordComponentWrapper">
            <h2 className="subHeading mb-4">Reset Password</h2>
            <FormProvider {...formMethod}>
                <form className="flex flex-col gap-4" onSubmit={formMethod.handleSubmit(onSubmit)}>
                        <>
                        {showPasswordCheck && <CurrentPasswordCheck/>}
                            {showPasswordEnter && <NewPasswordEnter />}
                                {showPasswordEnter && <PrimaryButton searchText="Update" />}
                        </>
                    {updatePasswordMutation.isPending && <LoadingComponent />}
                </form>
            </FormProvider>
        </div>
    )
};
export default UpdatePassword;