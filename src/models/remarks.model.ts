import mongoose, { Model, ObjectId, Schema } from "mongoose";
import { productModel } from "./products.model";
import ProductImage from "@/app/_components/singleProduct/ProductImage";
import { IAddReviewDatas } from "@/app/types/remarks";
 const RemarkSchema = new Schema<IAddReviewDatas>({
  productIdentifier:{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName:{type:String,required:true},
    productImage:{type:String,required:true}
  },
  rating: { type: String, required: true }, // Changed from Number to String to match interface
  reviewedBy: { 
    fullName: { type: String, required: true },
    email: { type: String, required: true }
  },
  reviewerImage: { type: String,},
  reviewDescription: { type: String, required: true },
},
{
  timestamps: true,
  versionKey:false,
});
export const remarksModel: Model<IAddReviewDatas> = 
  mongoose.models.Remark || mongoose.model("Remark", RemarkSchema);