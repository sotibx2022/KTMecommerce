"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const TotalCustomers = () => {
  const data = [
    { name: "Active", count: 5, total: 21 },
    { name: "InActive", count: 16, total: 21 },
    { name: "Registered", count: 19, total: 21 },
    { name: "Updated", count: 2, total: 21 },
    { name: "Customer", count: 1, total: 21 },
  ];
  return (
    <div className="shadow-primaryDark p-4">
      <h2 className="text-lg font-semibold mb-4 text-[#531c1d]">Total Customers</h2>
      <ResponsiveContainer width={500} height={200}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          barSize={24}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="count" fill="#876061" background={{ fill: "#f3f3f3" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TotalCustomers;
