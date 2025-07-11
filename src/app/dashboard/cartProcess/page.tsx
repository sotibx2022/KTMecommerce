"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide'
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import OrderSummary from '@/app/_components/processOrder/OrderSummary'
import OrderTerms from '@/app/_components/processOrder/OrderTerms'
import PaymentMethod from '@/app/_components/processOrder/PaymentMethod'
import ShippingAddress from '@/app/_components/processOrder/ShippingAddress'
import ShippingInformation from '@/app/_components/processOrder/ShippingInformation'
import ConfettiComponent from '@/app/_components/submit/ConfettiComponent'
import { DisplayContext } from '@/app/context/DisplayComponents'
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent'
import { CartState, clearCartItems } from '@/app/redux/cartSlice'
import { calculateTotals } from '@/app/services/helperFunctions/cartFunctions'
import { postOrderDetails } from '@/app/services/queryFunctions/orders'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import { ICartItem } from '@/app/types/cart'
import { ICardDetails, IOrderDetails, IProductDetailsforOrder, IShippingAddress, IShippingPerson } from '@/app/types/orders'
import { Mutation, useMutation } from '@tanstack/react-query'
import { Types } from 'mongoose'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
const page = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  const context = useContext(UserDetailsContext);
  const [showConfetti, setShowConfetti] = useState(false);
  if (!context) {
    throw new Error("The User Details context is not working.")
  }
  const { userDetails } = context;
  const router = useRouter();
  const { cartItems, loading: cartLoading } = useSelector((state: { cart: CartState }) => state.cart);
  const dispatch = useDispatch()
  const mutation = useMutation<
    APIResponseSuccess | APIResponseError,
    Error,
    IOrderDetails
  >({
    mutationFn: postOrderDetails,
    onSuccess: (response) => {
      setShowConfetti(true);
      dispatch(clearCartItems());
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
  const method = useForm<IOrderDetails>({ mode: "onBlur" });
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
      userId: userDetails._id,
      items: cartItems.map((item: ICartItem) => ({
        productId: item.productId,
        quantity: item.quantity,
        productName: item.productName,
        image: item.image,
        price: item.price,
        wishersId:item.wishersId,
      })),
      status: "ordered" as const,
      paymentMethod: "paymentOnDelivery" as const,
      shippingAddress: data.shippingAddress,
      shippingPerson: data.shippingPerson,
      orderSummary: {
        totalItems, totalCost, discount, shippingPrice, grossTotal
      }
    };
    mutation.mutate(orderDetails);
  };
  return (
    <>
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
                <PrimaryButton searchText="Confirm" />
              </form>
            </FormProvider>
          </div>
          <div className="md:col-span-1">
            {cartLoading ? <SkeletonSlide /> : <OrderSummary />}
          </div>
        </div>
      </div>
      {mutation.isPending && <LoadingComponent />}
      {showConfetti && <ConfettiComponent link={`/dashboard/orders`} message='Congratulation, Your Order is Placed.' />}
    </>
  )
}
export default page