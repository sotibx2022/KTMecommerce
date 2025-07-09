import { ObjectId, Types } from "mongoose";
export interface IWishListItemDisplay{
productName: string;
    productId: string;
    brand?: string;
    price: string;
    image: string;
    userId: string;
    category?: string;
    wishersId:string;
}
export interface IWishListItem {
    productName: string;
    productId: Types.ObjectId;
    brand?: string;
    price: string;
    image: string;
    userId: Types.ObjectId;
    category?: string;
    wishersId:Types.ObjectId;
  }
  export interface IPublicWishlistItem {
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
export interface PublicWishListDetailsProps {
  wishersDetails: wishersDetailsforPublicWishlist;
  wishlistItems: IPublicWishlistItem[];
}