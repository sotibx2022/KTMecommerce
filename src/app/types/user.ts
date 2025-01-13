import { IOrder } from "./orders";
import { Product } from "./products";
export interface ICartItem{
    productName:string,
    productId?:string,
    productDescription?:string,
    brand:string,
    price:string,
    stockAvailability?:number,
    image:string,
    quantity:number,
    _id:string,
    productFeatures?:[],
    category:string
  }
export interface ICarts{
    cartItems:ICartItem[]
}
export interface IUser {
    fullName: string;
    email: string;
    phoneNumber: string;
    firebaseId: string;
    isAdmin?: boolean; // Optional field
    accountStatus?: string; // Optional field, e.g., "Registered", "Customer"
    address?: string; // Optional field for user address,
    wishlist?:Product[];
    carts?:ICarts
    profileImage?: string; // Optional field for profile image URL
    profileFileOriginalName?:string;
profileFileSize?:string;
profileFileType?:string;
    roles?: string; // Optional field, default 'user'
    createdAt?: Date | string; // Optional field for the user creation date
    updatedAt?: Date | string; // Optional field for the user last updated date
    orderHistory:IOrder[]
  }