"use client";
import RemarksDisplay from '@/app/_components/remarksDisplay/RemarksDisplay';
import SingleProduct from '@/app/_components/singleProduct/SingleProduct';
import AddSingleProductReviews from '@/app/_components/singleProductReviews/AddSingleProductReviews';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { getSingleProduct } from '@/app/services/queryFunctions/products';
import { IProductDisplay } from '@/app/types/products';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
const ProductPage = () => {
  const[productId, setProductId] = useState("")
  const context = useContext(UserDetailsContext);
  if (!context) {
    throw new Error("The User Details context is not working.");
  }
  const { userDetails } = context;
  useEffect(() => {
    if (typeof window !== "undefined"){
      const url = window.location.href;
      const id=url.split("/")[4].split("&")[0].split(":")[1];
      setProductId(id)
    }},[])
  const [showReviews, setShowReviews] = useState(true);
  const toggleReviews = (value: boolean) => {
    setShowReviews(value);
  };
  const { data: productDetails, isPending, error } = useQuery({
    queryKey: ['specificProduct', productId],
    queryFn: () => 
      getSingleProduct(productId),
    enabled: !!productId
  });
  if (isPending) {
    return <LoadingComponent />;
  }
  return (
    <>
      <SingleProduct {...productDetails} />
      <div className="reviewsContainer container">
        <div className="reviewsHeading flex gap-4 mb-2 items-center">
          <h2 className="primaryHeading">Reviews</h2>
          <FontAwesomeIcon
            icon={showReviews ? faMinus : faPlus}
            onClick={() => toggleReviews(!showReviews)}
            className="bg-helper p-4 rounded-full cursor-pointer text-background"
          />
        </div>
        {showReviews && (
          <div className="flex items-center gap-4 flex-col md:flex-row">
              <RemarksDisplay productId={productId} />
            <AddSingleProductReviews 
              readOnly={userDetails === null}
              productDetails={{
                _id: productDetails._id,
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default ProductPage;