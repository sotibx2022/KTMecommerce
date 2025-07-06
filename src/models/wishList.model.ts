import { ICartItem } from "@/app/types/cart";
import { IWishListItem } from "@/app/types/wishlist";
import mongoose, { Schema, Document } from "mongoose";
const wishListSchema = new Schema<IWishListItem>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
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
  },
  {
    timestamps: true,
  }
);
export const WishListModel =
  mongoose.models.WishList || mongoose.model<IWishListItem>("WishList", wishListSchema);
