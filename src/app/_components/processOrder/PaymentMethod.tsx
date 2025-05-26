"use client"
import { useFormContext } from "react-hook-form"
import PaymentCardDetails from "./PaymentCardDetails"
import SubmitError from "../submit/SubmitError"
import { useState } from "react"
import { IOrderDetails } from "@/app/types/orders"
const PaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState<string>("")
  const { register, formState: { errors } } = useFormContext<IOrderDetails>()
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Payment Method</h2>
      <div className="optionsContainer flex gap-8 my-6">
        <label className="flex items-center cursor-pointer gap-4">
          <input
            type="radio"
            value="paymentOnDelivery"
            className="peer hidden"
            {...register("paymentMethod", {
              required: "Please select a payment method"
            })}
          />
          <div className="text-base sm:text-lg font-medium text-primaryDark p-4 border-2 border-solid border-primaryDark peer-checked:bg-primaryDark peer-checked:text-background">
            Pay On Delivery
          </div>
        </label>
        <label className="flex items-center cursor-pointer gap-4">
          <input
            type="radio"
            value="online"
            className="peer hidden"
            {...register("paymentMethod")}
          />
          <div className="text-base sm:text-lg font-medium text-primaryDark p-4 border-2 border-solid border-primaryDark peer-checked:bg-primaryDark peer-checked:text-background">
            Online Payment
          </div>
        </label>
      </div>
      {errors.paymentMethod?.message && (
        <SubmitError message={errors.paymentMethod.message} />
      )}
      {paymentMethod === 'online' && <PaymentCardDetails />}
    </div>
  )
}
export default PaymentMethod