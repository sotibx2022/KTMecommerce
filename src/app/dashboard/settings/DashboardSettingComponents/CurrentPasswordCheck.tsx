"use client"
import React, { useContext, useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import { Control, useForm, useFormContext } from 'react-hook-form';
import SubmitError from '@/app/_components/submit/SubmitError';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { UpdatePasswordData } from './UpdatePassword';
import LoadingButton from '@/app/_components/primaryButton/LoadingButton';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import FormInput from '@/app/_components/submit/formInput/FormInput';
interface ICurrentPasswordCheckPayload {
    currentPassword: string;
}
const CurrentPasswordCheck = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, formState: { errors }, handleSubmit, control, watch, setValue } = useFormContext<UpdatePasswordData>();
    const currentPasswordValue = watch('originalPassword');
    const checkPasswordMutation = useMutation<
        APIResponseSuccess | APIResponseError,
        AxiosError,
        ICurrentPasswordCheckPayload
    >({
        mutationFn: async () => {
            const response = await axios.post('/api/auth/checkPassword', { currentPassword: currentPasswordValue },
                {
                    validateStatus: (status) => {
                        return status < 500
                    }
                }
            );
            return response.data;
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message);
                if (response.data.password) {
                    setValue('checkOriginalPassword', true);
                }
            } else {
                toast.error(response.message);
                setValue('checkOriginalPassword', false);
            }
        },
        onError: (error) => {
            setValue('checkOriginalPassword', false);
        }
    });
    const handlePasswordCheck = () => {
        const dataToSend: ICurrentPasswordCheckPayload = {
            currentPassword: currentPasswordValue
        }
        checkPasswordMutation.mutate(dataToSend);
    };
    return (
        <>
            <FormInput
                id="originalPassword"
                label="Current Password"
                type="password"
                placeholder="••••••••"
                required
                icon={Lock}
                register={register}
                rules={{
                    validate: (value: string) =>
                        validatePassword("Current Password", value, 8)
                }}
                error={errors.originalPassword?.message}
                passwordToogle={true}
            />
            <div className="checkButton h-8 m-0 p-0">
                {checkPasswordMutation.isPending ? <LoadingButton /> : <PrimaryButton
                    searchText={'Check'}
                    onClick={handlePasswordCheck}
                />}
            </div>
            {checkPasswordMutation.isPending && <LoadingComponent />}
        </>
    );
};
export default CurrentPasswordCheck;