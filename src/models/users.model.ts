import mongoose, { Schema, Document, Model } from "mongoose";
// Define the interface for a User document
interface IUser extends Document {
    fullName: string;
    email: string;
    phoneNumber: string;
    isAdmin: boolean;
    accountStatus: "registered" | "customer" | "admin";
    roles: string[];
    addresses?: { street: string; city: string; state: string; zip: string; country: string }[];
    wishlist?: mongoose.Types.ObjectId[]; // References to products
    cart?: { product: mongoose.Types.ObjectId; quantity: number }[];
    orderHistory?: mongoose.Types.ObjectId[]; // References to orders
    profileImage?: string; // URL or file path
    createdAt?: Date;
    updatedAt?: Date;
}
// Create the schema for the User
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
        accountStatus: {
            type: String,
            enum: ["registered", "customer", "admin"],
            default: "registered",
        },
        roles: {
            type: [String],
            default: ["user"], // Default role is "user"
        },
        addresses: [
            {
                street: { type: String },
                city: { type: String },
                state: { type: String },
                zip: { type: String },
                country: { type: String },
            },
        ],
        wishlist: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
        ],
        cart: [
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
