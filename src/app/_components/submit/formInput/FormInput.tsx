import { LucideIcon } from "lucide-react";
import React from "react";
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
}) => {
    return (
        <div>
            <div className="flex items-center mb-1">
                <Icon className="text-primaryDark mr-2" />
                <label htmlFor={id} className="primaryParagraph">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            </div>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                className="formItem w-full"
                {...register(id, rules)}
            />
            {/* Dynamically check error for this field */}
            {errors?.[id]?.message && <SubmitError message={errors[id].message} />}
        </div>
    );
};
export default FormInput;
