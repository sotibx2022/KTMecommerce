import mongoose, { Model, Schema } from "mongoose";
import {remarksModel } from "./remarks.model";
import { IProductCreate } from "@/app/types/products";
import { IAddReviewDatas } from "@/app/types/remarks";
interface IProductModel extends IProductCreate{
updateOverallRating:()=>Promise<void>;
}
const ProductSchema = new mongoose.Schema<IProductModel>({
    brand: { type: String, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productFeatures: { type: [String], required: true },
    price: { type: Number, required: true },
    stockAvailability: { type: Boolean, required: true },
    remainingStock:{type:String,required:true},
    variant: { type: String, required: true },
    categoryName:{type:String,required:true},
    subCategoryName:{type:String,required:true},
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    subCategoryId: {
  type: Schema.Types.ObjectId
},
    isNewArrivals: { type: Boolean, default: false },
    isTrendingNow: { type: Boolean, default: false },
    isTopSell: { type: Boolean, default: false },
    isOfferItem: { type: Boolean, default: false },
    image: { type: String, required: true },
    overallRating:{type:Number,required:true, default:0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  ProductSchema.methods.updateOverallRating = async function() {
    try {
      const remarks = await remarksModel.find({ 'productIdentifier.productId': this._id });
      if (remarks.length > 0) {
        const averageRating = remarks.reduce((sum: number, remark) => {
          const ratingValue = parseFloat(remark.rating);
          return isNaN(ratingValue) ? sum : sum + ratingValue;
        }, 0) / remarks.length;
        this.overallRating = averageRating.toFixed(2);
        await this.save();
      } else {
        this.overallRating = 0;
        await this.save();
      }
    } catch (error) {
      throw error;
    }
  };
  export const productModel:Model<IProductModel> = mongoose.models.product || mongoose.model("product", ProductSchema);
