"use client"
import TotalRevenue from './TotalRevenue';
import TotalCustomers from './TotalCustomers';
import OrderStatusChart from './OrderStatusChart';
import SummaryChild from './SummaryChild';
import RatingSummary from './RatingSummary';
import { useQuery } from '@tanstack/react-query';
const SummaryWrapper = () => {
  return (
    <div className="flex flex-col gap-4">
       <TotalRevenue/>
        <TotalCustomers/>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <OrderStatusChart/>
       <RatingSummary/>
        </div>
    </div>
  );
};
export default SummaryWrapper;