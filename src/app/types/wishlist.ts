import { ObjectId, Types } from "mongoose";
export interface IWishListItemDisplay{
productName: string;
    productId: string;
    brand?: string;
    price: string;
    image: string;
    userId?: string;
    category?: string;
}
export interface IWishListItem {
    productName: string;
    productId: Types.ObjectId;
    brand?: string;
    price: string;
    image: string;
    userId?: Types.ObjectId;
    category?: string;
  }