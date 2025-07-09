import NoData from '@/app/_components/noData/NoData';
import ProductCard from '@/app/_components/productCard/ProductCard';
import SingleWishListCard from '@/app/_components/wishlistCard/SingleWIshListCard';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { PublicWishListDetailsProps } from '@/app/types/wishlist';
import { ItemText } from '@radix-ui/react-select';
import { HeartCrack, User } from 'lucide-react';
import React, { useContext } from 'react';
const PublicWishListDetails: React.FC<PublicWishListDetailsProps> = ({ wishersDetails, wishlistItems }) => {
  const userContext = useContext(UserDetailsContext);
  if (!userContext) {
    throw new Error("User Details context is not defined at this level")
  }
  const { userDetails } = userContext
  return (
    <div className='container' >
      <div className="max-w-4xl mx-auto">
        {/* User Profile Section */}
        <div
          className=" rounded-lg shadow-primaryDark p-6 mb-8 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-helper">
            {wishersDetails.profileImage ? (
              <img
                src={wishersDetails.profileImage}
                alt="Reviewer Image"
                className="w-full h-full rounded-full object-cover border-2 border-primaryLight/30"
              />
            ) : (
              <div className="inline-flex w-12 h-12 rounded-full border-2 border-primaryDark text-primaryDark bg-background justify-center items-center">
                <User className="w-full h-full" />
              </div>
            )}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-primaryDark">{wishersDetails.fullName}</h1>
            <p className="text-primaryLight mt-1">{wishersDetails.email}</p>
          </div>
        </div>
        {/* Wishlist Section */}
        <div>
          <h2 className="text-2xl font-bold text-primaryDark mb-6 text-center">
            WishList for {wishersDetails.fullName || wishersDetails.email}
          </h2>
          {wishlistItems.length === 0 ? (
            <NoData
              icon={<HeartCrack className="w-12 h-12 text-red-500" strokeWidth={1.5} />}
              notFoundMessage="No Wishlist Items shared"
              buttonText="Browse"
              buttonLink="/catalog/advanceSearch?highlighted=none"
            />
          ) : (
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((item, index) => {
                const actualItem = {
                  productName: item.productName,
                  productId: item._id,
                  brand: item.brand,
                  price: item.price,
                  image: item.image,
                  userId: userDetails?._id.toString() || "",
                  category: item.category,
                  wishersId: wishersDetails._id,
                }
                const product = item.productId;
                return (
                  <SingleWishListCard item={actualItem} key={index} />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PublicWishListDetails;