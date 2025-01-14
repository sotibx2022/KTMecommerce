import mongoose, { Schema, Document } from "mongoose";
export interface ICartItem extends Document {
  productName: string;
  productId: mongoose.Types.ObjectId;
  brand: string;
  price: string;
  image: string;
  quantity: number;
  userId: mongoose.Types.ObjectId;
  category: string;
}
const cartSchema = new Schema<ICartItem>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
export const CartModel =
  mongoose.models.Cart || mongoose.model<ICartItem>("Cart", cartSchema);
