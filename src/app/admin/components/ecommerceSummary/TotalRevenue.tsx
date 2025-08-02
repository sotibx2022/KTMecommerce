import { useDashboardSummary } from "@/app/hooks/queryHooks/useDashboardSummary";
import TimeSummaryCard from "./TimeSummaryCard";
const TotalRevenue: React.FC = () => {
  const { data: ordersSummary, isPending } = useDashboardSummary('orders');
  // Safe destructuring with fallback values
  const { 
    today = { revenue: 0 }, 
    last7Days = { revenue: 0 }, 
    last30Days = { revenue: 0 } 
  } = ordersSummary || {};
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container">
      <TimeSummaryCard
        title="Revenue Today"
        amount={isPending ? "loading" : today.revenue.toString()}
        trend="down"
      />
      <TimeSummaryCard
        title="Revenue Last 7 Days"
        amount={isPending ? "loading" : last7Days.revenue.toString()}
        trend="down"
      />
      <TimeSummaryCard
        title="Revenue Last 30 Days"
        amount={isPending ? "loading" : last30Days.revenue.toString()}
        trend="down"
      />
    </div>
  );
};
export default TotalRevenue;