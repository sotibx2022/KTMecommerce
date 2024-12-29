import mongoose, { Schema, Document } from 'mongoose';
// Define the Subcategory Schema
const subcategorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    url_slug: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: false, // Optional field
    },
    meta_keywords: {
      type: String,
      required: false, // Optional field
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true }
);
// Define the Category Schema
const categorySchema = new Schema(
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
      enum: ['active', 'inactive'],
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    subcategories: [subcategorySchema], // Embedded subcategory documents
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Automatically handles created_at and updated_at
);
// Create a Model from the schema
const CategoryModel = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default CategoryModel;
