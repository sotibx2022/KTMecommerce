"use client";
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faEnvelope, faLock, faCaretRight, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitError from '../submit/SubmitError';
import { validateEmail, validatePassword, validateConfirmPassword } from '@/app/services/helperFunctions/validatorFunctions';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import toast from 'react-hot-toast';
type ResetPasswordData = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
};
const ResetPasswordComponent = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<ResetPasswordData>({ mode: 'onBlur' });
  const updateNewPassword = async (data: ResetPasswordData): Promise<APIResponseSuccess | APIResponseError> => {
    setVisibleComponent('loadingComponent');
    try {
      const response = await axios.post('/api/auth/resetPassword', { data });
      return response.data;
    } catch (error) {
      return { message: "Axios Error Occurred.", status: 400, success: false };
    }
  };
  const resetPasswordMutation = useMutation<APIResponseSuccess | APIResponseError, Error, ResetPasswordData>({
    mutationFn: updateNewPassword,
    onSuccess: (response) => {
      toast.success(response.message);
      setVisibleComponent('');
    },
    onError: (error) => {
      toast.error(error.message);
      setVisibleComponent('');
    }
  });
  const onSubmit = async (data: ResetPasswordData) => {
    resetPasswordMutation.mutate(data);
  };
  return (
    <>
      {visibleComponent === 'loadingComponent' ? (
        <LoadingComponent />
      ) : (
        <AbsoluteComponent>
          <div className="bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative">
            <div className="resetPasswordComponentWrapper">
              <h2 className="subHeading mb-4">Reset Password</h2>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
                <div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faEnvelope} className="text-primaryDark mr-2" />
                    <label htmlFor="email" className="text-primaryParagraph">
                      Email <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="formItem w-full"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      validate: (value) => validateEmail("Email", value),
                    })}
                  />
                  {errors.email?.message && <SubmitError message={errors.email.message} />}
                </div>
                {/* New Password */}
                <div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faLock} className="text-primaryDark mr-2" />
                    <label htmlFor="newPassword" className="text-primaryParagraph">
                      New Password <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="passwordArea relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="formItem w-full"
                      autoComplete="new-password"
                      id="newPassword"
                      {...register("newPassword", {
                        required: "New password is required",
                        validate: (value) => validatePassword("New Password", value, 8),
                      })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.newPassword?.message && <SubmitError message={errors.newPassword.message} />}
                </div>
                {/* Confirm New Password */}
                <div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faLock} className="text-primaryDark mr-2" />
                    <label htmlFor="confirmNewPassword" className="text-primaryParagraph">
                      Confirm New Password <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="passwordArea relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="formItem w-full"
                      autoComplete="new-password"
                      id="confirmNewPassword"
                      {...register("confirmNewPassword", {
                        required: "Please confirm your new password",
                        validate: (value) =>
                          validateConfirmPassword("Confirm New Password", getValues("newPassword"), value),
                      })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary transition-colors"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.confirmNewPassword?.message && (
                    <SubmitError message={errors.confirmNewPassword.message} />
                  )}
                </div>
                <PrimaryButton searchText="Reset" />
              </form>
              <div className="usefulLinks mt-6 space-y-3 border-t border-primaryLight pt-4">
                <p className="primaryParagraph">
                  <FontAwesomeIcon icon={faCaretRight} className="mr-2 text-primaryDark" />
                  Remember your password?{" "}
                  <span className="link" onClick={() => setVisibleComponent("login")}>
                    Login
                  </span>
                </p>
                <p className="primaryParagraph">
                  <FontAwesomeIcon icon={faCaretRight} className="mr-2 text-primaryDark" />
                  Not Registered Yet?{" "}
                  <span className="link" onClick={() => setVisibleComponent("register")}>
                    Register
                  </span>
                </p>
              </div>
            </div>
          </div>
        </AbsoluteComponent>
      )}
      {visibleComponent === "login" && <LoginComponent />}
      {visibleComponent === "register" && <RegisterComponent />}
    </>
  );
};
export default ResetPasswordComponent;