"use client"
import { getAllProducts } from '@/app/services/queryFunctions/products'
import { Product } from '@/app/types/products'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ProductCard from '../productCard/ProductCard'
import AdvanceSearch from '../advaceSearch/AdvanceSearch'
const HomeProducts = () => {
    const {data:products=[],isLoading, isError} = useQuery({queryKey:['products'],queryFn:getAllProducts})
  return (
    <div className='bg-primaryDark '>
        <div className="container pt-4 flex justify-between gap-4">
          <AdvanceSearch/>
        <div className='flex justify-between flex-wrap gap-4'> {products.map((product:Product,index:number)=>{
            return <div key={index}>
                <ProductCard {...product}/>
                </div>
        })}</div>
        </div>
    </div>
  )
}
export default HomeProducts