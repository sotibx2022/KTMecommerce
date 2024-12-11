import { Remark } from "./remarks";
export interface Product {
    _id?: string; // MongoDB auto-generated ID (optional for interface use)
    brand: string; // Brand name, e.g., "Apple"
    productName: string; // Name of the mobile device
    productDescription: string; // Short description of the product
    productFeatures: string[]; // Array of features
    price: number; // Product price
    stockAvailability: boolean; // Is it in stock
    variant: string; // Variant details, e.g., color
    categoryId?: string; // Foreign key for category
    isNewArrivals: boolean; // Is it a new arrival
    isTrendingNow: boolean; // Is it trending now
    isTopSell: boolean; // Is it a top seller
    isOfferItem: boolean; // Is it an offer item
    image: string; // URL to the product image
    url_slug:string;
    remarks: Remark[]; // Array of reviews
    createdAt: Date; // Timestamp for product creation
    updatedAt: Date; // Timestamp for last product update
  }
