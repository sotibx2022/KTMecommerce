"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import ShippingAddress from '@/app/_components/processOrder/ShippingAddress'
import { useUserDetails } from '@/app/context/UserDetailsContextComponent'
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
  const {userDetails} = useUserDetails()
  const userId = userDetails?._id
  const formMethods = useForm<DeliveryDetailsProps>()
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