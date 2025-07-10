"use client";
import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState } from '@/app/redux/store';
import { IPublicWishlistItem, IWishListItemDisplay } from '@/app/types/wishlist';
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide';
import NoData from '@/app/_components/noData/NoData';
import { HeartOff, Type, UnlockIcon } from 'lucide-react';
import PublicWishlist from './PublicWishlist';
import { DisplayContext } from '@/app/context/DisplayComponents';
import { Button } from '@/components/ui/button';
import SingleWishListCard from '@/app/_components/wishlistCard/SingleWIshListCard';
const wishListItemsPage = () => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext)
  const { wishListItems, wishListLoading } = useSelector((state: ReduxState) => state.wishList);
  if (wishListLoading) {
    return (<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <SkeletonSlide />
      <SkeletonSlide />
      <SkeletonSlide />
      <SkeletonSlide />
    </div>)
  }
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8  w-full">
      {!wishListLoading && wishListItems.length === 0 ? (
        <NoData
          icon={<HeartOff className="w-12 h-12 text-red-500" strokeWidth={1.5} />}
          notFoundMessage="No orders found"
          buttonText="Browse Products"
          buttonLink="/catalog/advanceSearch?highlighted=none"
        />
      )
        :
        (<>
          <div className="wishlistPageHeader">
            <Button onClick={() => setVisibleComponent('publicWishlist')}><UnlockIcon /> Public </Button>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {wishListItems?.map((item: IWishListItemDisplay, index: number) => (
              <SingleWishListCard item={item} key={index} actionAble={true} />
            ))}
          </div>
          {visibleComponent === 'publicWishlist' && <PublicWishlist />}
        </>)}
    </div>
  )
};
export default wishListItemsPage;