import React from "react";
interface RupeeProps {
    className?: string;
}
export const Rupee: React.FC<RupeeProps> = ({ className }) => {
    return <span className={className}>&#8360;</span>;
};
