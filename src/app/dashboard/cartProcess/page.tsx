"use client"
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import OrderSummary from '@/app/_components/processOrder/OrderSummary'
import OrderTerms from '@/app/_components/processOrder/OrderTerms'
import PaymentMethod from '@/app/_components/processOrder/PaymentMethod'
import ShippingAddress from '@/app/_components/processOrder/ShippingAddress'
import ShippingInformation from '@/app/_components/processOrder/ShippingInformation'
import { FormProvider, useForm } from 'react-hook-form'
export interface ICartCheckOut{
  shipping:{
    firstName:string;
    lastName:string;
    email:string;
    phone:string
  },
  shippingAddress:{
    street:string,
    city:string,
    state:string,
  },
  paymentMethod:string,
  termsAgreed:boolean,
  cardDetails?:{
    cardHolderName:string,
    cardNumber:string,
    cardExpiry:string,
    cvvNumber:string,
  }
}
const page = () => {
  const method = useForm<ICartCheckOut>({mode:"onBlur"});
  const onSubmit =(data:ICartCheckOut)=>{
    console.log(data);
  }
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