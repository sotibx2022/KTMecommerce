import { ICartItem, IUser } from "@/app/types/user";
import UserModel from "@/models/users.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { _id, category, productName, image, price, brand, quantity = 1 } = await req.json(); // Set default quantity to 1 if not provided
    if (!_id || !category || !productName || !image || !price || !brand) {
      return NextResponse.json(
        { message: "All fields except quantity are required.", success: false, status: 400 },
        { status: 400 }
      );
    }
    // Retrieve user ID from cookies
    const userId = req.cookies.get("_id")?.value;
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found in cookies.", success: false, status: 401 },
        { status: 401 }
      );
    }
    // Convert string _id to ObjectId
    const objectId = new Types.ObjectId(userId);
    // Find the user in the database
    const user = await UserModel.findOne({ _id: objectId });
    if (!user) {
      return NextResponse.json(
        { message: "User not found.", success: false, status: 404 },
        { status: 404 }
      );
    }
    // Ensure user.carts exists, if not initialize it with an empty cartItems array
    if (!user.carts) {
      user.carts = { cartItems: [] };
    }
    // Create the new cart item
    const newCartItem: ICartItem = { _id, category, productName, image, price, brand, quantity };
    console.log("TYpe of carts is",typeof(user.carts));
    // Push the new item into the cartItems array
    user.carts.cartItems.push(newCartItem);
    // Save the user document with updated cart items
    await user.save();
    return NextResponse.json(
      { message: "Item added to the cart.", success: true, status: 201 },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false, status: 500 },
      { status: 500 }
    );
  }
}
