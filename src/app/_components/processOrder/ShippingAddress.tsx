"use client"
interface DeliveryDetailsProps {
  shippingAddress: {
    street: string,
    city: string,
    state: string,
  }
}
import { useFormContext } from "react-hook-form"
import { validateNumber, validateSentence, validateWord } from "@/app/services/helperFunctions/validatorFunctions"
import { IOrderDetails } from "@/app/types/orders"
import { useEffect } from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { APIResponseError, APIResponseSuccess } from "@/app/services/queryFunctions/users"
import FormInput from "../submit/formInput/FormInput"
import { Building, Home, MapPin } from "lucide-react"
interface IshippingAddress {
  shadow?: boolean
}
const ShippingAddress: React.FC<IshippingAddress> = ({ shadow }) => {
  const { register, setValue, formState: { errors } } = useFormContext<IOrderDetails>()
  const { data: deliveryDetails, isPending } = useQuery<APIResponseSuccess<DeliveryDetailsProps> | APIResponseError>({
    queryFn: async () => {
      const response = await axios.get('/api/deliveryDetails')
      return response.data
    },
    queryKey: ['deliveryDetails'],
  })
  useEffect(() => {
    if (isPending) {
      setValue('shippingAddress.state', "Loading");
      setValue('shippingAddress.city', "Loading");
      setValue('shippingAddress.street', "Loading");
    } else {
      if (deliveryDetails?.success && deliveryDetails.data) {
        const { state, city, street } = deliveryDetails.data.shippingAddress;
        setValue('shippingAddress.state', state);
        setValue('shippingAddress.city', city);
        setValue('shippingAddress.street', street);
      } else {
        setValue('shippingAddress.state', "");
        setValue('shippingAddress.city', "");
        setValue('shippingAddress.street', "");
      }
    }
  }, [deliveryDetails, isPending, setValue]);
  return (
    <div className={`bg-background p-6 rounded-lg ${shadow === false ? "" : "shadow-helper"}`}>
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Shipping Address</h2>
      {/* Street Address */}
      <FormInput
        icon={Home}
        label="Street Address"
        id="shippingAddress.street"
        type="text"
        placeholder="Kalyanpur-5, Bharatpur, Chitwan"
        register={register}
        rules={{
          validate: (value: string) => validateSentence("Street Address", value, 5, 100),
        }}
        error={errors.shippingAddress?.street?.message}
        required
      />
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        {/* City */}
        <FormInput
          icon={MapPin}
          label="City"
          id="shippingAddress.city"
          type="text"
          placeholder="Bharatpur"
          register={register}
          rules={{
            validate: (value: string) => validateWord("City", value, 3, 50),
          }}
          error={errors.shippingAddress?.city?.message}
          required
        />
        {/* State/Province */}
        <FormInput
          icon={Building}
          label="State/Province"
          id="shippingAddress.state"
          type="text"
          placeholder="Narayani"
          register={register}
          rules={{
            validate: (value: string) => validateWord("State/Province", value, 3, 50),
          }}
          error={errors.shippingAddress?.state?.message}
          required
        />
      </div>
    </div>
  )
}
export default ShippingAddress