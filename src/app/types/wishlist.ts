import { ObjectId, Types } from "mongoose";
export interface IWishListItem {
    productName: string;
    productId: Types.ObjectId;
    brand?: string;
    price: string;
    image: string;
    userId?: Types.ObjectId;
    category?: string;
  }