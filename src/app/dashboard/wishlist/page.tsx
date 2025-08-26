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
import SecondaryButton from '@/app/_components/secondaryButton/SecondaryButton';
import { useRouter } from 'next/navigation';
import LinkComponent from '@/app/_components/linkComponent/LinkComponent';
const WishListItemsPage = () => {
  const router = useRouter()
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const { userDetailsLoading } = useUserDetails();
  const { wishListItems, wishListLoading, initialized } = useSelector((state: ReduxState) => state.wishList);
  const isLoading = wishListLoading || userDetailsLoading || !initialized;
  const isEmpty = !isLoading && wishListItems.length === 0;
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 w-full">
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
        <div className="flex-1 flex flex-col items-center justify-center">
          <NoData
            icon={<HeartOff />}
            notFoundMessage="There are no items in the WishList. Please browse and add products"
          />
          <div className="mt-6 flex flex-col sm:flex-row gap-4 browserButtons">
            <div className="mt-6 flex flex-col gap-4 browserButtons">
              <LinkComponent
                text="Browse Products"
                href={"/catalog/advanceSearch?highlighted=none"} />
              <LinkComponent
                text="Check Recently Visited Products"
                href={"/pages/recent"} />
            </div>
          </div>
        </div>
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
