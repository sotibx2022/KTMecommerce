import { Product } from "@/app/types/products";
import mongoose, { Model } from "mongoose";
import { RemarkSchema } from "./remarks.model";
const ProductSchema = new mongoose.Schema<Product>({
    brand: { type: String, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productFeatures: { type: [String], required: true },
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
    overallRating:{type:Number,required:true, default:0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  ProductSchema.pre("save", function (next) {
    if (this.isModified("remarks")) {
      const remarks = this.remarks || [];
      const ratings = remarks.map((remark: any) => remark.rating).filter((rating: any) => rating != null);
      this.overallRating = ratings.length > 0
        ? ratings.reduce((sum: number, r: number) => sum + r, 0) / ratings.length
        : 0; // Default to 0 if no ratings exist
    }
    next();
  });
  // Middleware to calculate overallRating before updating
  ProductSchema.pre("findOneAndUpdate", async function (next) {
    const update = this.getUpdate();
    // Check if the update contains a $push operator for remarks
    if (update && (update as any).$push?.remarks) {
      const product = await this.model.findOne(this.getQuery());
      if (product) {
        const newRemark = (update as any).$push.remarks;
        const updatedRemarks = [...product.remarks, newRemark];
        // Recalculate the overallRating
        const ratings = updatedRemarks.map((remark: any) => remark.rating).filter((rating: any) => rating != null);
        (update as any).overallRating = ratings.length > 0
          ? ratings.reduce((sum: number, r: number) => sum + r, 0) / ratings.length
          : 0;
      }
    }
    next();
  });
  export const productModel:Model<Product> = mongoose.models.product || mongoose.model("product", ProductSchema);
