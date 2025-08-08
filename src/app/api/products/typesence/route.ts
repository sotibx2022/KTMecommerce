import { adminClient } from "@/app/services/typesence/adminTypesence";
import { connectToDB } from "@/config/db";
import { productModel } from "@/models/products.model";
import { NextResponse } from "next/server";
export async function GET() {
    try {
        await connectToDB();
        const allProducts = await productModel
            .find()
            .select("_id brand productDescription productName categoryName subCategoryName createdAt");
        const formattedProducts = allProducts.map((product) => ({
            id: product._id.toString(),
            brand: product.brand,
            productDescription: product.productDescription,
            productName: product.productName,
            categoryName: product.categoryName,
            subCategoryName: product.subCategoryName,
            createdAt: new Date(product.createdAt!).getTime(),
        }));
        const result = await adminClient
            .collections("products")
            .documents()
            .import(formattedProducts, { action: "upsert" });
        return NextResponse.json({ success: true, result });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
    }
}
