"use client";
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '@/app/redux/store';
import { IWishListItemDisplay } from '@/app/types/wishlist';
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide';
import NoData from '@/app/_components/noData/NoData';
import { HeartOff, UnlockIcon } from 'lucide-react';
import PublicWishlist from './PublicWishlist';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { Button } from '@/components/ui/button';
import SingleWishListCard from '@/app/_components/wishlistCard/SingleWIshListCard';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
const WishListItemsPage = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const { userDetailsLoading } = useUserDetails();
  const { wishListItems, wishListLoading, initialized } = useSelector((state: ReduxState) => state.wishList);
  const isLoading = wishListLoading || userDetailsLoading || !initialized;
  const isEmpty = !isLoading && wishListItems.length === 0;
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 w-full">
      {isLoading ? (
        <>
          {console.log("Rendering: Skeleton UI")}
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <SkeletonSlide />
            <SkeletonSlide />
            <SkeletonSlide />
            <SkeletonSlide />
          </div>
        </>
      ) : isEmpty ? (
        <>
          {console.log("Rendering: No Data UI")}
          <NoData
            icon={<HeartOff className="w-12 h-12 text-red-500" strokeWidth={1.5} />}
            notFoundMessage="No Wishlist Items found"
            buttonText="Browse Products"
            buttonLink="/catalog/advanceSearch?highlighted=none"
          />
        </>
      ) : (
        <>
          {console.log("Rendering: Wishlist Items")}
          <div className="wishlistPageHeader mb-4">
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
