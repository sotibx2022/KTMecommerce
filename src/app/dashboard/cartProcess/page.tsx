"use client"
interface IStripeResponseData {
  data: {
    type: string,
    url: string,
  },
  message: string,
  success: boolean,
}
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide'
import OrderDetails from '@/app/_components/orderDetails/OrderDetails'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import OrderSummary from '@/app/_components/processOrder/OrderSummary'
import OrderTerms from '@/app/_components/processOrder/OrderTerms'
import PaymentMethod from '@/app/_components/processOrder/PaymentMethod'
import ShippingAddress from '@/app/_components/processOrder/ShippingAddress'
import ShippingInformation from '@/app/_components/processOrder/ShippingInformation'
import ConfettiComponent from '@/app/_components/submit/ConfettiComponent'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { useUserDetails } from '@/app/context/UserDetailsContextComponent'
import { CartState, clearCartItems } from '@/app/redux/cartSlice'
import { calculateTotals } from '@/app/services/helperFunctions/cartFunctions'
import { postOrderDetails } from '@/app/services/queryFunctions/orders'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { ICartItem } from '@/app/types/cart'
import { IOrderDetails, TOrderStatus, TPaymentMethod } from '@/app/types/orders'
import { Mutation, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
const page = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  const [showConfetti, setShowConfetti] = useState(false);
  const { userDetails } = useUserDetails();
  const router = useRouter();
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);
  const dispatch = useDispatch()
  const mutation = useMutation<
    APIResponseSuccess<IOrderDetails> | IStripeResponseData | APIResponseError,
    Error,
    IOrderDetails
  >({
    mutationFn: postOrderDetails,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        const hasStripeUrl = (data: any): data is { url: string } => {
          return data && typeof data.url === 'string';
        };
        const urlToDirect = hasStripeUrl(response.data) ? response.data.url : '';
        if (urlToDirect) {
          router.push(urlToDirect);
        } else {
          setShowConfetti(true);
        }
        dispatch(clearCartItems())
      } else {
        toast.error(response.message)
      }
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const method = useForm<IOrderDetails>({ mode: "onBlur" });
  const paymentMethod = method.watch('paymentMethod') as TPaymentMethod;
  const { totalItems, totalCost, discount, shippingPrice, grossTotal } = calculateTotals(cartItems);
  const onSubmit = (data: IOrderDetails) => {
    if (!userDetails) {
      toast.error("User not authenticated");
      return;
    }
    const orderDetails = {
      userId: userDetails._id,
      items: cartItems.map((item: ICartItem) => ({
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productName,
        image: item.image,
        price: item.price,
        wishersId: item.wishersId,
      })),
      status: '' as TOrderStatus,
      paymentMethod: '' as TPaymentMethod,
      shippingAddress: data.shippingAddress,
      shippingPerson: data.shippingPerson,
      orderSummary: {
        totalItems, totalCost, discount, shippingPrice, grossTotal
      }
    };
    if (data.paymentMethod === 'online') {
      orderDetails.status = 'pending' as TOrderStatus;
      orderDetails.paymentMethod = 'online' as TPaymentMethod;
    }
    if (data.paymentMethod === 'paymentOnDelivery') {
      orderDetails.status = 'ordered' as TOrderStatus;
      orderDetails.paymentMethod = 'paymentOnDelivery' as TPaymentMethod;
    }
    mutation.mutate(orderDetails);
  };
  return (
    <>
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="secondaryHeading">CheckOut</h2>
            <div className="md:col-span-1">
              <OrderSummary />
            </div>
            <FormProvider {...method}>
              <form className="space-y-6" onSubmit={method.handleSubmit(onSubmit)}>
                <ShippingInformation />
                <ShippingAddress />
                <PaymentMethod />
                <OrderTerms />
                <PrimaryButton searchText="Confirm" />
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
      {mutation.isPending && <LoadingComponent />}
      {showConfetti && paymentMethod === 'paymentOnDelivery' && <ConfettiComponent link={`/dashboard/orders`} message='Congratulation, Your Order is Placed.' />}
    </>
  )
}
export default page