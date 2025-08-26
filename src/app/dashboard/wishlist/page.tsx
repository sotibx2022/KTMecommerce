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
        <div className="flex-1 flex flex-col">
          <NoData
            icon={<HeartOff />}
            notFoundMessage="There are no items in the cart. Please browse and add products"
          />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Browse Products */}
            <div
              onClick={() => router.push("/catalog/advanceSearch?highlighted=none")}
              className="
          flex items-center gap-3 p-4 rounded-2xl cursor-pointer
          border border-[var(--primary)]
          bg-[var(--background)] shadow-sm
          transition-all duration-300
          hover:bg-[var(--primary)] hover:text-[var(--background)]
          hover:shadow-lg hover:scale-[1.02]
          active:scale-95
        "
            >
              <ShoppingBag className="w-6 h-6 text-[var(--helper)]" />
              <span className="font-medium">Browse Products</span>
            </div>
            {/* Check Recently Visited Products */}
            <div
              onClick={() => router.push("/pages/recent")}
              className="
          flex items-center gap-3 p-4 rounded-2xl cursor-pointer
          border border-[var(--primary)]
          bg-[var(--background)] shadow-sm
          transition-all duration-300
          hover:bg-[var(--primary)] hover:text-[var(--background)]
          hover:shadow-lg hover:scale-[1.02]
          active:scale-95
        "
            >
              <History className="w-6 h-6 text-[var(--helper)]" />
              <span className="font-medium">Check Recently Visited Products</span>
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
