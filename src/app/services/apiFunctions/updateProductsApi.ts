import { FilterState } from "@/app/context/ProductFilterContext";
export const updatePageURL = (filterState: FilterState): URLSearchParams => {
  const params = new URLSearchParams();
  // Keyword
  if (filterState.keyword && filterState.keyword !== "Search Keywords...") {
    params.set('keyword', filterState.keyword);
  }
  // Category
  if (filterState.categoryText && filterState.categoryText !== "Category") {
    params.set('category', filterState.categoryText);
  }
  // Subcategory
  if (filterState.subCategoryText && filterState.subCategoryText !== "Sub-Category") {
    params.set('subCategory', filterState.subCategoryText);
  }
  // Price
  if (filterState.price && filterState.price !== "Price") {
    params.set('price', filterState.price === "ascending" ? "ascending" : "descending");
  }
  // Stock
  if (filterState.stock && filterState.stock !== "Stock") {
    params.set('stock', filterState.stock === "Yes" ? "yes" : "no");
  }
  // Highlights
  if (filterState.highlights && filterState.highlights !== "HighLights") {
    switch (filterState.highlights) {
      case 'isNewArrival':
        params.set('isNewArrival', "true");
        break;
      case 'isTrendingNow':
        params.set('isTrendingNow', "true");
        break;
      case 'isTopSell':
        params.set('isTopSell', "true");
        break;
      case 'isOfferItem':
        params.set('isOfferItem', "true");
        break;
      default:
        params.set('isRegular', "true")
    }
  }
  // Rating
  if (filterState.rating && filterState.rating !== "Rating") {
    params.set('rating', filterState.rating === "ascending" ? "ascending" : "descending");
  }
  // Page
  if (filterState.page && filterState.page !== 1) {
    params.set('page', filterState.page.toString());
  }
  return params;
};