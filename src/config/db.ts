import mongoose from "mongoose";
import { config } from "./configuration";
let isConnected = false; // Tracks if the connection is already established
export const connectToDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected.");
    });
    mongoose.connection.on("error", (error) => {
      console.log("Error While Connecting to MongoDB:", error);
    });
    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected.");
    });
    // Establish connection only if not already connected
    await mongoose.connect("mongodb+srv://sbinayaraj:uJYI9Q5aXU0L9Wp1@cluster0.v7zrc.mongodb.net/ecommerceKTM?retryWrites=true&w=majority&appName=Cluster0" as string)
    ;
    isConnected = true; // Set the flag to true after successful connection
  } catch (error) {
    console.log("Could not connect to MongoDB:", error);
    process.exit(1);
  }
};
