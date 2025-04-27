"use client"
import { ICartCheckOut } from "@/app/dashboard/cartProcess/page"
import { useForm, useFormContext } from "react-hook-form"
import SubmitError from "../submit/SubmitError"
import { validateEmail, validateNumber, validateWord } from "@/app/services/helperFunctions/validatorFunctions"
const ShippingInformation = () => {
  const{register,formState:{errors}} = useFormContext<ICartCheckOut>()
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Shipping Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-primaryDark">First Name*</label>
          <input
            type="text"
            className="formItem"
            {...register("shipping.firstName",{
              validate:(value)=>validateWord("First Name",value,3,20)
            })}
          />
          {errors.shipping?.firstName?.message && <SubmitError message={errors.shipping.firstName.message}/>}
        </div>
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Last Name*</label>
          <input
            type="text"
            className="formItem"
            {...register("shipping.lastName",{
              validate:(value)=>validateWord("Last Name",value,3,20)
            })}
          />
           {errors.shipping?.lastName?.message && <SubmitError message={errors.shipping.lastName.message}/>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Email*</label>
          <input
            type="email"
            className="formItem"
            {...register("shipping.email",{
              validate:(value)=>validateEmail("Email",value,)
            })}
          />
           {errors.shipping?.email?.message && <SubmitError message={errors.shipping.email.message}/>}
        </div>
        <div>
          <label className="block text-sm font-medium text-primaryDark mb-1">Phone Number*</label>
          <input
            type="tel"
            className="formItem"
            {...register("shipping.phone",{
              validate:(value)=>validateNumber("Phone",value,10,10)
            })}
          />
           {errors.shipping?.phone?.message && <SubmitError message={errors.shipping.phone.message}/>}
        </div>
      </div>
    </div>
  )
}
export default ShippingInformation