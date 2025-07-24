"use client"
import PageHeader from '@/app/_components/pageHeader/PageHeader'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Info, Truck } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
interface IOrderNumber {
  orderNumber: string
}
const page = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const { mutate: trackOrderMutation, isPending } = useMutation<APIResponseSuccess | APIResponseError, AxiosError, IOrderNumber>({
    mutationFn: async () => {
      const response = await axios.post('/api/order/trackOrder', { orderNumber });
      return response.data
    },
    onSuccess: (response) => {
      toast.success(response.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  return (
    <div className="pagewrapper container max-w-[500px] flex items-center justify-center">
      <div>
        <PageHeader icon={Truck} headerText='Track Your Order' />
        <section className="trackOrderInput">
          <label className="text-primaryLight flex items-center">
            <Info className="text-primaryLight mr-1 inline-flex" />
            Enter Valid order Number
          </label>
          <input type="text" placeholder="eg.E1D89589" className="formItem mb-3" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
          <PrimaryButton searchText='Check' onClick={() => trackOrderMutation} />
        </section>
      </div>
    </div>
  )
}
export default page