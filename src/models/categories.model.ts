import mongoose, { Schema, Document } from 'mongoose';
export interface ISubcategory extends Document {
  categoryId: string;
  parentCategoryName: string;
  parentCategoryId: string;
  category_name: string;
  image_url: string;
  meta_title: string;
  meta_description: string;
  createdAt: Date;
  updatedAt: Date;
}
const subcategorySchema = new Schema<ISubcategory>({
  category_name: {
    type: String,
    required: true
  },
  parentCategoryId: {
    type: String,
    required: true
  },
  parentCategoryName: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true
  },
  meta_title: {
    type: String,
    required: true
  },
  meta_description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
}, { _id: true });
// 3. Parent Category Interface
export interface ICategory extends Document {
  image_url: string,
  meta_title: string,
  meta_description: string,
  category_name: string,
  subcategories: ISubcategory[],
}
// 4. Parent Category Schema
const categorySchema = new Schema<ICategory>({
  category_name: {
    type: String,
    required: true,
    unique: true
  },
  image_url: {
    type: String,
    required: true
  },
  meta_title: {
    type: String,
    required: true
  },
  meta_description: {
    type: String,
    required: true
  },
  subcategories: [subcategorySchema]  // Embed the subcategory schema
}, { timestamps: true });
// 5. Create the Model
const Category = mongoose.models.Category ||
  mongoose.model<ICategory>('Category', categorySchema);
export default Category;