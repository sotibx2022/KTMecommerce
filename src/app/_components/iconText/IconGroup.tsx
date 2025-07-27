"use client"
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import IconButton from './IconButton';
import { ShoppingCart, Heart } from 'lucide-react'; // Import Lucide icons
import dynamic from 'next/dynamic';
import IconLoadingSkleton from './IconLoadingSkleton';
const IconButton = dynamic(() => import('./IconButton'), {
  ssr: false,
  loading: () => <IconLoadingSkleton />
});
const IconGroup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartItems, loading } = useSelector((state: { cart: any }) => state.cart);
  const { wishListItems, wishListLoading } = useSelector((state: { wishList: any }) => state.wishList);
  return (
    <div className='flex gap-2'>
      <IconButton
        icon={<ShoppingCart />} // Lucide icon as JSX
        name="Cart"
        onClick={() => router.push("/dashboard/cart")}
        number={cartItems.length}
        loading={loading}
      />
      <IconButton
        icon={<Heart />} // Lucide icon as JSX
        name="Wishlist"
        onClick={() => router.push("/dashboard/wishlist")}
        number={cartItems.length}
        loading={wishListLoading}
      />
    </div>
  );
}
export default IconGroup;