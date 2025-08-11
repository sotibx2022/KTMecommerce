import React from 'react';
import NoRecommendedProduct from './NoRecommendedProduct';
interface RecommendedProductProps {
    recommendedProduct: {
        productName?: string;
        image?: string;
        brand?: string;
        categoryName?: string;
        price?: number | string;
        productDescription?: string;
    } | null; // allow null if no product is passed
}
const RecommendedProduct: React.FC<RecommendedProductProps> = ({ recommendedProduct }) => {
    if (!recommendedProduct) {
        return <NoRecommendedProduct/>
    }
    return (
        <div
            className="productDisplayArea max-w-md mx-auto p-2 rounded-[var(--radius)] shadow-md bg-[var(--background)]"
        >
            {/* Product Name */}
            <h2 className="text-2xl font-semibold mb-2 text-[var(--primaryDark)]">
                {recommendedProduct.productName}
            </h2>
            {/* Product Image */}
            {recommendedProduct.image && (
                <img
                    src={recommendedProduct.image}
                    alt={recommendedProduct.productName}
                    className="w-full h-48 object-cover rounded-[var(--radius)] mb-4 border-2 border-[var(--primaryLight)]"
                />
            )}
            {/* Brand and Category Tags */}
            <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-3">
                    {recommendedProduct.brand && (
                        <span className="px-3 py-1 rounded-[var(--radius)] bg-[var(--primaryLight)] text-white text-sm font-medium">
                            {recommendedProduct.brand}
                        </span>
                    )}
                    {recommendedProduct.categoryName && (
                        <span className="px-3 py-1 rounded-[var(--radius)] bg-[var(--helper)] text-[var(--primaryDark)] text-sm font-medium">
                            {recommendedProduct.categoryName}
                        </span>
                    )}
                </div>
                {/* Price */}
                {recommendedProduct.price !== undefined && (
                    <p className="text-xl font-bold text-[var(--primary)]">
                        ${recommendedProduct.price}
                    </p>
                )}
            </div>
        </div>
    );
};
export default RecommendedProduct;
