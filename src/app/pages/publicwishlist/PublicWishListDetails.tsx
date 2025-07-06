import { ItemText } from '@radix-ui/react-select';
import { User } from 'lucide-react';
import React from 'react';
interface WishlistItem {
  _id: string;
  price: string;
  productName: string;
  brand: string;
  category: string;
  image: string;
  productId: {
    _id: string;
    productDescription: string;
    isNewArrivals: boolean;
    isOfferItem: boolean;
    isTopSell: boolean;
    isTrendingNow: boolean;
    overallRating: number;
    stockAvailability: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  userId: string;
  __v: number;
}
export interface wishersDetailsforPublicWishlist {
  _id: string;
  fullName: string;
  email: string;
  profileImage: string;
}
interface PublicWishListDetailsProps {
  wishersDetails: wishersDetailsforPublicWishlist;
  wishlistItems: WishlistItem[];
}
const PublicWishListDetails: React.FC<PublicWishListDetailsProps> = ({ wishersDetails, wishlistItems }) => {
  console.log(wishersDetails);
  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* User Profile Section */}
        <div
          className="bg-white rounded-lg shadow-primaryDark p-6 mb-8 flex flex-col sm:flex-row items-center gap-6"
        >
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-helper">
            {/* {wishersDetails.image ? (
              <img
                src={wishersDetails.image}
                alt="Reviewer Image"
                className="w-12 h-12 rounded-full object-cover border-2 border-primaryLight/30"
              />
            ) : (
              <div className="inline-flex w-12 h-12 rounded-full border-2 border-primaryDark text-primaryDark bg-background justify-center items-center">
                <User className="w-5 h-5" />
              </div>
            )} */}
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-primaryDark">{wishersDetails.fullName}</h1>
            <p className="text-primaryLight mt-1">{wishersDetails.email}</p>
          </div>
        </div>
        {/* Wishlist Section */}
        <div>
          <h2 className="text-2xl font-bold text-primaryDark mb-6 text-center">
            My Wishlist
          </h2>
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-primaryLight">No items in the wishlist yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlistItems.map((item) => {
                const product = item.productId;
                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg overflow-hidden shadow-primaryLight hover:shadow-helper transition-shadow duration-300"
                  >
                    {item.image && (
                      <div className="relative h-48 w-full">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-primaryDark">{item.productName}</h3>
                        {product.isNewArrivals && (
                          <span className="bg-helper text-white text-xs px-2 py-1 rounded">New</span>
                        )}
                      </div>
                      <p className="text-sm text-primaryLight mb-1">Brand: {item.brand}</p>
                      <p className="text-sm text-primaryLight mb-3">Category: {item.category}</p>
                      {product.productDescription && (
                        <p className="text-primaryLight mb-3">{product.productDescription}</p>
                      )}
                      <div className="flex justify-between items-center">
                        <p className="text-helper font-bold text-lg">${item.price}</p>
                        {product.stockAvailability ? (
                          <span className="text-green-600 text-sm">In Stock</span>
                        ) : (
                          <span className="text-red-600 text-sm">Out of Stock</span>
                        )}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {product.isTopSell && (
                          <span className="bg-primaryDark text-white text-xs px-2 py-1 rounded">Top Seller</span>
                        )}
                        {product.isTrendingNow && (
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded">Trending</span>
                        )}
                      </div>
                    </div>
                  </div>
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