import { ObjectId, Types } from "mongoose";
export interface ICartItem {
    productName: string;
    productId: string;
    brand: string;
    price: string;
    image: string;
    quantity: number;
    userId: string;
    category: string;
    wishersId:Types.ObjectId;
  }
  export interface ICreateCart {
    productName: string;
    productId: Types.ObjectId;
    brand: string;
    price: string;
    image: string;
    quantity: number;
    userId: Types.ObjectId;
    category: string;
    wishersId:Types.ObjectId;
  }