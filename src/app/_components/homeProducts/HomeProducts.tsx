"use client"
import { getAllProducts } from '@/app/services/queryFunctions/products'
import { useQuery } from '@tanstack/react-query'
import {IProductDisplay} from '../../types/products';
import React from 'react'
import ProductCard from '../productCard/ProductCard'
import AdvanceSearch from '../advaceSearch/AdvanceSearch'
const HomeProducts = () => {
    const {data:products=[],isLoading, isError} = useQuery({queryKey:['products'],queryFn:getAllProducts})
  return (
    <div className='bg-primaryDark mt-4 pt-4'>
        <div className='flex justify-between flex-wrap gap-4 container'> {products.map((product:IProductDisplay,index:number)=>{
            return <div key={index}>
                <ProductCard {...product}/>
                </div>
        })}</div>
        </div>
  )
}
export default HomeProducts