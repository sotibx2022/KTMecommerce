"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { getSingleProduct } from '@/app/services/queryFunctions/products';
import { getSpecificRemarks } from '@/app/services/queryFunctions/remarks';
import SingleProduct from '@/app/_components/singleProduct/SingleProduct';
import AddSingleProductReviews from '@/app/_components/singleProductReviews/AddSingleProductReviews';
import EditSingleProductReview from '@/app/_components/singleProductReviews/EditSingleProductReview';
import RemarksDisplay from '@/app/_components/remarksDisplay/RemarksDisplay';
import SecondaryButton from '@/app/_components/secondaryButton/SecondaryButton';
import SingleProductPageSkeleton from '@/app/_components/loadingComponent/SingleProductPageSkeleton';
import RemarksSkeleton from './RemarksSkleton';
import { Minus, Plus } from 'lucide-react';
import { IProductDisplay } from '@/app/types/products';
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
const SingleProductPageClient = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id") || ""
    const [productIdentifier, setProductIdentifier] = useState({
        productId: "",
        productName: "",
        productImage: "",
        productLoadingComplete: false
    });
    const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
    const { userDetails } = useUserDetails();
    const [showReviews, setShowReviews] = useState(true);
    const {
        data: productDetails,
        isPending: isProductPending
    } = useQuery<APIResponseSuccess<IProductDisplay>>({
        queryKey: ['specificProduct', productId],
        queryFn: () => getSingleProduct(productId!),
        enabled: !!productId,
    });
    const productDatas = (!isProductPending && productDetails?.success) && productDetails.data
    useEffect(() => {
        if (productDatas) {
            setProductIdentifier({
                productId: productDatas._id,
                productName: productDatas.productName,
                productImage: productDatas.image,
                productLoadingComplete: true,
            });
        }
    }, [productDatas]);
    const {
        data: remarks,
        isPending: isRemarksPending,
        isFetching: isRemarksFetching
    } = useQuery({
        queryKey: ['specificRemarks', productId],
        queryFn: () => getSpecificRemarks(productId!),
        enabled: !!productId && !!productIdentifier.productLoadingComplete
    });
    const toggleReviews = (value: boolean) => setShowReviews(value);
    if (productIdentifier.productLoadingComplete && !productDatas) {
        return <h1>There is no product data.</h1>;
    }
    return (
        <>
            {!productIdentifier.productLoadingComplete && <SingleProductPageSkeleton />}
            {productIdentifier.productLoadingComplete && productDatas && <SingleProduct {...productDatas} />}
            <div className="reviewsContainer container">
                <div className="reviewsHeading flex gap-4 mb-2 items-center">
                    <h2 className="text-xl font-semibold text-primaryDark">Reviews</h2>
                    {showReviews ? (
                        <Minus
                            onClick={() => toggleReviews(!showReviews)}
                            className="bg-helper p-2 rounded-full cursor-pointer text-background"
                            size={24}
                        />
                    ) : (
                        <Plus
                            onClick={() => toggleReviews(!showReviews)}
                            className="bg-helper p-2 rounded-full cursor-pointer text-background"
                            size={24}
                        />
                    )}
                    <Button variant={'outline'} onClick={() => setVisibleComponent('addReview')}>Add Review</Button>
            </div>
            {showReviews && productIdentifier.productLoadingComplete && (
                <>
                    {(isRemarksPending || isRemarksFetching) ? (
                        <RemarksSkeleton />
                    ) : (
                        remarks?.success && remarks.data && (
                            <RemarksDisplay remarks={remarks.data} />
                        )
                    )}
                </>
            )}
            {visibleComponent === 'addReview' && productIdentifier.productLoadingComplete && (
                <AddSingleProductReviews
                    readOnly={userDetails === null}
                    productIdentifier={productIdentifier}
                />
            )}
            {visibleComponent === 'editReview' && productIdentifier.productLoadingComplete && (
                <EditSingleProductReview productIdentifier={productIdentifier} />
            )}
        </div >
        </>
    );
};
export default SingleProductPageClient;