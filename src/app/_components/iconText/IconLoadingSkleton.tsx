import React from "react";
import { ShoppingCart, Heart, Search } from "lucide-react";
const IconLoadingSkleton: React.FC<{ name: string }> = ({ name }) => {
    const iconName = name.toLowerCase();
    const renderIcon = () => {
        switch (iconName) {
            case "cart":
                return <ShoppingCart className="w-8 h-8 text-[var(--primaryLight)] opacity-40" />;
            case "wishlist":
                return <Heart className="w-8 h-8 text-[var(--primaryLight)] opacity-40" />;
            case "search":
                return <Search className="w-8 h-8 text-[var(--primaryLight)] opacity-40" />;
            default:
                return (
                    <div className="bg-[var(--primaryLight)] bg-opacity-20 rounded-full w-8 h-8" />
                );
        }
    };
    return (
        <div className="relative flex flex-col items-center justify-center p-1 rounded-lg border border-[var(--primaryLight)] w-[60px]">
            {/* Icon with pulse skeleton overlay */}
            <div className="relative flex items-center justify-center">
                {renderIcon()}
                <div className="absolute inset-0 bg-[var(--primaryLight)] bg-opacity-20 rounded-full animate-pulse" />
            </div>
            {/* Text skeleton */}
            <div className="bg-[var(--primaryLight)] bg-opacity-20 rounded-full w-12 h-4 mt-1 animate-pulse" />
        </div>
    );
};
export default IconLoadingSkleton;
