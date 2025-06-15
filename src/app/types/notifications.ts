import { Schema, Types } from "mongoose";
export interface INotificationCreate extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  category: "UserCreated" | "UserUpdated" | "OrderCreated" | "OrderShipped" | "PasswordUpdated";
  read: boolean;
}
export interface INotificationDisplay{
    userId: Schema.Types.ObjectId;
  title: string;
  description: string;
  category: "UserCreated" | "UserUpdated" | "OrderCreated" | "OrderShipped" | "PasswordUpdated";
  read: boolean;
  _id:Types.ObjectId;
  createdAt:Date;
}