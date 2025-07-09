"use client"
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import PublicWishListDetails, { wishersDetailsforPublicWishlist } from '../PublicWishListDetails';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { useContext } from 'react';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { DisplayComponents, DisplayContext } from '@/app/context/DisplayComponents';
import LoginComponent from '@/app/_components/authComponent/LoginComponent';
import useAddItemToCart from '@/app/_components/singleProduct/useAddItemToCart';
import toast from 'react-hot-toast';
const PublicWishlistPage = () => {
  const router = useRouter()
  const addItemToCart = useAddItemToCart();
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const userDetailsContext = useContext(UserDetailsContext);
  if (!userDetailsContext) {
    throw new Error("User Details Context is not defined here.")
  }
  const { userDetails } = userDetailsContext
  const searchParams = useSearchParams();
  const wishlistCollectionToken = searchParams.get('wishlistCollectionToken');
  const { data: wishlistDetails, isPending, error } = useQuery({
    queryFn: async () => {
      const response = await axios.get('/api/wishList/publicwishlists', {
        headers: {
          Authorization: `Bearer ${wishlistCollectionToken}`
        }
      });
      return response.data;
    },
    queryKey: ['publicWishlistItems', wishlistCollectionToken],
    enabled: !!wishlistCollectionToken,
  });
  let wishersDetails: wishersDetailsforPublicWishlist = {
    _id: '',
    fullName: '',
    email: '',
    profileImage: ''
  };
  let wishListItems = [];
  if (wishlistDetails && wishlistDetails?.data) {
    wishersDetails = wishlistDetails.data.wishersDetails;
    wishListItems = wishlistDetails.data.updatedWishlistDetails;
  }
  console.log(wishListItems,wishersDetails);
  const handleOrderWishersList = () => {
    if(userDetails?._id === wishersDetails._id){
      toast.success("Navigate to your WishList page to order these materials.");
      router.push('/dashboard/wishlist')
    }
    else if (userDetails) {
      router.push('/dashboard/cart')
      addItemToCart(wishListItems)
    } else {
      setVisibleComponent('login')
    }
  }
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingComponent />
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-600">
          {axios.isAxiosError(error)
            ? error.response?.data?.message || 'Failed to load wishlist'
            : 'An unexpected error occurred'}
        </h2>
        <p className="mt-4 text-gray-500">
          Please check the link or try again later.
        </p>
      </div>
    );
  }
  if (!wishListItems?.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">This wishlist is empty</h2>
        <p className="mt-4 text-gray-500">
          No items found in this shared wishlist.
        </p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <PublicWishListDetails wishersDetails={wishersDetails} wishlistItems={wishListItems} />
      <PrimaryButton searchText={'order'} onClick={handleOrderWishersList} />
      {visibleComponent === 'login' && <LoginComponent />}
    </div>
  );
};
export default PublicWishlistPage;