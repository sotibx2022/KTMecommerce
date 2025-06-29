import TotalRevenue from './TotalRevenue';
import TotalCustomers from './TotalCustomers';
import OrderStatusChart from './OrderStatusChart';
import SummaryChild from './SummaryChild';
import RatingSummary from './RatingSummary';
const SummaryWrapper = () => {
  return (
    <div className="flex flex-col gap-4">
       <TotalRevenue/>
       <div className="row2 flex justify-between  items-start flex-wrap my-4">
        <TotalCustomers/>
        <OrderStatusChart/>
       </div>
       <RatingSummary/>
    </div>
  );
};
export default SummaryWrapper;