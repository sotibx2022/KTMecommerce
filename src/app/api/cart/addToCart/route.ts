import { findCategoryNamefromCategoryId } from "@/app/services/apiFunctions/categoryText2CategoryObj";
import { CartModel, ICartItem } from "@/models/carts.model";
import { productModel } from "@/models/products.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    console.log("Received POST request");
    // Parse the incoming request body
    const { _id, productName, image, price, brand, quantity = 1 } = await req.json(); // Default quantity to 1
    console.log("Parsed request body:", { _id, productName, image, price, brand, quantity });
    // Validate required fields
    if (!_id || !productName || !image || !price || !brand) {
      console.error("Validation failed: Missing required fields.");
      return NextResponse.json(
        { message: "All fields except quantity are required.", success: false, status: 400 },
        { status: 400 }
      );
    }
    // Retrieve user ID from cookies
    const userId = req.cookies.get("_id")?.value;
    console.log("Retrieved user ID from cookies:", userId);
    if (!userId) {
      console.error("User ID not found in cookies.");
      return NextResponse.json(
        { message: "User ID not found in cookies.", success: false, status: 401 },
        { status: 401 }
      );
    }
    // Convert string _id to ObjectId
    const objectId = new Types.ObjectId(userId);
    console.log("Converted userId to ObjectId:", objectId);
    // Find the product in the database
    const product = await productModel.findOne({ _id: new Types.ObjectId(_id) });
    console.log("Fetched product from database:", product);
    if (!product) {
      console.error("Product not found with the given ID.");
      return NextResponse.json(
        { message: "Product not found.", success: false, status: 404 },
        { status: 404 }
      );
    }
    // Find category name from category ID
    const categoryObjectId = new Types.ObjectId(product?.categoryId);
    const productObjectId = new Types.ObjectId(product._id)
    console.log("Converted categoryId to ObjectId:", categoryObjectId);
    const category_name = await findCategoryNamefromCategoryId(categoryObjectId);
    console.log("Fetched category name:", category_name);
    // Create new cart item
    const newCart = new CartModel<ICartItem>({
      userId: objectId,
      productId: productObjectId, 
      productName,
      brand,
      category: category_name,
      price,
      image,
      quantity, // Explicit quantity
    } as ICartItem);
    console.log("Created new cart item:", newCart);
    // Save cart item to database
    await newCart.save();
    console.log("Saved cart item to database successfully.");
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
