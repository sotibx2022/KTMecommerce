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
        <div className="animate-pulse">
            {renderIcon()}
        </div>
    );
};
export default IconLoadingSkleton;
