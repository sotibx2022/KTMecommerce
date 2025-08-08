import { clientTypesense } from "@/app/services/typesence/clientTypesence";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        const { searchValue } = await request.json();
        if (!searchValue) {
            return NextResponse.json(
                { error: "Search Value is required" },
                { status: 400 }
            );
        }
        const searchResponse = await clientTypesense
            .collections("products")
            .documents()
            .search({
                q: searchValue,
                query_by: "productName,brand,categoryName,subCategoryName",
                per_page: 5,
            });
        const suggestions = searchResponse.hits?.map(
            (hit: any) => hit.document.productName
        );
        return NextResponse.json(suggestions);
    } catch (error) {
        console.error("Typesense search error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
