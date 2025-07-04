"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import ShippingAddress from '@/app/_components/processOrder/ShippingAddress'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
interface DeliveryDetailsProps{
  shippingAddress:{
    street:string,
    city:string,
    state:string,
  }
}
const UpdateDeliveryDetails = () => {
  const formMethods = useForm<DeliveryDetailsProps>()
  const onSubmit=async(data:DeliveryDetailsProps) =>{
console.log(data)
  }
  return (
    <div>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <ShippingAddress/>
      <div className="updateButton mt-2">
        <PrimaryButton searchText='update'/>
      </div>
      </form>
      </FormProvider>
    </div>
  )
}
export default UpdateDeliveryDetails