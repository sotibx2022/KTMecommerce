"use client";
import { useDashboardSummary } from "@/app/hooks/queryHooks/useDashboardSummary";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
const OrderStatusChart = () => {
  const { data: ordersSummary, isPending } = useDashboardSummary('orders');
  const { cancelledCount = 1,
    confirmedCount = 1,
    deliveredCount = 1,
    orderedCount = 1,
    paidCount = 1,
    unpaidCount = 1 } = ordersSummary || {}
  const data = [
    { name: "Ordered", value: orderedCount },
    { name: "Paid", value: paidCount },
    { name: 'Unpaid', value: unpaidCount },
    { name: "Confirmed", value: confirmedCount },
    { name: "Delivered", value: deliveredCount },
    { name: "Cancelled", value: cancelledCount },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4560", '#531c1d'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="flex justify-center items-center flex-wrap shadow-primaryLight p-2">
      <div className="min-w-[300px] h-[400px] max-w-[400px]">
        <h2 className="text-lg font-semibold mb-4 text-primaryDark">Order Status</h2>
        <ResponsiveContainer width="90%" height="90%" className="">
          <PieChart className="">
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              dataKey="value"
              className=""
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" height={100} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default OrderStatusChart;
