import { Schema, Types } from "mongoose";
export interface INotificationCreate extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  category: "UserCreated" | "UserUpdated" | "OrderCreated" | "OrderShipped" | "PasswordUpdated" | "PublicWishList";
  read: boolean;
}
export interface INotificationDisplay{
    userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  category: "UserCreated" | "UserUpdated" | "OrderCreated" | "OrderShipped" | "PasswordUpdated" | "PublicWishList";
  read: boolean;
  _id:Types.ObjectId;
  createdAt:Date;
}