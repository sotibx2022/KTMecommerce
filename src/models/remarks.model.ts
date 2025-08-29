import mongoose, { Model, ObjectId, Schema } from "mongoose";
import { IRemarksBaseForDB } from "@/app/types/remarks";
import { required } from "node_modules/zod/dist/types/v4/core/util";
const RemarkSchema = new Schema<IRemarksBaseForDB>({
  productIdentifier: {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    productImage: { type: String, required: true }
  },
  rating: { type: String, required: true }, // Changed from Number to String to match interface
  reviewedBy: {
    fullName: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  reviewerImage: { type: String },
  reviewDescription: { type: String, required: true },
  reviewSentiment: {
    type: String,
    default:'Positive',
    enum: ['Positive', 'Negative', 'Neutral'],
    required: true,
  },
},
  {
    timestamps: true,
    versionKey: false,
  });
export const remarksModel: Model<IRemarksBaseForDB> =
  mongoose.models.Remark || mongoose.model("Remark", RemarkSchema);