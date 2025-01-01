import mongoose, { Schema, Document, Model } from "mongoose";
// Define the interface for an Order document
interface IOrder extends Document {
    user: mongoose.Types.ObjectId; // Reference to the user who placed the order
    items: {
        product: mongoose.Types.ObjectId; // Reference to the product
        quantity: number; // Quantity of the product
        price: number; // Price of the product at the time of the order
    }[];
    totalAmount: number; // Total cost of the order
    paymentStatus: "pending" | "completed" | "failed"; // Payment status
    paymentMethod: "credit_card" | "paypal" | "cash_on_delivery"; // Payment method
    orderStatus: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"; // Order status
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
// Create the schema for the Order
const OrderSchema: Schema = new Schema<IOrder>(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true, min: 0 },
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ["credit_card", "paypal", "cash_on_delivery"],
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        shippingAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zip: { type: String, required: true },
            country: { type: String, required: true },
        },
    },
    {
        timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    }
);
// Create the Order model
const OrderModel: Model<IOrder> =
    mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default OrderModel;
