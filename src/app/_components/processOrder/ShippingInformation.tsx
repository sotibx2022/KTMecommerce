"use client"
import { useForm, useFormContext } from "react-hook-form"
import SubmitError from "../submit/SubmitError"
import { validateEmail, validateNumber, validateWord } from "@/app/services/helperFunctions/validatorFunctions"
import { IOrderDetails } from "@/app/types/orders"
const ShippingInformation = () => {
  const{register,formState:{errors}} = useFormContext<IOrderDetails>()
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper">
  <h2 className="text-xl font-semibold mb-4 text-primaryDark">Shipping Information</h2>
  <div className="grid md:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium text-primaryDark">First Name*</label>
      <input
        type="text"
        className="formItem"
        placeholder="e.g. John"
        {...register("shippingPerson.firstName",{
          validate:(value)=>validateWord("First Name",value,3,20)
        })}
      />
      {errors.shippingPerson?.firstName?.message && <SubmitError message={errors.shippingPerson.firstName.message}/>}
    </div>
    <div>
      <label className="block text-sm font-medium text-primaryDark mb-1">Last Name*</label>
      <input
        type="text"
        className="formItem"
        placeholder="e.g. Doe"
        {...register("shippingPerson.lastName",{
          validate:(value)=>validateWord("Last Name",value,3,20)
        })}
      />
      {errors.shippingPerson?.lastName?.message && <SubmitError message={errors.shippingPerson.lastName.message}/>}
    </div>
  </div>
  <div className="grid md:grid-cols-2 gap-4 mt-4">
    <div>
      <label className="block text-sm font-medium text-primaryDark mb-1">Email*</label>
      <input
        type="email"
        className="formItem"
        placeholder="e.g. john.doe@example.com"
        {...register("shippingPerson.email",{
          validate:(value)=>validateEmail("Email",value)
        })}
      />
      {errors.shippingPerson?.email?.message && <SubmitError message={errors.shippingPerson.email.message}/>}
    </div>
    <div>
      <label className="block text-sm font-medium text-primaryDark mb-1">Phone Number*</label>
      <input
        type="tel"
        className="formItem"
        placeholder="e.g. 9801234567"
        {...register("shippingPerson.phone",{
          validate:(value)=>validateNumber("Phone",value,10,10)
        })}
      />
      {errors.shippingPerson?.phone?.message && <SubmitError message={errors.shippingPerson.phone.message}/>}
    </div>
  </div>
</div>
  )
}
export default ShippingInformation