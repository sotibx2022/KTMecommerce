import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
interface RevenueBlock {
  title: string;
  amount: string;
  trend: "up" | "down";
  background: string;
  textColor: string;
}
const TotalRevenue: React.FC = () => {
  const revenueData: RevenueBlock[] = [
    {
      title: "Revenue Today",
      amount: "$2,340",
      trend: "up",
      background: "#876061", // primary
      textColor: "text-white",
    },
    {
      title: "Revenue This Week",
      amount: "$14,230",
      trend: "down",
      background: "#531c1d", // primaryDark
      textColor: "text-white",
    },
    {
      title: "Revenue This Month",
      amount: "$56,120",
      trend: "up",
      background: "#fcae04", // helper
      textColor: "text-black",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container">
      {revenueData.map((item, index) => {
        const TrendIcon = item.trend === "up" ? ArrowUpRight : ArrowDownRight;
        const trendColor = item.trend === "up" ? "text-green-600" : "text-red-600";
        return (
          <div
            key={index}
            className="rounded-2xl p-4 shadow-md"
            style={{ backgroundColor: item.background }}
          >
            <h3 className={`text-base font-semibold mb-1 ${item.textColor}`}>{item.title}</h3>
            <div className="flex items-center justify-between">
              <span className={`text-2xl font-bold ${item.textColor}`}>{item.amount}</span>
              <TrendIcon className={`w-6 h-6 ${trendColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default TotalRevenue;
