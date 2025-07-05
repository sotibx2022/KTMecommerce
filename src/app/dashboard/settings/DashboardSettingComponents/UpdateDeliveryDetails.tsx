"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import ShippingAddress from '@/app/_components/processOrder/ShippingAddress'
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React, { useContext, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
interface DeliveryDetailsProps {
  shippingAddress: {
    street: string,
    city: string,
    state: string,
  }
}
const UpdateDeliveryDetails = () => {
  const userDetailsContext = useContext(UserDetailsContext);
  if (!userDetailsContext) {
    throw new Error("User Details Context is not defined here")
  }
  const userId = userDetailsContext.userDetails?._id
  const { data: deliveryDetails, isPending } = useQuery<APIResponseSuccess<DeliveryDetailsProps> | APIResponseError>({
    queryFn: async () => {
      const response = await axios.get('/api/deliveryDetails')
      return response.data
    },
    queryKey: ['deliveryDetails'],
  })
  const formMethods = useForm<DeliveryDetailsProps>()
useEffect(() => {
  if (isPending) {
    formMethods.setValue('shippingAddress.state', "Loading");
    formMethods.setValue('shippingAddress.city', "Loading");
    formMethods.setValue('shippingAddress.street', "Loading");
  } else {
    if (deliveryDetails?.success && deliveryDetails.data) {
      const { state, city, street } = deliveryDetails.data.shippingAddress;
      formMethods.setValue('shippingAddress.state', state);
      formMethods.setValue('shippingAddress.city', city);
      formMethods.setValue('shippingAddress.street', street);
    } else {
      formMethods.setValue('shippingAddress.state', "");
      formMethods.setValue('shippingAddress.city', "");
      formMethods.setValue('shippingAddress.street', "");
    }
  }
}, [deliveryDetails, isPending, formMethods]);
  const createDeliveryDetailsMutation = useMutation<APIResponseSuccess | APIResponseError, AxiosError, DeliveryDetailsProps>({
    mutationFn: async (data) => {
      const response = await axios.post('/api/deliveryDetails', data, {
        validateStatus: (status) => {
          return status < 500
        }
      })
      return response.data;
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message)
      } else {
        toast.success(response.message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const onSubmit = async (data: DeliveryDetailsProps) => {
    createDeliveryDetailsMutation.mutate(data)
  }
  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <ShippingAddress shadow={false}/>
          <div className="updateButton mt-2 pl-6">
            <PrimaryButton searchText='update' />
          </div>
        </form>
      </FormProvider>
      {createDeliveryDetailsMutation.isPending && <LoadingComponent />}
    </div>
  )
}
export default UpdateDeliveryDetails