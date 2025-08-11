import React from "react";
const RecommendedProductLoading: React.FC = () => {
    return (
        <div
            className="productDisplayArea max-w-md mx-auto p-2 rounded-[var(--radius)] shadow-md bg-[var(--background)] animate-pulse"
            style={{ borderRadius: "var(--radius)" }}
        >
            {/* Product Name Skeleton */}
            <div className="h-8 bg-[var(--primaryLight)] rounded w-3/4 mb-4"></div>
            {/* Image Skeleton */}
            <div className="w-full h-48 bg-[var(--primaryLight)] rounded mb-4"></div>
            {/* Brand and Category Tags Skeleton */}
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <div className="h-6 w-16 bg-[var(--primaryLight)] rounded"></div>
                    <div className="h-6 w-20 bg-[var(--helper)] rounded"></div>
                </div>
                <div className="h-6 w-12 bg-[var(--primaryLight)] rounded"></div>
            </div>
        </div>
    );
};
export default RecommendedProductLoading;
