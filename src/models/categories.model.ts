import mongoose, { Document, Model } from "mongoose";
  export interface Category extends Document {
    _id: string; // MongoDB ObjectId as a string
    category_name: string;
    url_slug: string;
    status: "active" | "inactive";
    meta_description:string,
    meta_keywords:string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    subcategories?: [this]; // Optional
  }
const categoriesSchema = new mongoose.Schema<Category>(
  {
    category_name: {
      type: String,
      required: true,
      unique: true,
    },
    url_slug: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"], // Corrected enum syntax
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_keywords: {
      type: String,
      required: true,
    },
    subcategories:[this]
  },
  { timestamps: true } 
);
export const categoriesModel:Model<Category> =
  mongoose.models.Category || mongoose.model("Category", categoriesSchema);
