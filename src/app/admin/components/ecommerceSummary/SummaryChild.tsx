"use client";
import React from "react";
interface ISummaryChild {
  children: React.ReactNode;
}
const SummaryChild: React.FC<ISummaryChild> = ({ children }) => {
  return (
    <div className="p-4 w-[300px]">
        {children}
    </div>
  );
};
export default SummaryChild;
