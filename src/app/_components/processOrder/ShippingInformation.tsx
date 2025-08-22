"use client"
import { useForm, useFormContext } from "react-hook-form"
import { validateEmail, validateNumber, validateWord } from "@/app/services/helperFunctions/validatorFunctions"
import { IOrderDetails } from "@/app/types/orders"
import FormInput from "../submit/formInput/FormInput"
import { Mail, Phone, User } from "lucide-react"
const ShippingInformation = () => {
  const{register,formState:{errors}} = useFormContext<IOrderDetails>()
  return (
<div className="bg-background p-6 rounded-lg shadow-helper">
  <h2 className="text-xl font-semibold mb-4 text-primaryDark">Shipping Information</h2>
  {/* First & Last Name */}
  <div className="grid md:grid-cols-2 gap-4">
    <FormInput
      icon={User}
      label="First Name"
      id="shippingPerson.firstName"
      type="text"
      placeholder="e.g. John"
      register={register}
      rules={{
        validate: (value: string) => validateWord("First Name", value, 3, 20),
      }}
      error={errors.shippingPerson?.firstName?.message}
      required
    />
    <FormInput
      icon={User}
      label="Last Name"
      id="shippingPerson.lastName"
      type="text"
      placeholder="e.g. Doe"
      register={register}
      rules={{
        validate: (value: string) => validateWord("Last Name", value, 3, 20),
      }}
      error={errors.shippingPerson?.lastName?.message}
      required
    />
  </div>
  {/* Email & Phone */}
  <div className="grid md:grid-cols-2 gap-4 mt-4">
    <FormInput
      icon={Mail}
      label="Email"
      id="shippingPerson.email"
      type="email"
      placeholder="e.g. john.doe@example.com"
      register={register}
      rules={{
        validate: (value: string) => validateEmail("Email", value),
      }}
      error={errors.shippingPerson?.email?.message}
      required
    />
    <FormInput
      icon={Phone}
      label="Phone Number"
      id="shippingPerson.phone"
      type="tel"
      placeholder="e.g. 9801234567"
      register={register}
      rules={{
        validate: (value: string) => validateNumber("Phone", value, 10, 10),
      }}
      error={errors.shippingPerson?.phone?.message}
      required
    />
  </div>
</div>
  )
}
export default ShippingInformation