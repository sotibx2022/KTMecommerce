"use client";
import { useState } from 'react';
import { OrderDetailsProps } from '@/app/types/orders';
import { OrderHeader } from './OrderHeader';
import { OrderFooter } from './OrderFooter';
import CartTableSummary from '../cartTableSummary/CartTableSummary';
import CartSummary from '../cartSummary/CartSummary';
import { ShippingInfo } from './OrderShippingInfo';
import { useRouter } from 'next/navigation';
export const OrderDetails = ({ order, expandAble = false }: {
  order: OrderDetailsProps,
  expandAble?: boolean
}) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { _id } = order;
  const router = useRouter()
  return (
    <div className="p-2 md:p-6 bg-background rounded-lg shadow-helper mb-6 max-w-[500px]">
      {expandAble && (
        <OrderHeader
          _id={_id}
          createdAt={order.createdAt!}
          status={order.status}
          expandable={expandAble}
          showDetails={showOrderDetails}
          onToggleDetails={() => setShowOrderDetails(!showOrderDetails)}
        />
      )}
      {(!expandAble || showOrderDetails) && (
        <div className="orderDetails space-y-6 w-full">
          {!expandAble && (
            <OrderHeader
              _id={_id}
              createdAt={order.createdAt!}
              status={order.status}
            />
          )}
          <ShippingInfo
            shippingPerson={order.shippingPerson}
            shippingAddress={order.shippingAddress}
          />
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primaryDark">
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <CartTableSummary items={order.items} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primaryDark">
              Order Summary
            </h3>
            <CartSummary items={order.items} />
          </div>
          <OrderFooter
            paymentMethod={order.paymentMethod}/>
        </div>
      )}
    </div>
  );
};
export default OrderDetails;