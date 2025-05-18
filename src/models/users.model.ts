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
    password:{
      type:String,
      required:true,
    },
passwordHistory: [{
  password: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now }
}],
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
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
