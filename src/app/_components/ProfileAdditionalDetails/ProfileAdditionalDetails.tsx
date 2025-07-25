"use context"
import { useUserDetails } from '@/app/context/UserDetailsContextComponent'
import { useOrders } from '@/app/hooks/queryHooks/useOrders'
import { CartState } from '@/app/redux/cartSlice'
import { ReduxState } from '@/app/redux/store'
import { IWishListState } from '@/app/redux/wishListSlice'
import { faClipboardList, faHeart, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
const ProfileAdditionalDetails = () => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const { wishListItems } = useSelector((state:ReduxState) => state.wishList);
    const {userDetails} = useUserDetails();
    const {data:orders} = useOrders(userDetails?._id!)
  return (
    <div>
                <div className="profileAdditionalDetails">
     {userDetails? <ul>
      <li className='primaryParagraph capitalize'>
          <FontAwesomeIcon icon={faUser} className="mr-2" size='sm'/>
          {userDetails?.accountStatus}
        </li>
        <Link href="/dashboard/cart"><li className='primaryParagraph'>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" size='sm' />
          Carts:<span className='hover:underline ml-2'>{cartItems.length || 0}</span>
        </li></Link>
        <Link href="/dashboard/wishlist"><li className='primaryParagraph'>
          <FontAwesomeIcon icon={faHeart} className="mr-2" size='sm' />
          Wishlists:<span className='hover:underline ml-2'>{wishListItems && wishListItems.length || 0}</span>
        </li></Link>
        <Link href="/dashboard/orders"><li className='primaryParagraph'>
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" size='sm' />
          Orders:<span className='hover:underline ml-2'>{orders?.length || 0}</span>
        </li></Link>
      </ul>:<ul className='flex flex-col gap-2'>
        <li className='w-1/3 h-[20px] bg-primaryLight rounded-lg animate-pulse'></li>
        <li className='w-1/3 h-[20px] bg-primaryLight rounded-lg animate-pulse'></li>
        <li className='w-1/3 h-[20px] bg-primaryLight rounded-lg animate-pulse'></li>
        <li className='w-1/3 h-[20px] bg-primaryLight rounded-lg animate-pulse'></li>
        </ul>}
    </div>
    </div>
  )
}
export default ProfileAdditionalDetails