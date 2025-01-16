import { findCategoryNamefromCategoryId } from "@/app/services/apiFunctions/categoryText2CategoryObj";
import { ICartItem, ICreateCart } from "@/app/types/cart";
import { CartModel } from "@/models/carts.model";
import { productModel } from "@/models/products.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { productId, productName, image, price, brand, quantity = 1 } = await req.json(); // Default quantity to 1
    // Validate required fields
    if (!productId || !productName || !image || !price || !brand) {
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
    // Find the product in the database
    const product = await productModel.findOne({ _id: new Types.ObjectId(productId) });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found.", success: false, status: 404 },
        { status: 404 }
      );
    }
    // Find category name from category ID
    const categoryObjectId = new Types.ObjectId(product?.categoryId);
    const productObjectId = new Types.ObjectId(productId);
    const category_name = await findCategoryNamefromCategoryId(categoryObjectId);
    // Create new cart item
    const newCart = new CartModel<ICreateCart>({
      userId: objectId,
      productId: productObjectId,
      productName,
      brand,
      category: category_name,
      price,
      image,
      quantity, // Explicit quantity
    } as ICreateCart);
    // Save cart item to database
    await newCart.save();
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
