"use client";
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ReduxState } from '@/app/redux/store';
import Link from 'next/link';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IWishListItem, IWishListItemDisplay } from '@/app/types/wishlist';
import SkeletonSlide from '@/app/_components/loadingComponent/SkeletonSlide';
import LinkComponent from '@/app/_components/linkComponent/LinkComponent';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { removeFromWishList } from '@/app/redux/wishListSlice';
const wishListItemsPage = () => {
  const context = useContext(UserDetailsContext);
  if(!context){
throw new Error ("User Details Context is not defined at this component")
  }
  const {userDetails} = context;
  const userId = userDetails?._id;
  const queryClient = useQueryClient()
  const removeItemFromDataBase = async(productId:string) =>{
const response = await axios.post('/api/wishList/removeFromWishList',productId);
return response.data;
  }
  const deleteWishListMutation =useMutation({mutationFn:removeItemFromDataBase,
    onSuccess:()=>{
queryClient.invalidateQueries({ 
      queryKey: ["wishListItems", userId],
      refetchType: 'active',
    });
    }
  })
  const removeItemFromWishList =(productId:string) =>{
    removeFromWishList(productId);
deleteWishListMutation.mutate(productId)
  }
  const { wishListItems,wishListLoading } = useSelector((state:ReduxState) => state.wishList);
  if(wishListLoading){
    return (<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
       <SkeletonSlide/>
       <SkeletonSlide/>
       <SkeletonSlide/>
       <SkeletonSlide/>
    </div>)
  }
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8  w-full">
  {!wishListLoading && wishListItems.length === 0 ? (
    <div className='w-full h-full text-red-500 flex flex-col items-center gap-4'>
      <p>There are no wish List Items Items Saved.</p>
      <Link href="/pages/isNewItems">
        <PrimaryButton searchText="Browse" />
      </Link>
    </div>):(<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {wishListItems?.map((item:IWishListItemDisplay,index:number) => (
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
                      <LinkComponent href={`/singleProduct/productIdentifier?id=${item.productId}&slug=${item.productName}`} text={item.productName}/>
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
                       onClick={()=>removeItemFromWishList(item.productId)}
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