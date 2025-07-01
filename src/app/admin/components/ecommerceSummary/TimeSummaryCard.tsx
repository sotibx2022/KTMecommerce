import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
interface TimeSummaryCardProps {
  title: string;
  amount: string;
  trend: "up" | "down";
}
const TimeSummaryCard: React.FC<TimeSummaryCardProps> = ({
  title,
  amount,
  trend,
}) => {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend === "up" 
    ? "text-green-600 bg-green-100 p-2" 
    : "text-red-600 bg-red-100 p-2";
  return (
    <div
      className={`rounded-2xl p-4`}
      style={{ background: "var(--gradientwithOpacity)" }}
    >
      <h3 className={`text-base font-semibold mb-1 text-background`}>{title}</h3>
      <div className="flex items-center justify-between">
        <span className={`text-2xl font-bold text-background`}>{amount}</span>
        <TrendIcon className={`w-8 h-8 rounded-md ${trendColor}`} />
      </div>
    </div>
  );
};
export default  TimeSummaryCard