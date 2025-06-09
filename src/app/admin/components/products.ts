import { IProductDisplay } from "@/app/types/products";
export interface IPagination {
  currentPage: number;
  pageSize: number;
  totalProducts: number;
  totalPages: number;
}
export interface IResponseData {
  pagination: IPagination;
  products: IProductDisplay[];
}
export interface IAddProductFormData{
  file?:File|null,
  image?:string
  productName:string,
  productDescription:string,
  price:string,
  productFeatures:string[],
  categoryName:string,
  subCategoryName:string,
  variant:string,
  remainingStock:string,
  isNewArrivals:boolean,
  isTopSell:boolean,
  isTrendingNow:boolean,
  isOfferItem:boolean,
  status:"active" | "inActive"|"",
  isRegular:boolean,
}