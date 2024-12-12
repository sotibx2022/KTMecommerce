"use client"
import Footer from '@/app/_components/footer/Footer'
import NavBar from '@/app/_components/navbar/Navbar'
import { getSelectedProducts } from '@/app/services/queryFunctions/products'
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
  return (
    <>
    <NavBar/>
 {searchValue !== " " && <h1>{searchValue}</h1>}
 <Footer/>
    </>
  )
}
export default page