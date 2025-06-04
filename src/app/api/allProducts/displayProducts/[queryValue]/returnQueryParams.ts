export const returnQueryParams = (url: URL) => {
  const params = new URLSearchParams(url.search)
  return {
    keyword: params.get("keyword") || undefined,
    category:params.get("category") || undefined,
    subCategory:params.get("usbCategory") || undefined,
    brand: params.get("brand") || undefined,
    stock: params.get("stock") || undefined,
    variant: params.get("variant") || undefined,
    isRegular:params.get("isRegular") || undefined,
    isNewArrival: params.get("isNewArrival") || undefined,
    isTrendingNow: params.get("isTrendingNow") || undefined,
    isTopSell: params.get("isTopSell") || undefined,
    isOfferItem: params.get("isOfferItem") || undefined,
    limit:Number(params.get("limit")) || 10,
    page:Number(params.get("page")) || 1,
    rating:params.get("rating") || undefined,
    price:params.get("price") || undefined,
    minPrice:Number(params.get("minPrice")) || undefined,
    maxPrice:Number(params.get("maxPrice")) || undefined,
    created:params.get("created") || undefined,
    updated:params.get("updated")|| undefined,
  };
};
