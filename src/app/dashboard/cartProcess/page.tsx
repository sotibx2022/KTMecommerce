import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton'
import OrderSummary from '@/app/_components/processOrder/OrderSummary'
import OrderTerms from '@/app/_components/processOrder/OrderTerms'
import PaymentMethod from '@/app/_components/processOrder/PaymentMethod'
import ShippingAddress from '@/app/_components/processOrder/ShippingAddress'
import ShippingInformation from '@/app/_components/processOrder/ShippingInformation'
import React from 'react'
const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form className="space-y-6">
            <ShippingInformation />
            <ShippingAddress />
            <PaymentMethod />
            <OrderTerms />
            <PrimaryButton searchText="Confirm"/>
          </form>
        </div>
        <div className="md:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
export default page