import { findCategoryNamefromCategoryId } from "@/app/services/apiFunctions/categoryText2CategoryObj";
import { IWishListItem } from "@/app/types/wishlist";
import { productModel } from "@/models/products.model";
import { WishListModel } from "@/models/wishList.model";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const { productId, productName, image, price, brand } = await req.json(); // Default quantity to 1
    // Validate required fields
    if (!productId || !productName || !image || !price || !brand) {
      return NextResponse.json(
        { message: "All fields except quantity are required.", success: false, status: 400 },
        { status: 400 }
      );
    }
    // Retrieve user ID from cookies
    const token = await getToken({req});
                const userId = token?.id;
    if (!userId) {
      return NextResponse.json(
        { message: "User ID not found in cookies.", success: false, status: 401 },
        { status: 401 }
      );
    }
    // Convert string _id to ObjectId
    const objectUserId = new Object(userId);
    const objectProductId = new Object(productId)
    // Find the product in the database
    const product = await productModel.findOne({ _id: objectProductId });
    if (!product) {
      return NextResponse.json(
        { message: "Product not found.", success: false, status: 404 },
        { status: 404 }
      );
    }
    // Find category name from category ID
    const categoryObjectId = new Object(product?.categoryId);
    const category_name = await findCategoryNamefromCategoryId(categoryObjectId);
    // Create new cart item
    const newWishList = new WishListModel<IWishListItem>({
      userId: objectUserId,
      productId: objectProductId,
      productName,
      brand,
      category: category_name,
      price,
      image,
    } as IWishListItem);
    // Save cart item to database
    await newWishList.save();
    return NextResponse.json(
      { message: "Item added to the WishList.", success: true, status: 201 },
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
