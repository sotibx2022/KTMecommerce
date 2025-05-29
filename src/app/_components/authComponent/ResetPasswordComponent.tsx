"use client";
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faEnvelope, faLock, faCaretRight, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitError from '../submit/SubmitError';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import toast from 'react-hot-toast';
import { validateConfirmPassword, validateEmail, validatePassword } from '@/app/services/helperFunctions/validatorFunctions';
type ResetresetPasswordData = {
  resetEmail: string;
  newresetPassword: string;
  confirmNewresetPassword: string;
};
const ResetresetPasswordComponent = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const [showresetPassword, setShowresetPassword] = useState(false);
  const [showConfirmresetPassword, setShowConfirmresetPassword] = useState(false);
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<ResetresetPasswordData>({ mode: 'onBlur' });
  const updateNewresetPassword = async (data: ResetresetPasswordData): Promise<APIResponseSuccess | APIResponseError> => {
    setVisibleComponent('loadingComponent');
    try {
      const response = await axios.post('/api/auth/resetresetPassword', { data });
      return response.data;
    } catch (error) {
      return { message: "Axios Error Occurred.", status: 400, success: false };
    }
  };
  const resetresetPasswordMutation = useMutation<APIResponseSuccess | APIResponseError, Error, ResetresetPasswordData>({
    mutationFn: updateNewresetPassword,
    onSuccess: (response) => {
      toast.success(response.message);
      setVisibleComponent('');
    },
    onError: (error) => {
      toast.error(error.message);
      setVisibleComponent('');
    }
  });
  const onSubmit = async (data: ResetresetPasswordData) => {
    resetresetPasswordMutation.mutate(data);
  };
  return (
    <>
      {visibleComponent === 'loadingComponent' ? (
        <LoadingComponent />
      ) : (
        <AbsoluteComponent>
          <div className="bg-background max-w-[400px] p-6 rounded-lg shadow-lg relative">
            <div className="resetresetPasswordComponentWrapper">
              <h2 className="subHeading mb-4">Reset resetPassword</h2>
              <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                {/* resetEmail */}
                <div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faEnvelope} className="text-primaryDark mr-2" />
                    <label htmlFor="resetEmail" className="text-primaryParagraph">
                      resetEmail <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <input
                    type="resetEmail"
                    placeholder="your@resetEmail.com"
                    className="formItem w-full"
                    id="resetEmail"
                    {...register("resetEmail", {
                      required: "resetEmail is required",
                      validate: (value) => validateEmail("resetEmail", value),
                    })}
                  />
                  {errors.resetEmail?.message && <SubmitError message={errors.resetEmail.message} />}
                </div>
                {/* New resetPassword */}
                <div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faLock} className="text-primaryDark mr-2" />
                    <label htmlFor="newresetPassword" className="text-primaryParagraph">
                      New resetPassword <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="resetPasswordArea relative">
                    <input
                      type={showresetPassword ? "text" : "resetPassword"}
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
                      <FontAwesomeIcon icon={showresetPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.newresetPassword?.message && <SubmitError message={errors.newresetPassword.message} />}
                </div>
                {/* Confirm New resetPassword */}
                <div>
                  <div className="flex items-center mb-1">
                    <FontAwesomeIcon icon={faLock} className="text-primaryDark mr-2" />
                    <label htmlFor="confirmNewresetPassword" className="text-primaryParagraph">
                      Confirm New resetPassword <span className="text-red-500">*</span>
                    </label>
                  </div>
                  <div className="resetPasswordArea relative">
                    <input
                      type={showConfirmresetPassword ? "text" : "resetPassword"}
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
                      <FontAwesomeIcon icon={showConfirmresetPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  {errors.confirmNewresetPassword?.message && (
                    <SubmitError message={errors.confirmNewresetPassword.message} />
                  )}
                </div>
                <PrimaryButton searchText="Reset" />
              </form>
              <div className="usefulLinks mt-6 space-y-3 border-t border-primaryLight pt-4">
                <p className="primaryParagraph">
                  <FontAwesomeIcon icon={faCaretRight} className="mr-2 text-primaryDark" />
                  Remember your resetPassword?{" "}
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
export default ResetresetPasswordComponent;