"use client"
import { useState } from "react"
import PaymentCardDetails from "./PaymentCardDetails"
const PaymentMethod = () => {
  const[paymentMethod,setPaymentMethod] = useState<string>("")
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Payment Method</h2>
      <div className="optionsContainer flex gap-8 my-6">
        <label className="flex items-center cursor-pointer gap-4">
          <input
            type="radio"
            name="paymentMethod"
            value="pod"
            className="peer hidden"
            onChange={()=>setPaymentMethod("pod")}
          />
          <div className="text-lg font-medium text-primaryDark p-4 border-2 border-solid border-primaryDark peer-checked:bg-primaryDark peer-checked:text-background">
            Payment On Delivery
          </div>
        </label>
        <label className="flex items-center cursor-pointer gap-4">
          <input
            type="radio"
            name="paymentMethod"
            value="online"
            className="peer hidden"
            onChange={()=>setPaymentMethod("online")}
          />
          <div className="text-lg font-medium text-primaryDark p-4 border-2 border-solid border-primaryDark peer-checked:bg-primaryDark peer-checked:text-background">
            Online Payment
          </div>
        </label>
      </div>
      {paymentMethod === "online" && <PaymentCardDetails />}
    </div>
  )
}
export default PaymentMethod