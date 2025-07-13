"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm, useFormContext, useWatch } from 'react-hook-form'
import { validateConfirmPassword, validatePassword } from '@/app/services/helperFunctions/validatorFunctions'
import { Info, Lock, Eye, EyeOff } from 'lucide-react'
import { UpdatePasswordData } from './UpdatePassword'
import SubmitError from '@/app/_components/submit/SubmitError'
import { useUserDetails } from '@/app/context/UserDetailsContextComponent'
const NewPasswordEnter = () => {
    const [showresetPassword, setShowresetPassword] = useState(false);
    const [showConfirmresetPassword, setShowConfirmresetPassword] = useState(false);
    const {
        register,
        formState: { errors },
        getValues,
        control
    } = useFormContext<UpdatePasswordData>();
    const checkOriginalPassword = useWatch({control,name:'checkOriginalPassword'})
        const { userDetails } = useUserDetails();
    return (
        <div>
            <div className='mb-2'>
                <div className="flex items-center mb-1">
                    <Lock className="text-primaryDark mr-2" />
                    <label htmlFor="newresetPassword" className="text-primaryParagraph">
                        New Password <span className="text-red-500">*</span>
                    </label>
                </div>
                <div className="resetPasswordArea relative">
                    <input
                        type={showresetPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="formItem w-full"
                        autoComplete="new-resetPassword"
                        {...register('newupdatedPassword', {
                            required: "New resetPassword is required",
                            validate: (value) => validatePassword("New resetPassword", value, 8),
                        })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
                        onClick={() => setShowresetPassword(!showresetPassword)}
                        aria-label={showresetPassword ? "Hide password" : "Show password"}
                    >
                        {showresetPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                </div>
                {errors.newupdatedPassword?.message && <SubmitError message={errors.newupdatedPassword.message} />}
            </div>
            {/* Confirm New Password */}
            <div>
                <div className="flex items-center mb-1">
                    <Lock className="text-primaryDark mr-2" />
                    <label htmlFor="confirmNewresetPassword" className="text-primaryParagraph">
                        Confirm New Password <span className="text-red-500">*</span>
                    </label>
                </div>
                <div className="resetPasswordArea relative">
                    <input
                        type={showConfirmresetPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="formItem w-full"
                        autoComplete="new-resetPassword"
                        {...register('confirmupdatedPassword', {
                            required: "Please confirm your new password",
                            validate: (value) =>
                                validateConfirmPassword("Confirm New password", getValues('newupdatedPassword'), value),
                        })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
                        onClick={() => setShowConfirmresetPassword(!showConfirmresetPassword)}
                        aria-label={showConfirmresetPassword ? "Hide password" : "Show password"}
                    >
                        {showConfirmresetPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                </div>
                {errors.confirmupdatedPassword?.message && (
                    <SubmitError message={errors.confirmupdatedPassword.message} />
                )}
            </div>
        </div>
    )
}
export default NewPasswordEnter