"use client"
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { fetchAllOrders } from '@/app/services/queryFunctions/orders';
import { useQuery } from '@tanstack/react-query';
import { OrderDetailsProps } from '@/app/types/orders';
import React, { useContext } from 'react';
import OrderDetails from '@/app/_components/orderDetails/OrderDetails';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import { useOrders } from '@/app/hooks/queryHooks/useOrders';
const Page = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  const userEmail = userDetails?.email;
 const {data:orders,isPending,error} = useOrders(userEmail!)
  console.log('Orders data:', orders);
  console.log('Is array:', Array.isArray(orders));
  if (isPending) {
    return <LoadingComponent/>
  }
  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="subHeading">Orders</h1>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order: OrderDetailsProps, index: number) => (
          <div className="singleOrder mb-6" key={order._id}>
            <OrderDetails order={order} />
          </div>
        ))
      ) : (
        <div className="text-red-600">No orders found</div>
      )}
    </div>
  );
};
export default Page;