import { connectToDB } from "@/config/db";
import Category, { ISubcategory } from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import { findCategoryObjfromCategoryText } from "@/app/services/apiFunctions/categoryText2CategoryObj";
import { getPublicId } from "@/app/services/helperFunctions/uploadImageHelpers";
export async function GET(request: NextRequest) {
    try {
        await connectToDB();
        const url = new URL(request.url);
        const pathSegments = url.pathname.split('/');
        const subCategoryId = pathSegments.pop();
        if (!subCategoryId || !mongoose.Types.ObjectId.isValid(subCategoryId)) {
            return NextResponse.json(
                { message: "Invalid subcategory ID format", success: false },
                { status: 400 }
            );
        }
        const result = await Category.aggregate([
            { $match: { subcategories: { $exists: true, $ne: [] } } },
            { $unwind: "$subcategories" },
            { $match: { "subcategories._id": new mongoose.Types.ObjectId(subCategoryId) } },
            { $replaceRoot: { newRoot: "$subcategories" } },
            { $addFields: { parentCategoryId: "$_id" } }
        ]);
        if (result.length === 0) {
            return NextResponse.json(
                { message: "Subcategory not found", success: false },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { message: "Subcategory retrieved successfully", data: result[0], success: true },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}
export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const authorizationResponse = await checkAdminAuthorization(req);
        const { message, success: authorizationCheckSuccess, status } = authorizationResponse;
        if (!authorizationCheckSuccess) {
            return NextResponse.json(
                { message, authorizationCheckSuccess, status: status || 401 },
                { status: status || 401 }
            );
        }
        const formData = await req.formData();
        const subCategoryName = formData.get('subCategoryName') as string;
        const parentCategory = formData.get('parentCategory') as string;
        const metaTitle = formData.get('metaTitle') as string;
        const metaDescription = formData.get('metaDescription') as string;
        const file = formData.get('file') as File;
        const url = new URL(req.url);
        const pathSegments = url.pathname.split('/');
        const subCategoryId = pathSegments.pop();
        if (!subCategoryName || !metaTitle || !metaDescription || !parentCategory || !subCategoryId) {
            return NextResponse.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }
        const parentCategoryObj = await findCategoryObjfromCategoryText(parentCategory);
        if (!parentCategoryObj) {
            return NextResponse.json({ message: "There is no Category Exist", success: true, status: 404 });
        }
        const existingsubCategoryArray = await parentCategoryObj.subcategories.filter((category: ISubcategory) => {
            return category._id.toString() === subCategoryId;
        });
        const existingsubCategory = existingsubCategoryArray[0];
        const publicId = getPublicId(existingsubCategory.image_url);
        const { success, profileUrl } = await uploadImage(
            file,
            "CategoryImage",
            file.type,
            `IconOf${subCategoryName}Category`,
            publicId!
        );
        if (!success || !profileUrl) {
            return NextResponse.json(
                { message: "Failed to upload image", success: false },
                { status: 500 }
            );
        }
        existingsubCategory.parentCategoryName = parentCategory;
        existingsubCategory.parentCategoryId = parentCategoryObj._id.toString();
        existingsubCategory.category_name = subCategoryName;
        existingsubCategory.image_url = profileUrl;
        existingsubCategory.meta_title = metaTitle;
        existingsubCategory.meta_description = metaDescription;
        await parentCategoryObj.save();
        return NextResponse.json(
            {
                message: "SubCategory Updated successfully",
                success: true,
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal server error",
                success: false
            },
            { status: 500 }
        );
    }
}
