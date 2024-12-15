"use client"
import Footer from '@/app/_components/footer/Footer'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import NavBar from '@/app/_components/navbar/Navbar'
import ProductCard from '@/app/_components/productCard/ProductCard'
import { getSelectedProducts } from '@/app/services/queryFunctions/products'
import { Product } from '@/app/types/products'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const page = () => {
    const[searchValue, setSearchValue] = useState<string>("")
    const {data:searchedProduct, isLoading, isError} = useQuery({queryKey:['searchedProduct',searchValue],
        queryFn:()=>getSelectedProducts(searchValue),
        enabled: Boolean(searchValue)
    })
    useEffect(()=>{
        if(typeof window !== "undefined"){
            const PageUrl = window.location.href;
            const value = PageUrl.split("=")[1];
            setSearchValue(value)
        }
    },[])
    if(isLoading){
      return <LoadingComponent/>
    }
  return (
    <>
    <NavBar/>
    {searchedProduct && searchedProduct.length > 0 ? (
  <div className="flex justify-between flex-wrap gap-4">
    {searchedProduct.map((product: Product, index: number) => {
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
 <Footer/>
    </>
  )
}
export default page