'use client'
import React, { useContext, useState } from 'react'
import TotalOrders from './ordersComponents/TotalOrders'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { fetchAllOrders } from '@/app/services/queryFunctions/allOrders'
import { IOrderDetails, OrderDetailsProps } from '@/app/types/orders'
import { DateFormator } from '@/app/services/helperFunctions/functions'
import { Save, ShoppingCart } from 'lucide-react'
import SelectStatus from './ordersTableComponents/SelectStatus'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { DisplayContext } from '@/app/context/DisplayComponents'
import OrderDetails from '@/app/_components/orderDetails/OrderDetails'
import { Provider } from 'react-redux'
import store from '@/app/redux/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import SkeletonOrdersTable from './ordersComponents/SkeletonOrdersTable'
import NoData from '@/app/_components/noData/NoData'
import TableNavigation from '../components/TableNavigation'
const page = () => {
  const{visibleComponent,setVisibleComponent} = useContext(DisplayContext);
  const[orderDetails,setOrderDetails] = useState<null | OrderDetailsProps>(null)
  const router = useRouter()
  const { data: orders, isPending } = useQuery({
    queryKey: ['allOrders'],
    queryFn: fetchAllOrders
  })
  function handleDisplayOrderDetails(order: OrderDetailsProps) {
    setOrderDetails(order)
  }
  return (
    <div className="ml-4">
      <Provider store={store}>
    <div className='w-[90%] my-4'>
      <TotalOrders />
      <div className="w-full overflow-x-auto">
      <Table className='my-4 w-[90%]'>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead>Order#</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>View Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {isPending ? (
  <SkeletonOrdersTable />
) : orders && orders.success && orders.data ? (
  orders.data.length > 0 ? (
    orders.data.map((order: IOrderDetails, index: number) => (
      <TableRow key={index}>
  <TableCell className="min-w-[50px]">{index + 1}</TableCell>
  <TableCell className="min-w-[120px]">
    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primaryDark">
      {order._id!.slice(-8).toUpperCase()}
    </h2>
  </TableCell>
  <TableCell className="min-w-[50px]">{order.userEmail}</TableCell>
  <TableCell className="min-w-[150px]">
    <SelectStatus status={order.status} orderId={order._id!} />
  </TableCell>
  <TableCell className="min-w-[100px]">{order.orderSummary.totalItems}</TableCell>
  <TableCell className="min-w-[100px]">{order.orderSummary.grossTotal}</TableCell>
  <TableCell className="min-w-[150px]">{DateFormator(order.createdAt!)}</TableCell>
  <TableCell className="min-w-[100px]">
    <Button onClick={() => handleDisplayOrderDetails(order)}>View</Button>
  </TableCell>
</TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={9} className="h-24 text-center">
        <NoData icon={<ShoppingCart/>} notFoundMessage="There are no Orders Created Yet" />
      </TableCell>
    </TableRow>
  )
) : null}
</TableBody>
      </Table>
      </div>
    </div>
    {orderDetails && <div className='absolute top-0 left-0 w-full h-auto z-40 flex justify-center items-center'
    style={{ background: "var(--gradientwithOpacity)" }}>
      <div className="OrderDetailsWrapper max-w-[500px] relative mt-4 overflow-y-auto">
        <FontAwesomeIcon
                  icon={faTimes}
                  className="text-background bg-helper w-[30px] h-[30px] z-50 absolute top-3 right-3 cursor-pointer rounded-full p-1"
                  onClick={() => setOrderDetails(null)}
                />
    <OrderDetails order={orderDetails} nonExpandable={true}/>
      </div>
    </div>}
    </Provider>
    </div>
  )
}
export default page
