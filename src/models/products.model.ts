import { Product } from "@/app/types/products";
import mongoose, { Model } from "mongoose";
import { RemarkSchema } from "./remarks.model";
const ProductSchema = new mongoose.Schema<Product>({
    brand: { type: String, required: true },
    mobileName: { type: String, required: true },
    mobileDescription: { type: String, required: true },
    mobileFeatures: { type: [String], required: true },
    price: { type: Number, required: true },
    stockAvailability: { type: Boolean, required: true },
    variant: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    isNewArrivals: { type: Boolean, default: false },
    isTrendingNow: { type: Boolean, default: false },
    isTopSell: { type: Boolean, default: false },
    isOfferItem: { type: Boolean, default: false },
    image: { type: String, required: true },
    remarks: [RemarkSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  export const product:Model<Product> = mongoose.models.product || mongoose.model("product", ProductSchema);
