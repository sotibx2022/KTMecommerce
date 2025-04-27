"use client"
import { useFormContext } from "react-hook-form"
import PaymentCardDetails from "./PaymentCardDetails"
import SubmitError from "../submit/SubmitError"
import { ICartCheckOut } from "@/app/dashboard/cartProcess/page"
import { useState } from "react"
const PaymentMethod = () => {
  const[paymentMethod, setPaymentMethod] = useState<string>("")
  const { register, formState: { errors } } = useFormContext<ICartCheckOut>()
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Payment Method</h2>
      <div className="optionsContainer flex gap-8 my-6">
        <label className="flex items-center cursor-pointer gap-4">
          <input
            type="radio"
            value="pod"
            className="peer hidden"
            {...register("paymentMethod", {
              required: "Please select a payment method"
            })}
            onChange={()=>setPaymentMethod('pod')}
          />
          <div className="text-lg font-medium text-primaryDark p-4 border-2 border-solid border-primaryDark peer-checked:bg-primaryDark peer-checked:text-background">
            Payment On Delivery
          </div>
        </label>
        <label className="flex items-center cursor-pointer gap-4">
          <input
            type="radio"
            value="online"
            className="peer hidden"
            {...register("paymentMethod")}
            onChange={()=>setPaymentMethod("online")}
          />
          <div className="text-lg font-medium text-primaryDark p-4 border-2 border-solid border-primaryDark peer-checked:bg-primaryDark peer-checked:text-background">
            Online Payment
          </div>
        </label>
      </div>
      {errors.paymentMethod?.message && (
        <SubmitError message={errors.paymentMethod.message} />
      )}
      {paymentMethod && <PaymentCardDetails/>}
    </div>
  )
}
export default PaymentMethod