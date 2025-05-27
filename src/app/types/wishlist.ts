import { ObjectId } from "mongoose";
export interface IWishListItem {
    productName: string;
    productId: string;
    brand?: string;
    price: string;
    image: string;
    userId?: string;
    category?: string;
  }