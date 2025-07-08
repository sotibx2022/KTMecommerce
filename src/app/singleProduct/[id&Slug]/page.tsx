"use client";
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
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
const ProductPage = () => {
  const searchParams = useSearchParams();
  const [productId, setProductId] = useState<string>(searchParams.get('id') ?? "");
  const [productIdentifier, setProductIdentifier] = useState({
    productId: "",
    productName: "",
    productImage: "",
    productLoadingComplete: false
  });
  const context = useContext(UserDetailsContext);
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  if (!context) throw new Error("The User Details context is not working.");
  const { userDetails } = context;
  const [showReviews, setShowReviews] = useState(true);
  const {
    data: productDetails,
    isPending: isProductPending
  } = useQuery({
    queryKey: ['specificProduct', productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId
  });
  const productDatas =
    !isProductPending && productDetails?.success && productDetails?.data
      ? productDetails.data
      : null;
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
    queryFn: () => getSpecificRemarks(productId),
    enabled: !!productId && !!productIdentifier.productLoadingComplete
  });
  const toggleReviews = (value: boolean) => setShowReviews(value);
  if (productIdentifier.productLoadingComplete && !productDatas) {
    return <h1>There is no product data.</h1>;
  }
  return (
    <>
      {!productIdentifier.productLoadingComplete && <SingleProductPageSkeleton />}
      {productIdentifier.productLoadingComplete && productDatas && <SingleProduct {...productDatas}/>}
      <div className="reviewsContainer container">
        <div className="reviewsHeading flex gap-4 mb-2 items-center">
          <h2 className="text-xl font-semibold text-primaryDark">Reviews</h2>
          <FontAwesomeIcon
            icon={showReviews ? faMinus : faPlus}
            onClick={() => toggleReviews(!showReviews)}
            className="bg-helper p-2 rounded-full cursor-pointer text-background"
          />
          <SecondaryButton
            text='Add Review'
            onClick={() => setVisibleComponent('addReview')}
          />
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
      </div>
    </>
  );
};
export default ProductPage;
