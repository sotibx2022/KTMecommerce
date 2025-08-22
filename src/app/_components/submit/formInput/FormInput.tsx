"use client";
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import React, { useState } from "react";
import { useFormContext, useController } from "react-hook-form";
import SubmitError from "../SubmitError";
interface IFormInputProps {
  icon: LucideIcon;
  label: string;
  required?: boolean;
  type: string;
  placeholder: string;
  id?: string; // for backward compatibility
  name?: string; // for RHF controller
  register?: any;
  rules?: any;
  errors?: Record<string, any>;
  passwordToogle?: boolean;
}
type Status = "initial" | "validating" | "error" | "success";
const FormInput: React.FC<IFormInputProps> = ({
  icon: Icon,
  label,
  required,
  type,
  placeholder,
  id,
  name,
  register,
  rules,
  errors,
  passwordToogle,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  // Use RHF context if register is not provided
  const methods = useFormContext();
  const controllerName = name || id || "";
  const { field, fieldState } = useController({
    name: controllerName,
    rules,
    defaultValue: "",
    control: methods?.control,
  });
  const errorMessage = errors?.[id || name || ""]?.message || fieldState?.error?.message;
  const isValidating = methods?.formState.isValidating;
  const getStatus = (): Status => {
    if (isValidating) return "validating";
    if (errorMessage) return "error";
    if (inputValue || field.value) return "success";
    return "initial";
  };
  const getBorderClass = () => {
    switch (getStatus()) {
      case "error":
        return "border-b border-red-500";
      case "success":
        return "border-b border-green-500";
      case "validating":
        return "border-b-2 border-helper animate-pulse";
      case "initial":
      default:
        return "border-b border-primaryDark";
    }
  };
  return (
    <div>
      <div className="flex items-center mb-1">
        <Icon className="text-primaryDark mr-2" />
        <label htmlFor={id || name} className="primaryParagraph">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="actualInput relative">
        <input
          id={id || name}
          {...(register ? register(id, rules) : field)}
          type={passwordToogle ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className={`formItem w-full ${getBorderClass()}`}
          onChange={(e) => {
            field.onChange(e);
            setInputValue(e.target.value);
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
      {getStatus() === "validating" && <span>Validating</span>}
      {getStatus() === "error" && errorMessage && <SubmitError message={errorMessage} />}
    </div>
  );
};
export default FormInput;
