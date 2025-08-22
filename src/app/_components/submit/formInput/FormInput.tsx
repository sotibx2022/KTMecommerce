"use client"
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import React, { useState } from "react";
import SubmitError from "../SubmitError";
interface IFormInputProps {
    icon: LucideIcon;
    label: string;
    required?: boolean;
    type: string;
    placeholder: string;
    id: string;
    register: any;
    rules?: any;
    errors?: Record<string, any>;
    passwordToogle?: boolean;
}
const FormInput: React.FC<IFormInputProps> = ({
    icon: Icon,
    label,
    required,
    type,
    placeholder,
    register,
    id,
    rules,
    errors,
    passwordToogle
}) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
            <div className="flex items-center mb-1">
                <Icon className="text-primaryDark mr-2" />
                <label htmlFor={id} className="primaryParagraph">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            </div>
            <div className="actualInput relative">
                <input
                    id={id}
                    type={passwordToogle ? type === 'password' : type}
                    placeholder={placeholder}
                    className="formItem w-full"
                    {...register(id, rules)}
                />
                {passwordToogle && (
                    showPassword ? (
                        <EyeOff
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute -right-4 top-1/2 -translate-y-1/2"
                        />
                    ) : (
                        <Eye
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute -right-4 top-1/2 -translate-y-1/2"
                        />
                    )
                )}
            </div>
            {/* Dynamically check error for this field */}
            {errors?.[id]?.message && <SubmitError message={errors[id].message} />}
        </div>
    );
};
export default FormInput;
