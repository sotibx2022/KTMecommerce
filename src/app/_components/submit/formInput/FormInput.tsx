"use client"
import { Eye, EyeOff, LucideIcon } from "lucide-react";
import React, { useReducer, useState } from "react";
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
interface State { 
  cssValue: string; 
} 
interface Action { 
  type: "error" | "success" | "validating" | "initial"; 
} 
const initialState: State = { cssValue: "border-b border-primaryDark" }; 
const reducer = (state: State, action: Action): State => { 
  switch (action.type) {
    case "error":
      return { cssValue: "border-b border-red-500" };
    case "success":
      return { cssValue: "border-b border-green-500" };
    case "validating":
      return { cssValue: "border-b border-helper animate-pulse" };
    case "initial":
    default:
      return { cssValue: "border-b border-primaryDark" };
  }
};
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");
  useDebounce({
    callback: () => {
      if (errors?.[id]?.message) {
        dispatch({ type: "error" });
      } else {
        dispatch({ type: "success" });
      }
    },
    delay: 500,
    dependencies: [inputValue, errors?.[id]?.message]
  });
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
          className={`formItem w-full ${state.cssValue}`}
          {...register(id, {
            ...rules,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              dispatch({ type: "validating" });
              setInputValue(e.target.value);
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
      {errors?.[id]?.message && <SubmitError message={errors[id].message} />}
    </div>
  );
};
export default FormInput;
