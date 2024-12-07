"use client"
import { getAllProducts } from '@/app/services/queryFunctions/products'
import { Product } from '@/app/types/products'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ProductCard from '../productCard/ProductCard'
const HomeProducts = () => {
    const {data:products=[],isLoading, isError} = useQuery({queryKey:['products'],queryFn:getAllProducts})
  return (
    <div className='bg-primaryDark '>
        <div className="container pt-4">
        <h2 className='subHeading'>Fresh Sell</h2>
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