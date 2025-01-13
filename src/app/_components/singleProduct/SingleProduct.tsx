"use client"
import React, { useContext } from 'react'
import {Product} from "../../types/products"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import PrimaryButton from '../primaryButton/PrimaryButton'
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/app/redux/cartSlice'
import { ICartItem } from '@/app/types/user'
import useAddItemToCart from './useAddItemToCart'
const SingleProduct:React.FC<ICartItem> = ({...cartItemDetails}) => {
  const {productName,productDescription,brand,price,stockAvailability,productFeatures,_id,image} = cartItemDetails;
 const addItemToCart = useAddItemToCart()
  return (
    <div className='container'>
    <div className=' flex-col md:flex-row flex justify-between items-center py-4 gap-4 min-h-[50vh]'>
          <div className="singleProductLeft w-1/2">
            <h1 className='subHeading'>{productName}</h1>
            <p className='primaryParagraph'>{productDescription}</p>
            <div className="productDetails flex  items-center gap-4 my-2">
                <p className="text-background bg-helper p-2 rounded-md">Brand: {brand}</p>
                <h3
  className={`text-background p-2 rounded-md ${
    stockAvailability ? "bg-green-500" : "bg-red-500"
  }`}
>
  {stockAvailability ? "In Stock" : "Out of Stock"}
</h3>
<p className="price-highlight">${price}</p>
            </div>
            <h2 className='primaryHeading'>Features</h2>
            <ul className='primaryList'>
              {productFeatures && productFeatures.map((feature: string, index: number) => (
                <li key={index} className='text-primaryDark flex items-center gap-1'>
                  <FontAwesomeIcon icon={faCaretRight}className='mr-2' />
                  <p>{feature}</p>
                  </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2">
            <img
              src={image}
              alt={productName}
              className="max-w-full rounded-lg"
            />
          </div>
        </div>
        <div className="productActions flex gap-4 my-4">
        <PrimaryButton searchText='To Cart' onClick={()=>addItemToCart({...cartItemDetails})}/>
        <PrimaryButton searchText='To WishList'/>
        <PrimaryButton searchText='To Others'/>
      </div>
      </div>
  )
}
export default SingleProduct