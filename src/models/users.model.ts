import { IUser } from "@/app/types/user";
import mongoose, { Schema, Document, Model } from "mongoose";
const UserSchema: Schema = new Schema<IUser>(
  {
    fullName: {
      type: String,
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
    password: {
      type: String,
    },
    passwordHistory: [{
      password: { type: String },
      createdAt: { type: Date, default: Date.now }
    }],
    phoneNumber: {
      type: String,
      match: [/^\d{10}$/, "Please provide a valid 10-digit phone number"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    accountStatus: {
      type: String,
      enum: ["registered","updated", "customer", "admin","active","inActive"],
      default: "registered",
    },
    roles: {
      type: [String],
      default: ["user"],
    },
    address: {
      type: String,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
    },
    profileFileOriginalName: {
      type: String,
      default: null,
    },
    profileFileSize: {
      type: String,
      default: null,
    },
    profileFileType: {
      type: String,
      default: null
    },
  },
  {
    timestamps: true,
  }
);
const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModel;
