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
  placeholder: string; 
  id: string; 
  register: any; 
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
  register,
  id,
  rules,
  errors,
  passwordToogle
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<Status>("initial");
  useDebounce({
    callback: () => {
      if (errors?.[id]?.message) {
        setStatus("error");
      } else {
        setStatus("success");
      }
    },
    delay: 500,
    dependencies: [inputValue, errors?.[id]?.message]
  });
  const getBorderClass = () => {
    switch (status) {
      case "error":
        return "border-b border-red-500";
      case "success":
        return "border-b border-green-500";
      case "validating":
        return "border-b border-helper animate-pulse";
      case "initial":
      default:
        return "border-b border-primaryDark";
    }
  };
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
          className={`formItem w-full ${getBorderClass()}`}
          {...register(id, {
            ...rules,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setStatus("validating");
              setInputValue(e.target.value);
              rules?.onChange?.(e);
            }
          })}
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
      {status === "validating" && <span>Validating</span>}
      {status !== "validating" && errors?.[id]?.message && (
        <SubmitError message={errors[id].message} />
      )}
    </div>
  );
};
export default FormInput;
