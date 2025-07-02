"use client"
interface UpdatePasswordProps {
    updatePassword: string,
    confirmUpdatePassword: string,
}
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import SubmitError from '@/app/_components/submit/SubmitError';
import { validateConfirmPassword, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
import { Eye, EyeOff, Lock } from 'lucide-react';
import React, { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form';
const NewPasswordEnter = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const { register, formState: { errors }, handleSubmit, control } = useForm<UpdatePasswordProps>({ mode: 'onChange' })
    const updatePasswordValue = useWatch({ control, name: 'updatePassword' })
    const onSubmit = (data: UpdatePasswordProps) => {
        console.log(data)
    }
  return (
    <div>
        <form className="flex items-center flex-wrap gap-2" onSubmit={handleSubmit(onSubmit)}>
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
                                {...register("updatePassword", {
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
                        {errors.updatePassword?.message && <SubmitError message={errors.updatePassword.message} />}
                    </div>
                    <div>
                        <div className="flex items-center">
                            <Lock className='text-primaryDark mr-2 h-4 w-4' />
                            <label htmlFor="password" className='primaryParagraph'>
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <div className="passwordArea relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                className="formItem w-full"
                                autoComplete='off'
                                {...register("confirmUpdatePassword", {
                                    validate: (value) => validateConfirmPassword("Confirm Password", updatePasswordValue, value)
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
                        {errors.confirmUpdatePassword?.message && <SubmitError message={errors.confirmUpdatePassword.message} />}
                    </div>
                    <div className="updateButton h-8 m-0 p-0">
                        <PrimaryButton searchText='Update' />
                    </div>
                </form>
    </div>
  )
}
export default NewPasswordEnter