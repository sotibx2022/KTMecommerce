import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const subCategoryName = formData.get('subCategoryName') as string;
    const parentCategory = formData.get('parentCategory') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const file = formData.get('file') as File;
    console.log(`
  SubCategory: ${subCategoryName}
  Meta Title: ${metaTitle}
  Meta Description: ${metaDescription}
  Parent Category: ${parentCategory}
  File: ${file?.name || 'No file'}
`);
    return NextResponse.json({ message: "success" })
}