import React from 'react';
import TimeSummaryCard from '../../components/ecommerceSummary/TimeSummaryCard';
import { useDashboardSummary } from '@/app/hooks/queryHooks/useDashboardSummary';
const TotalOrders = () => {
  const { data: ordersSummaryData, isPending, error } = useDashboardSummary('orders');
  const {
    today = { totalOrders: 0 },
    last7Days = { totalOrders: 0 },
    last30Days = { totalOrders: 0 }
  } = ordersSummaryData || {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container mb-4">
      <TimeSummaryCard
        title="Orders Today"
        amount={isPending ? 'Loading...' : today.totalOrders.toString()}
        trend="down"
      />
      <TimeSummaryCard
        title="Orders Last 7 Days"
        amount={isPending ? 'Loading...' : last7Days.totalOrders.toString()}
        trend="down"
      />
      <TimeSummaryCard
        title="Orders Last 30 Days"
        amount={isPending ? 'Loading...' : last30Days.totalOrders.toString()}
        trend="down"
      />
    </div>
  );
};
export default TotalOrders;