 interface IAddReviewDatas {
  reviewedBy:{
    fullName:string;
    email:string;
  }
  reviewDescription:string;
  productId: ObjectId;
  rating:string;
  reviewerImage?:string;
}
import mongoose, { Model, ObjectId, Schema } from "mongoose";
import { productModel } from "./products.model";
 const RemarkSchema = new Schema<IAddReviewDatas>({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
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
RemarkSchema.post('save',async function(docs){
  try {
    const product = await productModel.findById({_id:docs.productId});
    if(product){
      product.updateOverallRating()
    }
  } catch (error) {
    console.error('Error updating product rating:', error);
    throw new Error(error);
  }
})
export const remarksModel: Model<IAddReviewDatas> = 
  mongoose.models.Remark || mongoose.model("Remark", RemarkSchema);