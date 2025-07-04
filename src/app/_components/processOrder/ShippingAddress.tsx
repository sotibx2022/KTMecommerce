"use client"
import { useFormContext } from "react-hook-form"
import SubmitError from "../submit/SubmitError"
import { validateNumber, validateSentence, validateWord } from "@/app/services/helperFunctions/validatorFunctions"
import { IOrderDetails } from "@/app/types/orders"
interface IshippingAddress{
shadow?:boolean
}
const ShippingAddress:React.FC<IshippingAddress> = ({shadow}) => {
  const { register, formState: { errors } } = useFormContext<IOrderDetails>()
  return (
    <div className={`bg-background p-6 rounded-lg ${shadow===false?"":"shadow-helper"}`}>
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Shipping Address</h2>
      <div>
        <label className="block text-sm font-medium text-primaryDark mb-1">Street Address*</label>
        <input
          type="text"
          className="formItem"
          placeholder="Kalyanpur-5, bharatpur, chitawan"
          {...register("shippingAddress.street", {
            validate: (value) => validateSentence("Street Address", value, 5, 100)
          })}
        />
        {errors.shippingAddress?.street?.message && 
          <SubmitError message={errors.shippingAddress.street.message} />
        }
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">City*</label>
          <input
            type="text"
            className="formItem"
            placeholder="Bharatpur"
            {...register("shippingAddress.city", {
              validate: (value) => validateWord("City", value, 3, 50)
            })}
          />
          {errors.shippingAddress?.city?.message && 
            <SubmitError message={errors.shippingAddress.city.message} />
          }
        </div>
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">State/Province*</label>
          <input
            type="text"
            className="formItem"
            placeholder="Narayani"
            {...register("shippingAddress.state", {
              validate: (value) => validateWord("State/Province", value, 3, 50)
            })}
          />
          {errors.shippingAddress?.state?.message && 
            <SubmitError message={errors.shippingAddress.state.message} />
          }
        </div>
      </div>
    </div>
  )
}
export default ShippingAddress