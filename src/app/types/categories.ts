export interface Category  {
    _id?: string; // MongoDB ObjectId as a string
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