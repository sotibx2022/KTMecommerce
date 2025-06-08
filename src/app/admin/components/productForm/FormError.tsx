"use client"
import React from 'react';
import { Path, useFormContext } from 'react-hook-form';
import { IAddProductFormData } from '../products';
import SubmitError from '@/app/_components/submit/SubmitError';
interface IFormError {
    name: Path<IAddProductFormData>;
}
const FormError: React.FC<IFormError> = ({ name }) => {
    const { formState } = useFormContext<IAddProductFormData>();
    const getNested = (obj: any) => name.split('.').reduce((o, k) => o?.[k], obj);
    const message = getNested(formState.errors)?.message;
    const show = message && (getNested(formState.touchedFields) || formState.isSubmitted);
    return show ? <SubmitError message={message} /> : null;
};
export default FormError;