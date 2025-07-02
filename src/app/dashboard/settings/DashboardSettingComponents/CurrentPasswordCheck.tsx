"use client"
import React, { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react';
import { validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import { useForm } from 'react-hook-form';
import SubmitError from '@/app/_components/submit/SubmitError';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
interface ICurrentPasswordCheck {
    currentPassword: string
}
const CurrentPasswordCheck = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { register, formState: { errors }, handleSubmit, control } = useForm<ICurrentPasswordCheck>({ mode: 'onChange' })
    const checkPasswordMutation = useMutation<APIResponseSuccess | APIResponseError, AxiosError, ICurrentPasswordCheck>({
        mutationFn: async (data: ICurrentPasswordCheck) => {
            const response = await axios.post('/api/auth/checkPassword', data);
            return response.data
        }, onSuccess: (response) => {
            if (response.success) {
                toast.success(response.message)
            } else {
                toast.error(response.message)
            }
        }, onError: (error) => {
            toast.error(error.message)
        }
    })
    const onSubmit = async (data: ICurrentPasswordCheck) => {
        checkPasswordMutation.mutate(data)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex items-center gap-4'>
            <div>
                <div className="flex items-center">
                    <Lock className='text-primaryDark mr-2 h-4 w-4' />
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
                        {...register("currentPassword", {
                            validate: (value) => validatePassword("Password", value, 8)
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
                {errors.currentPassword?.message && <SubmitError message={errors.currentPassword.message} />}
            </div>
            <div className="checkButton h-8 m-0 p-0">
                <PrimaryButton searchText='Update' />
            </div>
        </form>
    )
}
export default CurrentPasswordCheck