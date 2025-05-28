import { DisplayContext } from '@/app/context/DisplayComponents';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { CartState } from '@/app/redux/cartSlice';
import { IWishListState } from '@/app/redux/wishListSlice';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { useSelector } from 'react-redux';
import IconButton from './IconButton';
import { faHeart, faLuggageCart } from '@fortawesome/free-solid-svg-icons';
import LoginComponent from '../authComponent/LoginComponent';
const IconGroup = () => {
    const context = useContext(UserDetailsContext);
    if(!context){
        throw new Error("User Details Context is not available at this component")
    }
    const {userDetails} = context
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