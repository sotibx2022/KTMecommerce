"use client";
import LoginComponent from '@/app/_components/authComponent/LoginComponent';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import SingleProduct from '@/app/_components/singleProduct/SingleProduct';
import AddSingleProductReviews from '@/app/_components/singleProductReviews/AddSingleProductReviews';
import SingleProductReviews from '@/app/_components/singleProductReviews/SingleProductReviews';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { getSingleProduct } from '@/app/services/queryFunctions/products';
import { IProductDisplay } from '@/app/types/products';
import { Remark } from '@/app/types/remarks';
import { config } from '@/config/configuration';
import {  faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
const Page = () => {
  const context = useContext(UserDetailsContext);
    if(!context){
      throw new Error("The User Details context is not working.")
    }
    const {userDetails} = context;
  const [productId, setProductId] = useState<string>("");
  const[showReviews, setShowReviews] = useState<boolean>(true)
   const [productDetails, setProductDetails] = useState<IProductDisplay | null>(null)
  const toggleReviews=(value:boolean)=>{
    setShowReviews(value)
  }
  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProduct()
      if (product) {
        setProductDetails(product)
      }
    }
    getProduct()
  }, []);
const fetchProduct = async () => {
  if (typeof window !== "undefined") {
    const url = window.location.href
    const productId = url.split("/")[4].split("&")[0].split(":")[1];
    if (productId) {
      try {
        const response = await axios.get(`${config.websiteUrl}/api/products/${productId}`)
        return response.data.singleProduct;
      } catch (error) {
        console.error("Error fetching product:", error)
        return null
      }
    }
  }
  return null
}
  return (
    <>
       {productDetails !== null ?  <SingleProduct {...productDetails}/> : <LoadingComponent/>}
      <div className="reviewsContainer container">
        <div className="reviewsHeading flex gap-4 mb-2 items-center">
        <h2 className='primaryHeading'>Reviews</h2>
        <FontAwesomeIcon
                  icon={showReviews ? faMinus : faPlus}
                  onClick={() => toggleReviews(!showReviews)}
                  className="bg-helper p-4 rounded-full cursor-pointer text-background"
                />
        </div>
      {showReviews && 
      <div className='flex  items-center gap-4 flex-col md:flex-row'>
    <div className='remarks-container shadow-primaryLight w-full lg:w-1/2 p-2'>
  {productDetails && Array.isArray(productDetails.remarks) && productDetails.remarks.length > 0 ? (
    productDetails.remarks.map((remark: Remark, index: number) => (
      <div key={index}>
        <SingleProductReviews {...remark}/>
      </div>
    ))
  ) : (
      <p className='text-red-500'>No remarks available</p>
  )}
</div>
<AddSingleProductReviews readOnly={userDetails === null}
productDetails={{
  _id: productDetails?._id || '', // Provide fallback for undefined
}}/>
      </div>
      }
      </div>
    </>
  );
};
export default Page;
