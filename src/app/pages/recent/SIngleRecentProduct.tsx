"use client"
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide';
import ProductCard from '@/app/_components/productCard/ProductCard';
import { getSingleProduct } from '@/app/services/queryFunctions/products';
import { APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { IProductDisplay } from '@/app/types/products';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
const SIngleRecentProduct: React.FC<{ productId: string }> = ({ productId }) => {
    const {
        data: productDetails,
        isPending: isProductPending
    } = useQuery<APIResponseSuccess<IProductDisplay>>({
        queryKey: ['specificProduct', productId],
        queryFn: () => getSingleProduct(productId!),
        enabled: !!productId,
    });
    const productDatas = (!isProductPending && productDetails?.success) && productDetails.data
    return (
        <div>
            {isProductPending && <SkeletonSlide />}
            {productDatas && <ProductCard {...productDatas} />}
        </div>
    )
}
export default SIngleRecentProduct