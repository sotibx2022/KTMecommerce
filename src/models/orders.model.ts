import { IOrderDetails } from '@/app/types/orders';
import { Schema, model, Document } from 'mongoose';
const OrderSchema = new Schema<IOrderDetails>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    items: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
    }],
    status: {
      type: String,
      enum: ["ordered", "pending", "confirmed", "delivered", "cancelled"],
      default: "ordered"
    },
    paymentMethod: {
      type: String,
      enum: ["paymentOnDelivery", "online"],
      required: true
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    shippingPerson: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { 
        type: String,
        required: true,
      },
      phone: { type: String, required: true }
    },
    cardDetails: {
      cardHolderName: String,
      cardNumber: {
        type: String,
        // Consider encryption in real implementation
        select: false // Don't return by default in queries
      },
      cardExpiry: String,
      cvvNumber: {
        type: String,
        select: false // Never store raw CVV in production!
      }
    }
  },
  {
    timestamps: true,
    versionKey:false,
  }
);
export const OrderModel = model<IOrderDetails>('Order', OrderSchema);