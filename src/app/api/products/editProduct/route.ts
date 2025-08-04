import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const authorizationResponse = await checkAdminAuthorization(req);
    const { message, success, status } = authorizationResponse;
    if (!success) {
      return NextResponse.json({ message: message, success: success, status: status || 400 })
    }
        await connectToDB();
        const formData = await req.formData();
        const productData = {
            file: formData.get('file') as File | null,
            productId: formData.get('productId') as string,
            image: formData.get('image') as string,
            productName: formData.get('productName') as string,
            productDescription: formData.get('productDescription') as string,
            price: formData.get('price') as string,
            productFeatures: JSON.parse(formData.get('productFeatures') as string) as string[],
            categoryName: formData.get('categoryName') as string,
            subCategoryName: formData.get('subCategoryName') as string,
            variant: formData.get('variant') as string,
            remainingStock: formData.get('remainingStock') as string,
            isNewArrivals: formData.get('isNewArrivals') === 'true',
            isTopSell: formData.get('isTopSell') === 'true',
            isTrendingNow: formData.get('isTrendingNow') === 'true',
            isOfferItem: formData.get('isOfferItem') === 'true',
            status: formData.get('status') as "active" | "inActive",
            isRegular: formData.get('isRegular') === 'true'
        };
        // Find existing product
        const productObjectId = new Object(productData.productId)
        const existingProduct = await productModel.findOne({ _id: productObjectId });
        if (!existingProduct) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }
        // Handle file upload if new file is provided
        if (productData.file) {
            const uploadResult = await uploadImage(
                productData.file,
                "profileImages",
                productData.file.type,
                productData.productName
            );
            existingProduct.image = uploadResult.profileUrl!;
        }
        // Update product fields
        existingProduct.productName = productData.productName;
        existingProduct.productDescription = productData.productDescription;
        existingProduct.price = parseInt(productData.price);
        existingProduct.productFeatures = productData.productFeatures;
        existingProduct.categoryName = productData.categoryName;
        existingProduct.subCategoryName = productData.subCategoryName;
        existingProduct.variant = productData.variant;
        existingProduct.remainingStock = productData.remainingStock;
        existingProduct.isNewArrivals = productData.isNewArrivals;
        existingProduct.isTopSell = productData.isTopSell;
        existingProduct.isTrendingNow = productData.isTrendingNow;
        existingProduct.isOfferItem = productData.isOfferItem;
        existingProduct.status = productData!.status!;
        // Save the updated product
        await existingProduct.save();
        return NextResponse.json({
            message: "Product updated successfully",
            success: true,
            status: 200,
            data: existingProduct
        });
    } catch (error) {
        return NextResponse.json(
            { 
                success: false, 
                message: error instanceof Error ? error.message : "Error processing request"
            },
            { status: 500 }
        );
    }
}