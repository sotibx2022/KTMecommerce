"use client"
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { fetchAllOrders } from '@/app/services/queryFunctions/orders';
import { useQuery } from '@tanstack/react-query';
import { OrderDetailsProps } from '@/app/types/orders';
import React, { useContext } from 'react';
import OrderDetails from '@/app/_components/orderDetails/OrderDetails';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import { useOrders } from '@/app/hooks/queryHooks/useOrders';
import { PackageX } from 'lucide-react';
import NoData from '@/app/_components/noData/NoData';
const Page = () => {
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  const userEmail = userDetails?.email;
 const {data:orders,isPending,error} = useOrders(userEmail!)
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
            <OrderDetails order={order} expandAble={true}/>
          </div>
        ))
      ) : (
        <NoData
  icon={<PackageX className="w-12 h-12 text-red-500" strokeWidth={1.5} />}
  notFoundMessage="No orders found"
  buttonText="Browse"
  buttonLink="/catalog/advanceSearch?highlighted=none"
/>
      )}
    </div>
  );
};
export default Page;