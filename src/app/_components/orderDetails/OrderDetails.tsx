"use client"
import { OrderDetailsProps } from '@/app/types/orders';
import { format } from 'date-fns';
import CartTableSummary from '../cartTableSummary/CartTableSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faFilePdf, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import CartSummary from '../cartSummary/CartSummary';
const OrderDetails: React.FC<{ order: OrderDetailsProps }> = ({ order }) => {
    const[showOrderDetails,setShowOrderDetails] = useState<boolean>(false);
  // Destructure properties from the order object
  const {
    _id,
    status,
    items,
    paymentMethod,
    shippingAddress,
    shippingPerson,
    createdAt,
    updatedAt
  } = order;
  return (
    <div className="max-w-4xl p-6 bg-background rounded-lg shadow-helper mb-6">
      {/* Order Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primaryDark">
            Order # {_id.slice(-8).toUpperCase()}
          </h2>
          <p className="text-primaryLight text-sm mt-1">
            {format(new Date(createdAt), 'MMM dd, yyyy')}
          </p>
        </div>
        <span className={`px-4 py-1 rounded-full text-sm font-semibold 
          ${status === 'ordered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
          {status}
        </span>
        <FontAwesomeIcon
                          icon={showOrderDetails? faMinus : faPlus}
                          className="bg-helper p-4 rounded-full cursor-pointer text-background"
                          onClick={()=>setShowOrderDetails(!showOrderDetails)}
                        />
      </div>
     {showOrderDetails && <div className="orderDetails">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="border-r  border-helper pr-6">
          <h3 className="font-semibold text-lg mb-3 text-primaryDark">Shipping Details</h3>
          <div className="space-y-2">
            <p className="text-primaryLight">
              {shippingPerson.firstName} {shippingPerson.lastName}
            </p>
            <p className="text-primaryLight">{shippingPerson.email}</p>
            <p className="text-primaryLight">{shippingPerson.phone}</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-3 text-primaryDark">Shipping Address</h3>
          <div className="space-y-2">
            <p className="text-primaryLight">{shippingAddress.street}</p>
            <p className="text-primaryLight">{shippingAddress.city}</p>
            <p className="text-primaryLight">{shippingAddress.state}</p>
          </div>
        </div>
      </div>
      {/* Order Items */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4 text-primaryDark">Order Items</h3>
        <div className="space-y-4">
            <div className="cartTableSummary">
                <CartTableSummary items={items}/>
            </div>
        </div>
      </div>
      {/* Payment and Summary */}
      <h3 className="font-semibold text-lg mb-4 text-primaryDark">Order Summary</h3>
    <CartSummary items={items}/>
      <div className="flex justify-between items-start border-t border-helper pt-6">
        <div className="text-primaryLight">
          <p className="font-semibold text-primaryDark">Payment Method:</p>
          <p className="capitalize">{paymentMethod.replace('paymentOn', '')}</p>
        </div>
        <div className="text-right">
        <FontAwesomeIcon
  icon={faFilePdf}
  size="2x" 
  color="#ff0000" // Red color
/>
        </div>
      </div>
     </div>}
    </div>
  );
};
export default OrderDetails;