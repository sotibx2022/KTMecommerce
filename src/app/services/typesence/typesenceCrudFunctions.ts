export interface TypesenseProduct {
    id: string;
    brand: string;
    productDescription: string;
    productName: string;
    categoryName: string;
    subCategoryName: string;
    createdAt: number;
}
import { IProductCreate } from "@/app/types/products";
import { adminClient } from "./adminTypesence";
export async function upsertProductToTypesense(product: TypesenseProduct) {
    try {
        await adminClient
            .collections("products")
            .documents()
            .upsert(product);
    } catch (err) {
        console.error("Typesense upsert error:", err);
    }
}
export async function deleteProductFromTypesense(productId: string) {
    try {
        await adminClient
            .collections("products")
            .documents(productId)
            .delete();
    } catch (err) {
        console.error("Typesense delete error:", err);
    }
}
export const returnTypesenceProduct=(product:IProductCreate)=>{
    const productData = {
       id: product._id!.toString(),
    brand: product.brand,
    productDescription: product.productDescription,
    productName: product.productName,
    categoryName: product.categoryName,
    subCategoryName: product.subCategoryName,
    createdAt: new Date(product.createdAt!).getTime(), 
    }
    return productData;
}
