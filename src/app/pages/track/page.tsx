"use client"
import { AbsoluteComponent } from '@/app/_components/absoluteComponent/AbsoluteComponent'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import OrderDetails from '@/app/_components/orderDetails/OrderDetails'
import PageHeader from '@/app/_components/pageHeader/PageHeader'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import SubmitError from '@/app/_components/submit/SubmitError'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { validateString } from '@/app/services/helperFunctions/validatorFunctions'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { IOrderDetails } from '@/app/types/orders'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { Info, Truck } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
interface IOrderNumber {
  orderNumber: string
}
const Page = () => {
  const { register, formState: { errors }, control } = useForm<IOrderNumber>({ mode: 'onBlur' })
  const [orderData, setOrderData] = useState<any>(null); // store returned order
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  const orderNumber = useWatch({
    control,
    name: 'orderNumber',
  });
  const { mutate: trackOrderMutation, isPending } = useMutation<
    APIResponseSuccess<IOrderDetails> | APIResponseError,
    AxiosError<APIResponseError>,
    IOrderNumber
  >({
    mutationFn: async ({ orderNumber }) => {
      const response = await axios.post('/api/order/trackOrder', { orderNumber });
      return response.data;
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        setOrderData(response.data); // save order
        setVisibleComponent('orderDetails')
      } else {
        toast.error(response.message);
        setOrderData(null)
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setOrderData(null);
    }
  });
  return (
    <>
      <div className="pagewrapper container  flex items-center justify-center">
        {isPending && <LoadingComponent />}
        <div>
          <PageHeader
            icon={Truck}
            headerText="Track Your Order"
            headerTagline="Stay updated on your delivery status in real-time, right from dispatch to your doorstep."
          />
          <form className="trackOrderInput" >
            <label className="text-primaryLight flex items-center">
              <Info className="text-primaryLight mr-1 inline-flex" />
              Enter Valid order Number
            </label>
            <input
              type="text"
              placeholder="eg.E1D89589"
              className="formItem mb-3"
              {...register("orderNumber", {
                validate: (value: string) => validateString("OrderNumber", value, 8, 8)
              })}
            />
            {errors.orderNumber?.message && <SubmitError message={errors.orderNumber.message} />}
            <PrimaryButton
              searchText={isPending ? 'Checking...' : 'Check'}
              onClick={() => trackOrderMutation({ orderNumber })}
            />
          </form>
          {visibleComponent === 'orderDetails' &&
            <AbsoluteComponent>
              <OrderDetails order={orderData} expandAble={false} />
            </AbsoluteComponent>
          }
        </div>
      </div></>
  );
};
export default Page;
