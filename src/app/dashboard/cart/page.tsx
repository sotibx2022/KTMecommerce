"use client"
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent'
import React, { useContext } from 'react'
const page = () => {
  const context = useContext(UserDetailsContext);
  if(!context){
    throw new Error ("The user details context is not defined at cart page.")
  }
  const {userDetails} = context;
  console.log(userDetails?.carts)
  return (
    <div>
      {/* {userDetails?.carts?.cartItems.map((cartItem,index)=>{
return <div><h1>{cartItem.productName}</h1></div>
      })} */}
    </div>
  )
}
export default page