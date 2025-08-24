"use client"
import VerticalProductCard from '@/app/_components/productCard/VerticalProductCard';
import VerticalProductCardSkeleton from '@/app/_components/productCard/VerticalProductCardSkeleton';
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
            {isProductPending && <VerticalProductCardSkeleton />}
            {productDatas && <VerticalProductCard {...productDatas} />}
        </div>
    )
}
export default SIngleRecentProduct