"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import SingleProduct from '@/app/_components/singleProduct/SingleProduct'
import { IProductDisplay } from '@/app/types/products'
import { config } from '@/config/configuration'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const fetchProduct = async () => {
  if (typeof window !== "undefined") {
    const url = window.location.href
    const productId = url.split("/")[4]
    if (productId) {
      try {
        const response = await axios.get(`${config.websiteUrl}/api/products/${productId}`)
        return response.data.singleProduct
      } catch (error) {
        console.error("Error fetching product:", error)
        return null
      }
    }
  }
  return null
}
const ProductPage = () => {
  const [productDetails, setProductDetails] = useState<IProductDisplay | null>(null)
  useEffect(() => {
    const getProduct = async () => {
      const product = await fetchProduct()
      if (product) {
        setProductDetails(product)
      }
    }
    getProduct()
  }, [])
    if(productDetails !== null){
      return <SingleProduct {...productDetails} />
    }else{
      return <LoadingComponent/>
    }
}
export default ProductPage