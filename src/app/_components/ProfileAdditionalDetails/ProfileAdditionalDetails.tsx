"use context"
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent'
import { CartState } from '@/app/redux/cartSlice'
import { faClipboardList, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
const ProfileAdditionalDetails = () => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
    const context = useContext(UserDetailsContext);
    if(!context){
      throw new Error ("The User Details Context is not defined")
    }
    const {userDetails} = context;
  return (
    <div>
                <div className="profileAdditionalDetails">
      <ul>
      <li className='primaryParagraph text-sm capitalize'>
          <FontAwesomeIcon icon={faUser} className="mr-2" />
          {userDetails?.accountStatus}
        </li>
        <Link href="/dashboard/carts"><li className='primaryParagraph text-sm'>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Carts:<span className='hover:underline ml-2'>{cartItems.length || 0}</span>
        </li></Link>
        <Link href="/dashboard/wishlist"><li className='primaryParagraph text-sm'>
          <FontAwesomeIcon icon={faHeart} className="mr-2" />
          Wishlists:<span className='hover:underline ml-2'>{userDetails?.wishlist?.length || 0}</span> 
        </li></Link>
       <Link href="/dashboard/orders"> <li className='primaryParagraph text-sm'>
          <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
          Orders: <span className='hover:underline ml-2'>{userDetails?.orderHistory?.length || 0}</span>
        </li></Link>
      </ul>
    </div>
    </div>
  )
}
export default ProfileAdditionalDetails