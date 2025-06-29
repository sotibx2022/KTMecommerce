import React from "react";
import { AlertCircle, CheckCircle, XCircle, Package } from "lucide-react";
import { AbsoluteComponent } from "@/app/_components/absoluteComponent/AbsoluteComponent";
const TotalProducts: React.FC = () => {
  const data = {
    total: 320,
    active: 280,
    inactive: 40,
    lowStock: 12,
    outOfStock: 8,
    newThisMonth: 25,
  };
  return (
    <AbsoluteComponent>
      <div className=" rounded-2xl p-4">
      <h2 className="text-xl font-semibold text-[#531c1d] mb-4 flex items-center gap-2">
        <Package className="w-5 h-5" />
        Product Inventory Summary
      </h2>
      <div className="grid grid-cols-2 gap-4 text-sm text-primaryDark">
        <div className="flex items-center justify-between">
          <span>Total Products</span>
          <span className="font-bold text-primaryDark">{data.total}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-green-600">
            <CheckCircle className="w-4 h-4" />
            Active
          </span>
          <span className="font-bold">{data.active}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-red-600">
            <XCircle className="w-4 h-4" />
            Inactive
          </span>
          <span className="font-bold">{data.inactive}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-yellow-600">
            <AlertCircle className="w-4 h-4" />
            Low Stock
          </span>
          <span className="font-bold">{data.lowStock}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-red-600">
            <XCircle className="w-4 h-4" />
            Out of Stock
          </span>
          <span className="font-bold">{data.outOfStock}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primaryDark font-medium">New This Month</span>
          <span className="font-bold">{data.newThisMonth}</span>
        </div>
      </div>
    </div>
    </AbsoluteComponent>
  );
};
export default TotalProducts;
