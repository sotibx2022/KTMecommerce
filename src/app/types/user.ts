import { IOrder } from "./orders";
import { Product } from "./products";
export interface ICartItem{
    Product:Product,quantity:number
}
export interface ICarts{
    cartItems:ICartItem[]
}
export interface IUser {
    fullName: string;
    email: string;
    phoneNumber: string;
    firebaseID: string;
    isAdmin?: boolean; // Optional field
    accountStatus?: string; // Optional field, e.g., "Registered", "Customer"
    addresses?: string; // Optional field for user address,
    wishlist?:Product[];
    carts?:ICarts
    profileImage?: string; // Optional field for profile image URL
    roles?: string; // Optional field, default 'user'
    createdAt?: Date; // Optional field for the user creation date
    updatedAt?: Date; // Optional field for the user last updated date
    orderHistory:IOrder[]
  }