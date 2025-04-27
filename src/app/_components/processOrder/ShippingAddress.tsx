"use client"
import { useFormContext } from "react-hook-form"
import SubmitError from "../submit/SubmitError"
import { validateNumber, validateWord } from "@/app/services/helperFunctions/validatorFunctions"
import { ICartCheckOut } from "@/app/dashboard/cartProcess/page"
const ShippingAddress = () => {
  const { register, formState: { errors } } = useFormContext<ICartCheckOut>()
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Shipping Address</h2>
      <div>
        <label className="block text-sm font-medium text-primaryDark mb-1">Street Address*</label>
        <input
          type="text"
          className="formItem"
          placeholder="Kalyanpur-5, bharatpur, chitawan"
          {...register("shippingAddress.street", {
            validate: (value) => validateWord("Street Address", value, 5, 100)
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