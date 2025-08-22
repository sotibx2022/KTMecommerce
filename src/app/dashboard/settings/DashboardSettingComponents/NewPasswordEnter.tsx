"use client";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { validateConfirmPassword, validatePassword } from "@/app/services/helperFunctions/validatorFunctions";
import { Lock } from "lucide-react";
import { UpdatePasswordData } from "./UpdatePassword";
import FormInput from "@/app/_components/submit/formInput/FormInput";
const NewPasswordEnter = () => {
    const {
        register,
        formState: { errors },
        control,
    } = useFormContext<UpdatePasswordData>();
    // Watch the first password field
    const newPasswordValue = useWatch({ control, name: "newupdatedPassword" });
    return (
        <div>
            {/* New Password */}
            <FormInput
                id="newupdatedPassword"
                label="New Password"
                type="password"
                placeholder="••••••••"
                required
                icon={Lock}
                register={register}
                rules={{
                    required: "New password is required",
                    validate: (value: string) => validatePassword("New password", value, 8),
                }}
                error={errors.newupdatedPassword?.message}
                passwordToogle={true}
            />
            {/* Confirm New Password */}
            <FormInput
                id="confirmupdatedPassword"
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                required
                icon={Lock}
                register={register}
                rules={{
                    required: "Please confirm your new password",
                    validate: (value: string) =>
                        validateConfirmPassword("Confirm New password", newPasswordValue, value),
                }}
                error={errors.confirmupdatedPassword?.message}
                passwordToogle={true}
            />
        </div>
    );
};
export default NewPasswordEnter;
