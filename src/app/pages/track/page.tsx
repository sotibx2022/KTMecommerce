"use client"
import { AbsoluteComponent } from '@/app/_components/absoluteComponent/AbsoluteComponent'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import OrderDetails from '@/app/_components/orderDetails/OrderDetails'
import PageHeader from '@/app/_components/pageHeader/PageHeader'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import FormInput from '@/app/_components/submit/formInput/FormInput'
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
  const { register, formState: { errors }, control, handleSubmit } = useForm<IOrderNumber>({ mode: 'onBlur' })
  const [orderData, setOrderData] = useState<any>(null)
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
        setOrderData(response.data);
        setVisibleComponent('orderDetails');
      } else {
        toast.error(response.message);
        setOrderData(null);
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setOrderData(null);
    }
  });
  // Form submit handler
  const onSubmit = (data: IOrderNumber) => {
    trackOrderMutation({ orderNumber: data.orderNumber.toString().toLowerCase() });
  }
  return (
    <div className="pagewrapper container flex items-center justify-center">
      {isPending && <LoadingComponent />}
      <div>
        <PageHeader
          icon={Truck}
          headerText="Track Your Order"
          headerTagline="Stay updated on your delivery status in real-time, right from dispatch to your doorstep."
        />
        <form
          className="trackOrderInput max-w-[500px] flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)} // use handleSubmit here
        >
          <FormInput
            icon={Info}
            label="Enter Valid Order Number"
            id="orderNumber"
            type="text"
            placeholder="eg. E1D89589"
            register={register}
            rules={{
              validate: (value: string) => validateString("Order Number", value, 8, 8),
            }}
            error={errors.orderNumber?.message}
            required
          />
          <PrimaryButton
            searchText={isPending ? 'Checking...' : 'Check'}
          />
        </form>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 mt-4">
          <Info className="w-5 h-5 text-green-600" />
          <div>
            <span className="font-medium">Demo Order #:</span>{" "}
            <span className="font-mono bg-green-100 px-2 py-1 rounded text-green-700">
              E1D89589
            </span>
          </div>
        </div>
        {visibleComponent === 'orderDetails' &&
          <AbsoluteComponent>
            <OrderDetails order={orderData} expandAble={false} />
          </AbsoluteComponent>
        }
      </div>
    </div>
  );
};
export default Page;
