import { FilterState } from "@/app/context/ProductFilterContext";
export const updatePageURL = (filterState: FilterState): URLSearchParams => {
    console.log(filterState);
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
  if (filterState.subCategoryText && filterState.subCategoryText !== "Type") {
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
      case 'new':
        params.set('isNewArrival', "true");
        break;
      case 'Trending':
        params.set('isTrendingNow', "true");
        break;
      case 'Top':
        params.set('isTopSell', "true");
        break;
      case 'offer':
        params.set('isOfferItem', "true");
        break;
        default:
            params.set('isRegular',"true")
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