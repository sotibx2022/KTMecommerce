"use client";
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { faEnvelope, faLock, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import SubmitError from '../submit/SubmitError';
import { validateEmail, validatePassword, validateConfirmPassword } from '@/app/services/helperFunctions/validatorFunctions';
import LoadingButton from '../primaryButton/LoadingButton';
import { AbsoluteComponent } from '../absoluteComponent/AbsoluteComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import LoadingComponent from '../loadingComponent/LoadingComponent';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
type ResetPasswordData = {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
};
const ResetPasswordComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<ResetPasswordData>({ mode: 'onBlur' });
  const onSubmit = async (data: ResetPasswordData) => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (!user || user.email !== data.email) {
        throw new Error("Authenticated user email does not match or user not found.");
      }
      // Prompt reauthentication with existing password (you can ask for old password via another input if needed)
      const currentPassword = prompt("Please enter your current password to re-authenticate:");
      if (!currentPassword) throw new Error("Reauthentication cancelled.");
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, data.newPassword);
      alert("Password updated successfully!");
      reset();
      setVisibleComponent("login");
    } catch (error: any) {
      console.error("Error resetting password:", error);
      alert(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
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
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="formItem w-full"
                    autoComplete="new-password"
                    id="newPassword"
                    {...register("newPassword", {
                      required: "New password is required",
                      validate: (value) => validatePassword("New Password", value, 8),
                    })}
                  />
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
                  <input
                    type="password"
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
                  {errors.confirmNewPassword?.message && (
                    <SubmitError message={errors.confirmNewPassword.message} />
                  )}
                </div>
                {isLoading ? <LoadingButton /> : <PrimaryButton searchText="Reset" />}
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
