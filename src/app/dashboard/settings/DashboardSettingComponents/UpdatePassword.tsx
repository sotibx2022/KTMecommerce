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
import React, { useContext, useEffect, useState } from 'react';
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
import GoogleAccountInfo from './GoogleAccountInfo';
import { trusted } from 'mongoose';
const UpdatePassword = () => {
    const [showGoogleAccountInfo, setShowGoogleAccountInfo] = useState(false);
    const context = useContext(UserDetailsContext);
    if (!context) {
        throw new Error("user detail context is not defined here.")
    }
    const { userDetails } = context;
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
    const userEmail = useWatch({
        control: formMethod.control,
        name: 'userEmail'
    })
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
                resetEmail: userEmail,
                newresetPassword: data.newupdatedPassword,
                confirmNewresetPassword: data.confirmupdatedPassword,
            }
            updatePasswordMutation.mutate(dataToSend);
        }
    };
    console.log(userDetails)
    useEffect(() => {
        if (userDetails?.passwordHistory) {
            if (userDetails!.passwordHistory) {
                formMethod.setValue('checkOriginalPassword', false)
                setShowGoogleAccountInfo(false)
            }
        }
    }, [userDetails])
    const showPasswordCheck = !checkOriginalPassword;
    const showPasswordEnter = checkOriginalPassword
    return (
        <div className="resetresetPasswordComponentWrapper">
            <h2 className="text-xl font-semibold mb-4 text-primaryDark">Update Password</h2>
            <FormProvider {...formMethod}>
                <form className="flex flex-col gap-4" onSubmit={formMethod.handleSubmit(onSubmit)}>
                    <>
                        {showPasswordCheck && <CurrentPasswordCheck />}
                        {showGoogleAccountInfo && <GoogleAccountInfo />}
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