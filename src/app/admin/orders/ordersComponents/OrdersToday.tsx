import { ArrowUpRight, ArrowDownRight } from "lucide-react";
interface OrdersTodayProps {
  count: number;
  trend?: "up" | "down";
}
export default function OrdersToday({ count, trend = "up" }: OrdersTodayProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor = trend === "up" ? "text-green-600" : "text-red-600";
  return (
    <div className="bg-[#876061] text-white rounded-2xl p-4 shadow-md">
      <h3 className="text-base font-semibold mb-1">Orders Today</h3>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{count}</span>
        <TrendIcon className={`w-6 h-6 ${trendColor}`} />
      </div>
    </div>
  );
}
