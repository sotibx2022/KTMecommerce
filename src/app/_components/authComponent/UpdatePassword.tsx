"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import SubmitError from '../submit/SubmitError'
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm, useFormContext, useWatch } from 'react-hook-form'
import { ResetresetPasswordData } from './ResetPasswordComponent'
import { validateConfirmPassword, validatePassword } from '@/app/services/helperFunctions/validatorFunctions'
import { Info } from 'lucide-react'
const UpdatePassword = () => {
    const [showresetPassword, setShowresetPassword] = useState(false);
    const [showConfirmresetPassword, setShowConfirmresetPassword] = useState(false);
    const {
        register,
        formState: { errors },
        getValues,
        control
    } = useFormContext<ResetresetPasswordData>();
    const passwordExist = useWatch({control,name:'passwordExist'})
    return (
        <div>
            {!passwordExist && (
              <div className="bg-blue-50 border-l-4 border-primaryLight p-4 mb-4 rounded text-sm">
                <div className="flex flex-col gap-2">
                  <div className="flex gap-1">
                    <Info className="text-helper"/>
                  <p className="text-primaryDark font-medium">Google Account Detected</p>
                  </div>
                  <div>
                    <p className="text-primaryLight">
                      No password set. Create one to enable email login.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div>
                <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faLock} className="text-primaryDark mr-2" />
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
                        {...register("newresetPassword", {
                            required: "New resetPassword is required",
                            validate: (value) => validatePassword("New resetPassword", value, 8),
                        })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
                        onClick={() => setShowresetPassword(!showresetPassword)}
                        aria-label={showresetPassword ? "Hide resetPassword" : "Show resetPassword"}
                    >
                        <FontAwesomeIcon icon={showresetPassword ? faEye : faEyeSlash} />
                    </button>
                </div>
                {errors.newresetPassword?.message && <SubmitError message={errors.newresetPassword.message} />}
            </div>
            {/* Confirm New resetPassword */}
            <div>
                <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faLock} className="text-primaryDark mr-2" />
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
                        {...register("confirmNewresetPassword", {
                            required: "Please confirm your new resetPassword",
                            validate: (value) =>
                                validateConfirmPassword("Confirm New resetPassword", getValues("newresetPassword"), value),
                        })}
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
                        onClick={() => setShowConfirmresetPassword(!showConfirmresetPassword)}
                        aria-label={showConfirmresetPassword ? "Hide resetPassword" : "Show resetPassword"}
                    >
                        <FontAwesomeIcon icon={showresetPassword ? faEye : faEyeSlash} />
                    </button>
                </div>
                {errors.confirmNewresetPassword?.message && (
                    <SubmitError message={errors.confirmNewresetPassword.message} />
                )}
            </div>
        </div>
    )
}
export default UpdatePassword