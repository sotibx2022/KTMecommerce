import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import { connectToDB } from "@/config/db";
import Category from "@/models/categories.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const authorizationResponse = await checkAdminAuthorization(req);
        const { message, success: authorizationCheckSuccess, status } = authorizationResponse;
        if (!authorizationCheckSuccess) {
            return NextResponse.json(
                { message, authorizationCheckSuccess, status: status || 401 },
                { status: status || 401 }
            );
        }
        // 1. Connect to DB (await the connection)
        await connectToDB();
        // 2. Parse form data with validation
        const formData = await req.formData();
        const categoryName = formData.get('categoryName')?.toString() || '';
        const metaTitle = formData.get('metaTitle')?.toString() || '';
        const metaDescription = formData.get('metaDescription')?.toString() || '';
        const file = formData.get('file') as File | null;
        // 3. Validate required fields
        if (!categoryName || !metaTitle || !metaDescription || !file) {
            return NextResponse.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }
        console.log("Creating category:", { categoryName, metaTitle, metaDescription });
        // 4. Upload image
        const { success, profileUrl } = await uploadImage(
            file,
            "CategoryImage",
            file.type,
            `IconOf${categoryName}Category`
        );
        if (!success || !profileUrl) {
            return NextResponse.json(
                { message: "Failed to upload image", success: false },
                { status: 500 }
            );
        }
        // 5. Create and save category
        const newCategory = new Category({
            category_name: categoryName,
            image_url: profileUrl,
            meta_title: metaTitle,
            meta_description: metaDescription,
        });
        const savedCategory = await newCategory.save();
        // 6. Verify save operation
        if (!savedCategory) {
            throw new Error("Failed to save category");
        }
        // 7. Success response
        return NextResponse.json(
            {
                message: "Category created successfully",
                success: true,
                data: savedCategory
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Category creation error:", error);
        return NextResponse.json(
            {
                message: error instanceof Error ? error.message : "Internal server error",
                success: false
            },
            { status: 500 }
        );
    }
}