"use client"
import { useFormContext } from "react-hook-form"
import SubmitError from "../submit/SubmitError"
import { IOrderDetails } from "@/app/types/orders"
const OrderTerms = () => {
  const {register,formState:{errors}} = useFormContext<IOrderDetails>()
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <label className="flex items-start space-x-3">
        <input
          type="checkbox"
          className="mt-1 h-5 w-5 text-primaryDark"
          {...register('termsAgreed',{required:'User Should Agreed to Our Terms'})}
        />
        <span className="text-primaryDark">
          I agree to the terms and conditions of our e-commerce website and confirm that my personal data will be processed in accordance with the privacy policy.
        </span>
      </label>
      {errors.termsAgreed?.message && <SubmitError message={errors.termsAgreed.message}/>}
    </div>
  )
}
export default OrderTerms