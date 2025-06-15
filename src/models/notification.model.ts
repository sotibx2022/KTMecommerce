import { Schema, model, Document } from "mongoose";
export interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  category: "UserCreated" | "UserUpdated" | "OrderCreated" | "OrderShipped" | "PasswordUpdated";
  read: boolean;
}
const NotificationSchema = new Schema<INotification>(
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
      enum: ["UserCreated", "UserUpdated", "OrderCreated", "OrderShipped", "PasswordUpdated"],
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
NotificationSchema.index({ createdAt: -1 });
export const NotificationModel  = model<INotification>("Notification", NotificationSchema);