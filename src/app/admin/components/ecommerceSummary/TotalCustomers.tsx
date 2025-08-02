"use client";
import { useDashboardSummary } from "@/app/hooks/queryHooks/useDashboardSummary";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
const TotalCustomers = () => {
  const { data: customersSummary, isPending, error } = useDashboardSummary('customers');
  // Handle loading state
  if (isPending) {
    return (
      <div className="shadow-primaryDark p-4 w-full">
        <h2 className="text-lg font-semibold mb-4 text-[#531c1d]">Total Customers</h2>
        <Skeleton className="h-[200px]" />
      </div>
    );
  }
  // Handle error state
  if (error || !customersSummary) {
    return (
      <div className="shadow-primaryDark p-4">
        <h2 className="text-lg font-semibold mb-4 text-[#531c1d]">Total Customers</h2>
        <div className="text-red-500">Failed to load customer data</div>
      </div>
    );
  }
  const { 
    registeredCustomers = 1, 
    activeCustomers = 1, 
    adminUsers = 1,
    totalCustomers = 0
  } = customersSummary.customerDatas || {};
  const data = [
    { 
      name: "Registered", 
      count: registeredCustomers, 
      total: totalCustomers + adminUsers,
      color: "#876061" 
    },
    { 
      name: "Active", 
      count: activeCustomers===0?1:activeCustomers, 
      total: totalCustomers + adminUsers,
      color: "#5c8a72" 
    },
    { 
      name: "Admin", 
      count: adminUsers, 
      total: totalCustomers + adminUsers,
      color: "#5c6b8a" 
    },
  ];
  return (
    <div className="shadow-primaryDark w-full">
      <h2 className="text-lg font-semibold mb-4 text-[#531c1d] pl-4">Total Customers</h2>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          barSize={24}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} customers`, "Count"]}
            labelFormatter={(label) => `${label} Customers`}
          />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default TotalCustomers;