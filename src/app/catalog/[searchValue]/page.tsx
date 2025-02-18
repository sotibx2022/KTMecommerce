"use client"
import AdvanceSearch from '@/app/_components/advaceSearch/AdvanceSearch'
import AdvanceSearchProvider from '@/app/_components/advaceSearch/AdvanceSearchProvider'
import Footer from '@/app/_components/footer/Footer'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import NavBar from '@/app/_components/navbar/Navbar'
import ProductCard from '@/app/_components/productCard/ProductCard'
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent'
import { getSelectedProducts, SearchParams } from '@/app/services/queryFunctions/products'
import { IProductDisplay } from '@/app/types/products'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
const page = () => {
  const [searchValues, setSearchValues] = useState<SearchParams>({
    keyword: undefined,
    category: undefined,
    subcategory: undefined,
    minprice: undefined,
    maxprice: undefined,
    rating: undefined,
  });
  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryString = window.location.href.split("/").pop();
      const queryParams = new URLSearchParams(queryString);
      setSearchValues({
        keyword: queryParams.get("keyword") || "",  // Default to empty string if no keyword is found
        category: queryParams.get("category") || "",  // Default to empty string if no category is found
        subcategory: queryParams.get("subcategory") || undefined,  // Default to undefined if subcategory is missing
        minprice: queryParams.has("minprice") ? parseFloat(queryParams.get("minprice")!) : undefined,  // Default to null if no minPrice
        maxprice: queryParams.has("maxprice") ? parseFloat(queryParams.get("maxprice")!) : undefined,  // Default to null if no maxPrice
        rating: queryParams.has("rating") ? parseFloat(queryParams.get("rating")!) : undefined,  // Default to null if no rating
      });
    }
  }, []);
  const { data: searchedProduct = [], isLoading, isError } = useQuery({
    queryKey: ['selectedProducts', searchValues],
    queryFn: () => getSelectedProducts({ ...searchValues }),
    enabled: !!searchValues?.category || !!searchValues?.keyword?.trim(), // At least one must be present
  });
  if(isLoading){
    return <LoadingComponent/>
  }
  if(isError){
    return <h1>Error</h1>
  }
  return (
    <>
    <div className='productsPageContainer container flex justify-start gap-2 my-4'>
    {searchedProduct && searchedProduct.length > 0 ? (
  <div className="flex justify-start flex-wrap gap-4">
    {searchedProduct.map((product: IProductDisplay, index: number) => {
      return (
        <div key={index}>
          <ProductCard {...product} />
        </div>
      );
    })}
  </div>
) : (
  <div className="text-center w-full">
    <p>There are no products with the provided search text.</p>
  </div>
)}
    </div>
    </>
  )
}
export default page