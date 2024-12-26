import { NextRequest, NextResponse } from 'next/server';
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const keyword = searchParams.get('keyword');
    const category = searchParams.get('category');
    const subCategory = searchParams.get('subcategory');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rating = searchParams.get('rating');
    // Log the extracted parameters for debugging
    console.log('Keyword:', keyword);
    console.log('Category:', category);
    console.log('SubCategory:', subCategory);
    console.log('Min Price:', minPrice);
    console.log('Max Price:', maxPrice);
    console.log('Rating:', rating);
    // Use the extracted parameters in your product search logic here
    // ... your product search logic ...
    return NextResponse.json({
      message: 'Parameters extracted successfully',
      keyword,
      category,
      subCategory,
      minPrice,
      maxPrice,
      rating,
    });
  } catch (error) {
    console.error('Error extracting parameters:', error);
    return NextResponse.json({
      error: 'An error occurred while extracting parameters',
    });
  }
}