"use client"
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import React, { useState } from "react";
import SubmitError from "../SubmitError";
import { useDebounce } from "@/app/hooks/generalHooks/useDebounce";
interface IFormInputProps {
    icon: LucideIcon;
    label: string;
    required?: boolean;
    type: string;
    placeholder?: string;
    id: string;
    register: any;
    rules?: any;
    error?: string;
    passwordToogle?: boolean;
    disabled?:boolean;
    readonly?:boolean;
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
    error,
    passwordToogle,
    disabled,readonly
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [showError, setShowError] = useState<boolean | null>(null);
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setShowError(false);
    };
    useDebounce({
        callback: () => {
            setShowError(true);
        },
        delay: 500,
        dependencies: [inputValue],
    });
    const generateInputClassNames = () => {
        if (error && showError) {
            return "bg-red-500 border-b-2 border-red-500";
        } else if (!showError) {
            return "bg-helper border-b-2 border-helper animatepulse";
        } else if (inputValue !== "" && !error && showError) {
            return "bg-green-500 border-b-2 border-green-500";
        } else {
            return "bg-backgroundLight border-b-2 border-primaryLight";
        }
    };
    const { onChange, ...rest } = register(id, { ...rules });
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
                    type={passwordToogle ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readonly}
                    className={`formItem w-full ${generateInputClassNames()}`}
                    {...rest}
                    onChange={(e) => {
                        inputChangeHandler(e);
                        onChange(e);
                    }}
                />
                {passwordToogle && (
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute cursor-pointer right-[5px] top-1/2 -translate-y-1/2 text-primaryDark duration-300 hover:text-helper"
                    >
                        {showPassword ? <EyeOff /> : <Eye />}
                    </div>
                )}
            </div>
            {error && showError && (
                <SubmitError message={error} />
            )}
        </div>
    );
};
export default FormInput;
