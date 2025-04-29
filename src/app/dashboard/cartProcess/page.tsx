"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import OrderSummary from '@/app/_components/processOrder/OrderSummary'
import OrderTerms from '@/app/_components/processOrder/OrderTerms'
import PaymentMethod from '@/app/_components/processOrder/PaymentMethod'
import ShippingAddress from '@/app/_components/processOrder/ShippingAddress'
import ShippingInformation from '@/app/_components/processOrder/ShippingInformation'
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent'
import { CartState } from '@/app/redux/cartSlice'
import { calculateTotals } from '@/app/services/helperFunctions/cartFunctions'
import { postOrderDetails } from '@/app/services/queryFunctions/orders'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { ICartItem } from '@/app/types/cart'
import { ICardDetails, IOrderDetails,IProductDetailsforOrder, IShippingAddress, IShippingPerson } from '@/app/types/orders'
import { Mutation, useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
const page = () => {
  const mutation = useMutation<
  APIResponseSuccess|APIResponseError,
  Error,
  IOrderDetails
>({
  mutationFn: postOrderDetails,
  onSuccess: (response) => {
    toast.success(response.message); // Access response data directly
  },
  onError: (error) => {
    toast.error(error.message);
  }
});
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems)
  const context = useContext(UserDetailsContext);
    if(!context){
      throw new Error("The User Details context is not working.")
    }
    const {userDetails} = context;
  const method = useForm<IOrderDetails>({mode:"onBlur"});
  const { totalItems, totalCost, discount, shippingPrice, grossTotal } = calculateTotals(cartItems);
  const onSubmit = (data: IOrderDetails) => {
    if (data.paymentMethod === 'online') {
      toast.error("Only Payment on Delivery Method is Accepted.");
      return;
    }
    if (!userDetails) {
      toast.error("User not authenticated");
      return;
    }
    const orderDetails = {
      userEmail: userDetails.email,
      items: cartItems.map((item: ICartItem) => ({
        productId: item.productId,
        quantity: item.quantity
      })),
      status: 'ordered' as const,
      paymentMethod: "paymentOnDelivery" as const,
      shippingAddress: data.shippingAddress,
      shippingPerson: data.shippingPerson
    };
    mutation.mutate(orderDetails);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
        <h2 className='subHeading'>CheckOut</h2>
          <FormProvider {...method}>
          <form className="space-y-6" onSubmit={method.handleSubmit(onSubmit)}>
            <ShippingInformation />
            <ShippingAddress />
            <PaymentMethod />
            <OrderTerms />
            <PrimaryButton searchText="Confirm"/>
          </form>
          </FormProvider>
        </div>
        <div className="md:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
export default page