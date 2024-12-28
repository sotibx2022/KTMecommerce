import mongoose, { Document, Model } from "mongoose";
export interface Category extends Document {
  _id: string; // MongoDB ObjectId as a string
  category_name: string;
  url_slug: string;
  status: "active" | "inactive";
  meta_description: string;
  meta_keywords: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
  subcategories?: Category[]; // Corrected to an array of Category (not a tuple)
}
// Define the schema for categories
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
      enum: ["active", "inactive"],
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
    subcategories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    }],
  },
  { timestamps: true }
);
export const categoriesModel: Model<Category> =
  mongoose.models.Category || mongoose.model("Category", categoriesSchema);
