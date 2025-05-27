"use client";
import React from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '@/app/redux/store';
import Link from 'next/link';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IWishListItem } from '@/app/types/wishlist';
const wishListItemsPage = () => {
  const { wishListItems,wishListLoading } = useSelector((state:ReduxState) => state.wishList);
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8  w-full">
  {wishListItems.length === 0 ? (
    <div className='w-full h-full text-red-500 flex flex-col items-center gap-4'>
      <p>There are no wish List Items Items Saved.</p>
      <Link href="/pages/isNewItems">
        <PrimaryButton searchText="Browse" />
      </Link>
    </div>):(<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {wishListItems?.map((item:IWishListItem,index:number) => (
              <div
                key={index}
                className="group relative bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 shadow-primaryLight"
              >
                <div className="rounded-lg overflow-hidden bg-background">
                  <img
                    src={item.image}
                    alt={item.productName}
                    className="w-full max-h-[200px] object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-primaryDark">
                      <Link href={`/products/${item.productId}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.productName}
                      </Link>
                    </h3>
                    <p className="text-background bg-helper p-2 rounded-md text-center">{item.brand}</p>
                  </div>
                  <p className="price-highlight">
                    ${item.price}
                  </p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <PrimaryButton searchText="addToCart"/>
                 <button
                       className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                       aria-label="Delete review"
                     >
                       <FontAwesomeIcon icon={faTrashAlt} className="w-5 h-5" />
                     </button>
                </div>
              </div>
            ))}
          </div>)}
    </div>
  )
};
export default wishListItemsPage;