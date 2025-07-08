import { IOrderDetails } from '@/app/types/orders';
import mongoose, { Schema, model, Document, Types } from 'mongoose';
const OrderSchema = new Schema<IOrderDetails>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    items: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      image: {
        type: String,
        required: true
      },
      productName: {
        type: String,
        requried: true
      },
      price:
      {
        type: String,
        required: true
      },
      wishersId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
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
      },
      cardExpiry: String,
      cvvNumber: {
        type: String,
        select: false // Never store raw CVV in production!
      }
    },
    orderSummary: {
      totalItems: { type: Number, required: true }, totalCost: { type: Number, required: true }, discount: { type: Number, required: true }, shippingPrice: { type: Number, required: true }, grossTotal: { type: Number, required: true }
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const OrderModel = mongoose.models.Order || mongoose.model<IOrderDetails>('Order', OrderSchema);
export default OrderModel;