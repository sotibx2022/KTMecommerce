"use client";
import RemarksDisplay from '@/app/_components/remarksDisplay/RemarksDisplay';
import SingleProduct from '@/app/_components/singleProduct/SingleProduct';
import AddSingleProductReviews from '@/app/_components/singleProductReviews/AddSingleProductReviews';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { getSingleProduct } from '@/app/services/queryFunctions/products';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import SecondaryButton from '@/app/_components/secondaryButton/SecondaryButton';
import { DisplayContext } from '@/app/context/DisplayComponents';
import EditSingleProductReview from '@/app/_components/singleProductReviews/EditSingleProductReview';
import { getSpecificRemarks } from '@/app/services/queryFunctions/remarks';
import SingleProductPageSkeleton from '@/app/_components/loadingComponent/SingleProductPageSkeleton';
import { useSearchParams } from 'next/navigation';
const ProductPage = () => {
  const searchParams = useSearchParams();
  console.log(searchParams)
 const [productId,setProductId] = useState<string>(searchParams.get('id') ?? "");
  const context = useContext(UserDetailsContext);
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  const [showReviews, setShowReviews] = useState(true);
  const toggleReviews = (value: boolean) => {
    setShowReviews(value);
  };
  const { data: productDetails, isPending, error } = useQuery({
    queryKey: ['specificProduct', productId],
    queryFn: () => getSingleProduct(productId),
    enabled: !!productId
  });
  const { data: remarks, isPending: isRemarksPending } = useQuery({
    queryKey: ['specificRemarks', productId],
    queryFn: () => getSpecificRemarks(productId),
    enabled: !!productId
  });
  const productDatas = productDetails?.success ? productDetails?.data : null;
  const productIdentifier = {
    productId: productDatas?._id || "",
    productName: productDatas?.productName || "",
    productImage: productDatas?.image || ""
  };
  if (isPending) {
    return <SingleProductPageSkeleton />;
  }
  if (productDatas === null) {
    return <h1>There is no product Data at all.</h1>;
  }
  return (
      <>
      {productDatas && <SingleProduct {...productDatas} />}
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
        {showReviews && remarks?.success && remarks.data && (
          <RemarksDisplay remarks={remarks.data} />
        )}
        {visibleComponent === 'addReview' && (
          <AddSingleProductReviews 
            readOnly={userDetails === null}
            productIdentifier={productIdentifier}
          />
        )}
        {visibleComponent === 'editReview' && (
          <EditSingleProductReview productIdentifier={productIdentifier} />
        )}
      </div>
      </>
  );
};
export default ProductPage;