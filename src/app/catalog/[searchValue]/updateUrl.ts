import { ISearchValues } from "@/app/context/AdvanceSearchContext";
export const updateUrl=(searchValues:ISearchValues)=>{
const params = new URLSearchParams()
if(searchValues.categoryValue !=="category"){
    params.set('category',searchValues.categoryValue)
}
if(searchValues.subCategoryValue !=="subCategory"){
    params.set('subCategory',searchValues.subCategoryValue)
}
if(searchValues.highlightedValues){
    switch (searchValues.highlightedValues) {
      case 'New Arrival':
        params.set('isNewArrival', "true");
        break;
      case 'Trending':
        params.set('isTrendingNow', "true");
        break;
      case 'Top Sell':
        params.set('isTopSell', "true");
        break;
      case 'Offer Item':
        params.set('isOfferItem', "true");
        break;
        case 'Regular':
          params.set('isRegular',"true")
          break;
        default:
            params.set('highlighted',"none")
    }
}
if(searchValues.ratingOrder !== "normal"){
    params.set('rating',searchValues.ratingOrder === "decreasing" ? "descending":"ascending")
}
if(searchValues.priceOrder !== "normal"){
    params.set('price', searchValues.priceOrder === "increasing" ? "ascending" : "descending");
}
if (searchValues.pageNumber && searchValues.pageNumber !== 1) {
    params.set('page', searchValues.pageNumber.toString());
  }
  return params;
}