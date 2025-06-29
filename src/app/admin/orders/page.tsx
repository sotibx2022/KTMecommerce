'use client'
import React from 'react'
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
import { IOrderDetails } from '@/app/types/orders'
import { DateFormator } from '@/app/services/helperFunctions/functions'
import { Save } from 'lucide-react'
import SelectStatus from './ordersTableComponents/SelectStatus'
const page = () => {
  const { data: orders, isPending } = useQuery({
    queryKey: ['allOrders'],
    queryFn: fetchAllOrders
  })
  return (
    <div className='w-full my-4'>
      <TotalOrders />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SN</TableHead>
            <TableHead>User Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Items</TableHead>
            <TableHead>Total Cost</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
  {orders && orders.success && orders.data && orders.data.map((order: IOrderDetails, index: number) => (
    <TableRow key={index}>
      <TableCell>{index+1}</TableCell>
      <TableCell>{order.userEmail}</TableCell>
      <SelectStatus status={order.status} orderId={order._id!}/>
      <TableCell>{order.orderSummary.totalItems}</TableCell>
      <TableCell>{order.orderSummary.grossTotal}</TableCell>
      <TableCell>{DateFormator(order.createdAt!)}</TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </div>
  )
}
export default page
