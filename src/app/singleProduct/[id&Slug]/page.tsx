"use client";
import Footer from '@/app/_components/footer/Footer';
import NavBar from '@/app/_components/navbar/Navbar';
import { getSingleProduct } from '@/app/services/queryFunctions/products';
import { useQueries, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
const page = () => {
  const [productId, setProductId] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
     const splittedUrl = url.split("&")[0].split(":")[3]
     setProductId(splittedUrl)
  }}, []);
  const { data: singleProduct, isLoading, isError } = useQuery({
    queryKey: ['Product', productId], // Include the product ID in the queryKey
    queryFn: () => getSingleProduct(productId), // Fetch function
  });
  return (
    <>
      <NavBar />
      <h1>Product ID: {productId}</h1>
      <Footer />
    </>
  );
};
export default page;
