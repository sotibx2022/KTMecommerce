export interface IProductImage {
  _id: string;
  brand: string;
  price: string;
  stockAvailability: boolean;
  image: string;
  productDescription: string;
  productFeatures: string[];
  productName: string;
  overallRating: number;
}
const singleProduct:IProductImage =   {
  "_id": "6759d8e9f83253944dc73c2e",
  "brand": "Samsung",
  "price": "2299",
  "stockAvailability": true,
  "image": "https://picsum.photos/200/300?random=30",
  "productDescription": "Samsung Galaxy Watch 4 brings essential smartwatch features, fitness tracking, and a stylish design at an affordable price.",
  "productFeatures": [
    "Super AMOLED display with Always-on feature",
    "Tracks activity, heart rate, and sleep",
    "Built-in GPS and compass",
    "Water-resistant up to 50 meters",
    "Supports Samsung Health and third-party apps"
  ],
  "productName": "Samsung Galaxy Watch 4 - Green",
  "overallRating": 0
}
import ProductImage from '@/app/_components/singleProduct/ProductImage'
import { IProductDisplay } from '@/app/types/products'
import React from 'react'
const page = () => {
  return (
    <div>
      <ProductImage {...singleProduct}/>
    </div>
  )
}
export default page