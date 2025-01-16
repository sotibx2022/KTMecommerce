import { ObjectId, Types } from "mongoose";
export interface ICartItem {
    productName: string;
    productId: string; // The productId should be an ObjectId
    brand: string;
    price: string;
    image: string;
    quantity: number;
    userId: string;
    category: string;
  }
  export interface ICreateCart {
    productName: string;
    productId: Types.ObjectId; // The productId should be an ObjectId
    brand: string;
    price: string;
    image: string;
    quantity: number;
    userId: Types.ObjectId;
    category: string;
  }