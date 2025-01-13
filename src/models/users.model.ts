import { IUser } from "@/app/types/user";
import mongoose, { Schema, Document, Model } from "mongoose";
const UserSchema: Schema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firebaseId: {
      type: String,
      required: true, // Firebase ID is mandatory
      unique: true, // Ensure uniqueness to avoid duplicate users
    },
    accountStatus: {
      type: String,
      enum: ["registered", "customer", "admin"],
      default: "registered",
    },
    roles: {
      type: [String],
      default: ["user"], // Default role is "user"
    },
    address: {
      type: String,
      default:null,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    carts: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    profileImage: {
      type: String,
      default:null,
    },
    profileFileOriginalName: {
      type: String,
      default:null,
    },
    profileFileSize: {
      type: String,
      default:null,
    },
    profileFileType: {
      type: String,
      default:null
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);
// Create the User model
const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModel;
