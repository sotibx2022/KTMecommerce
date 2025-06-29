import React from 'react'
import OrdersToday from './OrdersToday'
import OrdersThisMonth from './OrdersThisMonth'
import OrdersThisWeek from './OrdersThisWeek'
const TotalOrders = () => {
  return (
    <div className='flex justify-between items-center w-full'>
      <OrdersToday count={10} trend='down'/>
      <OrdersThisMonth count={6} trend='up'/>
      <OrdersThisWeek count={3} trend='down'/>
    </div>
  )
}
export default TotalOrders