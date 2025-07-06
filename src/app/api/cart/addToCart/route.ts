import { findCategoryNamefromCategoryId } from "@/app/services/apiFunctions/categoryText2CategoryObj";
import { ICartItem, ICreateCart } from "@/app/types/cart";
import { connectToDB } from "@/config/db";
import { CartModel } from "@/models/carts.model";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import { Types } from "mongoose";
export async function POST(req: NextRequest) {
  console.log('---------- STARTING CART ADD ITEM REQUEST ----------');
  try {
    console.log('[1] Attempting to connect to database...');
    await connectToDB();
    console.log('[1] Database connection successful');
    console.log('[2] Getting user ID from cookies...');
    const userId = await getUserIdFromCookies(req);
    console.log('[2] User ID from cookies:', userId);
    if (!userId) {
      console.error('[2] No user ID found in cookies');
      return NextResponse.json(
        { message: "User ID not found in cookies.", success: false, status: 401 },
        { status: 401 }
      );
    }
    console.log('[3] Converting user ID to ObjectId...');
    const objectUserId = new Types.ObjectId(userId);
    console.log('[3] User ObjectId:', objectUserId);
    console.log('[4] Parsing request body...');
    const requestBody = await req.json();
    console.log('[4] Request body:', JSON.stringify(requestBody, null, 2));
    console.log('[5] Processing items (array or single item)...');
    const itemsToProcess = Array.isArray(requestBody) ? requestBody : [requestBody];
    console.log(`[5] Processing ${itemsToProcess.length} item(s)`);
    let successCount = 0;
    let skippedCount = 0;
    for (const item of itemsToProcess) {
      try {
        console.log('[6] Processing item:', JSON.stringify(item, null, 2));
        const { productId, productName, image, price, brand, quantity = 1 } = item;
        console.log('[7] Validating required fields...');
        if (!productId || !productName || !image || !price || !brand) {
          console.warn('[7] Missing required fields, skipping item');
          skippedCount++;
          continue;
        }
        console.log('[8] Creating new cart item...');
        const newCart = new CartModel<ICreateCart>({
          userId: objectUserId,
          productId,
          productName,
          brand,
          category: brand,
          price,
          image,
          quantity,
        });
        console.log('[8] Cart item to be saved:', JSON.stringify(newCart, null, 2));
        console.log('[9] Saving cart item to database...');
        await newCart.save();
        successCount++;
        console.log('[9] Cart item saved successfully');
      } catch (itemError) {
        console.error('[10] Error processing item:', itemError instanceof Error ? itemError.message : 'Unknown error');
        skippedCount++;
      }
    }
    console.log('[11] Processing complete:', {
      successCount,
      skippedCount,
      totalItems: itemsToProcess.length
    });
    return NextResponse.json(
      { 
        message: successCount > 0 
          ? `Successfully added ${successCount} item(s) to cart` 
          : 'No items were added to cart', 
        success: successCount > 0, 
        status: 201,
        stats: {
          successCount,
          skippedCount
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[ERROR] Caught in catch block:', error instanceof Error ? error.message : 'Unknown error');
    if (error instanceof Error) {
      console.error('[ERROR] Stack trace:', error.stack);
    }
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        success: false, 
        status: 500,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  } finally {
    console.log('---------- ENDING CART ADD ITEM REQUEST ----------');
  }
}