import TotalOrders from './TotalOrders';
import TotalRevenue from './TotalRevenue';
import TotalProducts from './TotalProducts';
import TotalCustomers from './TotalCustomers';
import PendingOrders from './PendingOrders';
import TotalReviews from './TotalReviews';
import SalesTrendChart from './SalesTrendChart';
import RevenueBreakdownChart from './RevenueBreakdownChart';
import OrderStatusChart from './OrderStatusChart';
import TopSellingProductsChart from './TopSellingProductsChart';
import CustomerGrowthChart from './CustomerGrowthChart';
import RecentOrdersTable from './RecentOrdersTable';
import RecentReviews from './RecentReviews';
import LowStockAlert from './LowStockAlert';
import PendingActions from './PendingActions';
import TrafficOverview from './TrafficOverview';
import GeoSalesMap from './GeoSalesMap';
import AbandonedCartRate from './AbandonedCartRate';
import SummaryChild from './SummaryChild';
interface ISummaryWrapper {
  children: React.ReactNode;
}
const componentsArray = [
  TotalOrders,
  TotalRevenue,
  TotalProducts,
  TotalCustomers,
  PendingOrders,
  TotalReviews,
  SalesTrendChart,
  RevenueBreakdownChart,
  OrderStatusChart,
  TopSellingProductsChart,
  CustomerGrowthChart,
  RecentOrdersTable,
  RecentReviews,
  LowStockAlert,
  PendingActions,
  TrafficOverview,
  GeoSalesMap,
  AbandonedCartRate,
];
const SummaryWrapper = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 lg:gap-6 w-full p-4">
      {componentsArray.map((Component, index) => (
        <SummaryChild key={index}>
           <Component/>
          </SummaryChild>
      ))}
    </div>
  );
};
export default SummaryWrapper;