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
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
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
                {validateStatus:(status)=>{
                    return status<500
                }}
            );
            return response.data;
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message);
                if(response.data.password){
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
            <div>
                <div className="flex items-center">
                    <Lock className='text-primaryDark mr-2 h-4 w-4' />
                    <label htmlFor="originalPassword" className='primaryParagraph'>
                        Current Password <span className="text-red-500">*</span>
                    </label>
                </div>
                <div className="passwordArea relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="formItem w-full"
                        autoComplete='off'
                        {...register("originalPassword", {
                            validate: (value) => validatePassword("Current Password", value, 8) || "Invalid current password format."
                        })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                </div>
                {errors.originalPassword?.message && <SubmitError message={errors.originalPassword.message} />}
            </div>
            <div className="checkButton h-8 m-0 p-0">
                {checkPasswordMutation.isPending ? <LoadingButton /> : <PrimaryButton
                    searchText={'Check'}
                    onClick={handlePasswordCheck}
                />}
            </div>
        </>
    );
};
export default CurrentPasswordCheck;