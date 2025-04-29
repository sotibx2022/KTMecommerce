"use client"
import { useState } from 'react'
import PaymentCardDesign from './PaymentCardDesign'
import SubmitError from '../submit/SubmitError'
import { useFormContext } from 'react-hook-form'
import { ICartCheckOut } from '@/app/dashboard/cartProcess/page'
import {
  validateNumber,
  validateFullName,
  validateDate,
} from '@/app/services/helperFunctions/validatorFunctions'
const PaymentCardDetails = () => {
  const [showBack, setShowBack] = useState(false)
  const { register, formState: { errors }, setValue, watch } = useFormContext<ICartCheckOut>()
  // Formatting functions
  const formatCardNumber = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, '$1-')
  }
  const formatExpiry = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '')
    return digitsOnly
      .slice(0, 4)
      .replace(/^(\d{2})/, '$1/')
  }
  return (
    <div>
    <div className='showDevelopmentMsg my-4'>
    <SubmitError message='Online Payment Integration is under development.'/>
    </div>
      <PaymentCardDesign
        cardNumber={watch("cardDetails.cardNumber")}
        cardName={watch("cardDetails.cardHolderName")}
        expiry={watch("cardDetails.cardExpiry")}
        cvv={watch("cardDetails.cvvNumber")}
        showBack={showBack}
      />
      {/* Form Inputs */}
      <div className="space-y-4 mt-6">
        {/* Card Number */}
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Card Number*</label>
          <input
            type="text"
            placeholder="4242-4242-4242-4242"
            className="formItem"
            {...register("cardDetails.cardNumber", {
              validate: (value) => {
                const cleanedValue = value.replace(/-/g, '')
                return validateNumber("Card number", cleanedValue, 16, 16)
              }
            })}
            onChange={(e) => {
              const formatted = formatCardNumber(e.target.value)
              setValue("cardDetails.cardNumber", formatted)
            }}
            maxLength={19}
          />
          {errors.cardDetails?.cardNumber?.message && <SubmitError message={errors.cardDetails.cardNumber.message} />}
        </div>
        {/* Cardholder Name */}
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Cardholder Name*</label>
          <input
            type="text"
            placeholder="JOHN DOE"
            className="formItem"
            {...register("cardDetails.cardHolderName", {
              validate: (value) => validateFullName("Cardholder name", value,5,20)
            })}
            onChange={(e) => {
              const upperValue = e.target.value.toUpperCase()
              setValue("cardDetails.cardHolderName", upperValue)
            }}
          />
          {errors.cardDetails?.cardHolderName?.message && <SubmitError message={errors.cardDetails.cardHolderName.message} />}
        </div>
        {/* Expiry Date & CVV */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primaryDark mb-1">Expiry Date*</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="formItem"
              {...register("cardDetails.cardExpiry", {
                validate: (value) => validateDate("Card Expiry Date",value)
              })}
              onChange={(e) => {
                const formatted = formatExpiry(e.target.value)
                setValue("cardDetails.cardExpiry", formatted)
              }}
              maxLength={5}
            />
            {errors.cardDetails?.cardExpiry?.message && <SubmitError message={errors.cardDetails.cardExpiry.message} />}
          </div>
          <div>
            <label className="block text-sm font-medium text-primaryDark mb-1">CVV*</label>
            <input
              type="text"
              placeholder="123"
              className="formItem w-24"
              {...register("cardDetails.cvvNumber", {
                required: "CVV is required",
                validate: (value) => validateNumber("CVV", value, 3, 4)
              })}
              onFocus={() => setShowBack(true)}
              onBlur={() => setShowBack(false)}
              maxLength={4}
            />
            {errors.cardDetails?.cvvNumber?.message && <SubmitError message={errors.cardDetails.cvvNumber.message} />}
          </div>
        </div>
      </div>
    </div>
  )
}
export default PaymentCardDetails