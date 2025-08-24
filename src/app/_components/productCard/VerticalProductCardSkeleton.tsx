import React from 'react';
const VerticalProductCardSkeleton: React.FC = () => {
    return (
        <div className="group relative w-full overflow-hidden rounded-xl bg-background shadow-sm shadow-primaryLight animate-pulse">
            <div className="w-full overflow-hidden flex justify-between">
                {/* Image skeleton */}
                <div className="productImage relative w-[20vw]">
                    <div className="h-[200px] w-full bg-helper rounded-lg"></div>
                    <span className="absolute top-3 right-3 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white opacity-50">
                        Loading
                    </span>
                </div>
                {/* Product details skeleton */}
                <div className="productDetails p-4 flex flex-col w-[40vw] border-2 border-dotted border-r-helper justify-center">
                    <div
                        className="productTitle p-2 rounded-lg mb-2"
                        style={{ background: "var(--gradientwithOpacity)" }}
                    >
                        <div className="h-6 w-3/4 bg-helper rounded"></div>
                    </div>
                    <div className="productDescription space-y-2">
                        <div className="h-4 w-full bg-helper rounded"></div>
                        <div className="h-4 w-5/6 bg-helper rounded"></div>
                        <div className="h-4 w-2/3 bg-helper rounded"></div>
                    </div>
                    <div className="productRating mt-2">
                        <div className="h-4 w-1/2 bg-helper rounded"></div>
                    </div>
                </div>
                {/* Brand & Category skeleton */}
                <div className="flex justify-center items-center flex-col gap-4 px-2 w-[10vw]">
                    <div className="h-6 w-full bg-helper rounded-lg"></div>
                    <div className="h-6 w-full bg-helper rounded-lg"></div>
                </div>
                {/* Price skeleton */}
                <div className="price-highlight flex justify-center items-center w-[10vw]">
                    <div className="h-6 w-16 bg-helper rounded-lg"></div>
                </div>
            </div>
        </div>
    );
};
export default VerticalProductCardSkeleton;
