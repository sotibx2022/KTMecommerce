// Subcategory Interface
export interface Subcategory {
  _id?: string; // MongoDB ObjectId as a string
  category_name: string;
  url_slug: string;
  status: "active" | "inactive";
  image_url: string;
  meta_description?: string;
  meta_keywords?: string;
  created_at: Date;
  updated_at: Date;
}
// Category Interface
export interface Category {
  _id?: string; // MongoDB ObjectId as a string
  category_name: string;
  url_slug: string;
  status: "active" | "inactive";
  image_url: string;
  created_at: Date;
  updated_at: Date;
  subcategories: Subcategory[]; // Array of Subcategory objects
}
