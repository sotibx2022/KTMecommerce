import { Product } from "./products";
import { IUser } from "./user";
interface IOrder extends Document {
    user: IUser
    items: {
        product: Product
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