import categoryText2Id from "@/app/services/apiFunctions/categoryText2Id";
import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import subCategoryText2Id from "@/app/services/apiFunctions/subCatText2Id";
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
            status: formData.get('status') as string,
            isRegular: formData.get('isRegular') === 'true'
        };
        if (!productData.file) {
            throw new Error("No file provided for upload");
        }
        const [categoryId, subcategoryId, uploadResult] = await Promise.all([
            categoryText2Id(productData.categoryName),
            subCategoryText2Id(productData.subCategoryName),
            uploadImage(
                productData.file, 
                "profileImages", 
                productData.file.type, 
                productData.productName
            )
        ]);
        const newProduct = new productModel({
            ...productData,
            brand: productData.subCategoryName,
            stockAvailability: productData.remainingStock !== "0" ? "yes" : "no",
            categoryId,
            subcategoryId,
            image: uploadResult.profileUrl
        });
        await newProduct.save();
        return NextResponse.json({
            message: "Product created successfully",
            success: true,
            status: 200,
            data: newProduct
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