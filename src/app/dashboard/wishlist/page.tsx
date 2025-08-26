"use client";
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '@/app/redux/store';
import { IWishListItemDisplay } from '@/app/types/wishlist';
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide';
import NoData from '@/app/_components/noData/NoData';
import { HeartOff, ShoppingBag, UnlockIcon, History } from 'lucide-react';
import PublicWishlist from './PublicWishlist';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { Button } from '@/components/ui/button';
import SingleWishListCard from '@/app/_components/wishlistCard/SingleWIshListCard';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
import SecondaryButton from '@/app/_components/secondaryButton/SecondaryButton';
import { useRouter } from 'next/navigation';
import LinkComponent from '@/app/_components/linkComponent/LinkComponent';
import EmptyState from '../cart/EmptyState';
const WishListItemsPage = () => {
  const router = useRouter()
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const { userDetailsLoading } = useUserDetails();
  const { wishListItems, wishListLoading, initialized } = useSelector((state: ReduxState) => state.wishList);
  const isLoading = wishListLoading || userDetailsLoading || !initialized;
  const isEmpty = !isLoading && wishListItems.length === 0;
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 w-full">
      <h2 className="secondaryHeading">Cart</h2>
      {isLoading ? (
        <>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <SkeletonSlide />
            <SkeletonSlide />
            <SkeletonSlide />
            <SkeletonSlide />
          </div>
        </>
      ) : isEmpty ? (
        <EmptyState icon={<HeartOff />} message="There are no items in the WishList. Please browse and add products" />
      ) : (
        <>
          {console.log("Rendering: Wishlist Items")}
          <div className="wishlistPageHeader mb-4">
            <h2 className="secondaryHeading">Wishlists</h2>
            <Button onClick={() => setVisibleComponent('publicWishlist')}>
              <UnlockIcon className="mr-2" /> Public
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {wishListItems.map((item: IWishListItemDisplay, index: number) => (
              <SingleWishListCard item={item} key={index} actionAble={true} />
            ))}
          </div>
          {visibleComponent === 'publicWishlist' && <PublicWishlist />}
        </>
      )}
    </div>
  );
};
export default WishListItemsPage;
