"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
const OrderStatusChart = () => {
  const data = [
    { name: "Ordered", value: 400 },
    { name: "Pending", value: 300 },
    { name: "Confirmed", value: 300 },
    { name: "Delivered", value: 200 },
    { name: "Cancelled", value: 100 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF4560"];
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
   <div className="flex justify-between items-start flex-wrap shadow-primaryLight p-2">
    <div className="min-w-[300px] h-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-[#531c1d]">Order Status</h2>
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
