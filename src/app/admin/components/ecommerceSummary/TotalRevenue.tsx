import TimeSummaryCard from "./TimeSummaryCard";
const TotalRevenue: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container">
      <TimeSummaryCard
        title="Revenue Today"
        amount="$2,340"
        trend="up"
      />
      <TimeSummaryCard
        title="Revenue This Week"
        amount="$14,230"
        trend="down"
      />
      <TimeSummaryCard
        title="Revenue This Month"
        amount="$56,120"
        trend="up"
      />
    </div>
  );
};
export default TotalRevenue;