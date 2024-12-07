import { Remark } from "@/app/types/remarks";
import mongoose, { Model } from "mongoose";
export const RemarkSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  rating: { type: Number, required: true },
  reviewedBy: { type: String, required: true },
  reviewerImage: { type: String, required: true },
  reviewDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
export const remarksModel:Model<Remark> = mongoose.models.remarksModel || mongoose.model("remarksModel",RemarkSchema)