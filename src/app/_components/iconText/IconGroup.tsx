import { DisplayContext } from '@/app/context/DisplayComponents';
import { CartState, clearCartItems } from '@/app/redux/cartSlice';
import { clearWishListItems, IWishListState } from '@/app/redux/wishListSlice';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconButton from './IconButton';
import { faHeart, faLuggageCart } from '@fortawesome/free-solid-svg-icons';
import LoginComponent from '../authComponent/LoginComponent';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
const IconGroup = () => {
const {userDetails} = useUserDetails();
    const dispatch = useDispatch()
    useEffect(()=>{
        if(!userDetails){
dispatch(clearCartItems());
dispatch(clearWishListItems())
        }
    },[userDetails])
    const {visibleComponent,setVisibleComponent} = useContext(DisplayContext)
    const {cartItems,loading:cartItemsLoading} = useSelector((state: { cart: CartState }) => state.cart);
      const {wishListItems,wishListLoading} = useSelector((state:{wishList:IWishListState})=>state.wishList);
      const router = useRouter();
      const handleProtectedRoute = (path:string) => {
        if (!userDetails) {
          setVisibleComponent('login');
        } else {
          router.push(path);
        }
      };
  return (
    <div>
        <div className="cartIdea flex gap-2 z-0">
      <>
  {cartItemsLoading ? (
    <IconButton
      icon={faLuggageCart}
      name="Cart"
      disabled
      className='animate-pulse'
    />
  ) : (
    <IconButton
      icon={faLuggageCart}
      name="Cart"
      number={cartItems?.length ?? 0}
      onClick={() => handleProtectedRoute("/dashboard/cart")}
    />
  )}
</>
        {wishListLoading?<IconButton
          icon={faHeart}
          name="Wishlist"
          disabled
          className='animate-pulse'
        />:<IconButton
          icon={faHeart}
          name="Wishlist"
          number={wishListItems.length ?? 0}
          onClick={() => handleProtectedRoute('/dashboard/wishlist')}
        />}
      </div>
      {visibleComponent === 'login' && <LoginComponent/>}
    </div>
  )
}
export default IconGroup