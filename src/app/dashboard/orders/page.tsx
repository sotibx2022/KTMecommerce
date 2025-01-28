"use client"
import CartSummary from '@/app/_components/cartSummary/CartSummary';
import CartTableSummary from '@/app/_components/cartTableSummary/CartTableSummary';
import DeliveryMethod from '@/app/_components/deliveryMethod/DeliveryMethod';
import LinkComponent from '@/app/_components/linkComponent/LinkComponent';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import ProfileDisplay from '@/app/_components/profileDisplay/ProfileDisplay';
import { CartState } from '@/app/redux/cartSlice';
import React from 'react'
CartTableSummary
const page = () => {
  return (
    <div className='container'>
    <div className="container flex justify-between items-start">
    <CartTableSummary/>
    <CartSummary order={false}/>
  </div>
  <div className="ProfileDetails">
    <ProfileDisplay/>
    <DeliveryMethod/>
    <PrimaryButton searchText="Order Now"/>
  </div>
  </div>
  )
}
export default page