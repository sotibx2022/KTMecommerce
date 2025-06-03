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