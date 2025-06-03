"use client"
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { useWindowSize } from 'react-use';
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { IProductDisplay } from "@/app/types/products";
import { APIResponseError, APIResponseSuccess } from "@/app/services/queryFunctions/users";
import ProductSearchBar from "../components/ProductSearchBar";
import TableTop from "../components/TableHeader";
import { IResponseData } from "../components/products";
import TableNavigation from "../components/TableNavigation";
import TableData from "../components/TableData";
import { useScreenWidth } from "@/app/services/helperFunctions/findScreenWidth";
const page=() =>{
const getAllProducts = async (): Promise<APIResponseSuccess<IResponseData> | APIResponseError> => {
  const response = await axios.get<APIResponseSuccess<IResponseData> | APIResponseError>('/api/allProducts/displayProducts/all');
  return response.data;
};
const {
  data: productsResponse,
  isPending,
  error
} = useQuery<APIResponseSuccess<IResponseData> | APIResponseError>({
  queryKey: ['allProducts'],
  queryFn: getAllProducts,
});
const { width } = useWindowSize();
const products = productsResponse?.success ? productsResponse.data!.products : [];
const pagination = productsResponse?.success ? productsResponse.data!.pagination : {
  currentPage: 1,
  pageSize: 10,
  totalProducts: 0,
  totalPages: 1
};
  return (
    <div className="relative py-10">
      <div className="ContainerHeader flex justify-between items-center my-4">
        <div className="headerLeft ">
          <ProductSearchBar/>
        </div>
      <div className="headerRight">
        <Button variant="outline">Add Product</Button>
      </div>
      </div>
<div className={width > 1000 
  ? "overflow-x-hidden w-full" 
  : "overflow-x-auto max-w-[800px]"}>
  <Table className="min-w-[1000px]">
    <TableTop />
    <TableBody>
      {products.map((product: IProductDisplay, index: number) => (
        <TableData key={index} product={product} index={index} />
      ))}
    </TableBody>
  </Table>
</div>
     <TableNavigation pagination={pagination}/>
    </div>
  );
}
export default page;