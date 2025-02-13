import { Types } from "mongoose";
import { Remark } from "./remarks";
// Interface for Product creation (DB use)
export interface IProductCreate {
  _id?: Types.ObjectId; // _id is required for DB but optional when creating a new product
  brand: string;
  productName: string;
  productDescription: string;
  productFeatures: string[];
  price: number; // Price is a number in DB
  stockAvailability: boolean;
  variant: string;
  categoryId?: Types.ObjectId; // Foreign key for category (optional)
  isNewArrivals: boolean;
  isTrendingNow: boolean;
  isTopSell: boolean;
  isOfferItem: boolean;
  image: string;
  url_slug: string;
  remarks?: Remark[]; // Array of reviews (optional)
  overallRating?: number; // Overall rating (optional)
  createdAt?: Date; // Timestamp for product creation (optional for new products)
  updatedAt?: Date; // Timestamp for last update (optional for new products)
}
// Interface for displaying product details on UI
export interface IProductDisplay {
  productName: string;
  productDescription: string;
  brand: string;
  price: string; // Price is a string in UI for formatting
  stockAvailability: boolean;
  productFeatures: string[];
  _id: string; // _id as string for display
  image: string;
  productId: string; // productId is ObjectId type for DB interactions
  quantity: number;
  userId: string;
  category: string;
  variant:string,
  url_slug:string,
  remarks:Remark[],
  overallRating:number
}
