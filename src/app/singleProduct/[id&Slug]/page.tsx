"use client";
import Footer from '@/app/_components/footer/Footer';
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import NavBar from '@/app/_components/navbar/Navbar';
import SingleProduct from '@/app/_components/singleProduct/SingleProduct';
import AddSingleProductRating from '@/app/_components/singleProductReviews/AddSingleProductRating';
import AddSingleProductReviews from '@/app/_components/singleProductReviews/AddSingleProductReviews';
import SingleProductReviews from '@/app/_components/singleProductReviews/SingleProductReviews';
import { UserDetailsContextComponent } from '@/app/context/UserDetailsContextComponent';
import { store } from '@/app/redux/store';
import { getSingleProduct } from '@/app/services/queryFunctions/products';
import { Remark } from '@/app/types/remarks';
import { faCaretRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
const Page = () => {
  const [productId, setProductId] = useState<string>("");
  const[showReviews, setShowReviews] = useState<boolean>(true)
  const toggleReviews=(value:boolean)=>{
    setShowReviews(value)
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      const splittedUrl = url.split("&")[0].split(":")[3]; // Adjust splitting logic if necessary
      setProductId(splittedUrl);
    }
  }, []);
  // Only initialize the query once the productId is set
  const { data: singleProduct, isLoading, isError } = useQuery({queryKey:["singleProduct",productId],
    queryFn:()=>getSingleProduct(productId),
    enabled:!!productId
  });
  if (isLoading) {
    return <LoadingComponent/>
  }
  if (isError) {
    return <h1>Error loading product details</h1>;
  }
  return (
    <>
    <UserDetailsContextComponent>
      <Provider store={store}>
      <NavBar />
      {singleProduct && (
        <SingleProduct {...singleProduct}/>
      )}
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
      <div className='flex  items-center gap-4'>
    <div className='remarks-container shadow-primaryLight w-full lg:w-1/2 p-2'>
  {singleProduct && Array.isArray(singleProduct.remarks) && singleProduct.remarks.length > 0 ? (
    singleProduct.remarks.map((remark: Remark, index: number) => (
      <div key={index}>
        <SingleProductReviews {...remark}/>
      </div>
    ))
  ) : (
      <p className='text-red-500'>No remarks available</p>
  )}
</div>
      <AddSingleProductReviews />
      </div>
      }
      </div>
      <Footer />
      </Provider>
      </UserDetailsContextComponent>
    </>
  );
};
export default Page;
