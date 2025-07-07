import { INotificationCreate } from "@/app/types/notifications";
import mongoose, { Schema, model, Document } from "mongoose";
const NotificationSchema = new Schema<INotificationCreate>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    category: { 
      type: String,
      enum: ["UserCreated", "UserUpdated", "OrderCreated", "OrderShipped", "PasswordUpdated",'PublicWishList'],
      required: true 
    },
    read: { 
      type: Boolean, 
      default: false 
    }
  },
  { 
    timestamps: true
  }
);
export const NotificationModel  = mongoose.models.Notification || mongoose.model<INotificationCreate>("Notification", NotificationSchema);