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
import { useContext, useEffect, useMemo, useState } from "react";
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
import ProductFilterProvider, { ProductFilterContext } from "@/app/context/ProductFilterContext";
import { TableRowSkleton } from "../components/TableRowSkleton";
import { updatePageURL } from "@/app/services/apiFunctions/updateProductsApi";
import { useRouter } from "next/navigation";
import { FilterX, Plus } from "lucide-react";
import { ProductsPageHeader } from "../components/ProductsPageHeader";
import LoadingComponent from "@/app/_components/loadingComponent/LoadingComponent";
import { useProductDelete } from "@/app/context/ProductDeleteContext";
import { generateClassName } from "@/app/services/helperFunctions/generateClassNames";
import { ThemeProvider, ThemeProviderContext } from "@/app/context/ThemeProvider";
const page=() =>{
  const themeContext = useContext(ThemeProviderContext);
  if(!themeContext){
    throw new Error ("Context is not available here")
  }
  const{theme} = themeContext;
  const {isPending:deleteProductPending} = useProductDelete()
    const context = useContext(ProductFilterContext);
  const { filterState,setFilterState } = context;
  const router = useRouter()
const params = useMemo(() => updatePageURL(filterState), [
    filterState.keyword,
    filterState.categoryText,
    filterState.subCategoryText,
    filterState.price,
    filterState.stock,
    filterState.highlights,
    filterState.rating,
    filterState.page
  ]);
const getAllProducts = async (params: URLSearchParams): Promise<APIResponseSuccess<IResponseData> | APIResponseError> => {
  if (params.size === 0) {
    const response = await axios.get('/api/allProducts/displayProducts/all');
    return response.data;
  }
  const response = await axios.get(`/api/allProducts/displayProducts/PARAMS?${params.toString()}`);
  return response.data;
};
const queryString = useMemo(() => params.toString(), [params]);
const { data: productsResponse, isPending } = useQuery({
    queryKey: ['products', queryString],
    queryFn: () => getAllProducts(params),
  });
useEffect(() => {
    router.replace(`?${params}`, { scroll: false });
  }, [params, router]);
 useEffect(()=>{
   if(isPending){
    setFilterState((prev)=>({...prev,loading:true}))
  }else{
   setFilterState((prev)=>({...prev,loading:false})) 
  }
 },[isPending])
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
      {deleteProductPending && <LoadingComponent/>}
      <ProductsPageHeader/>
<div className={width > 1000 
  ? "overflow-x-hidden w-full" 
  : "overflow-x-auto max-w-[800px]"}>
  <div >
    <Table className={`${theme==='dark'? "darkTable":"lightTable"}`}>
    <TableTop/>
    <TableBody >
      {isPending?<TableRowSkleton rowNumber={10}/>:(<>
      {products.map((product: IProductDisplay, index: number) => (
        <TableData key={index} product={product} index={index} theme={theme} />
      ))}
      </>)}
    </TableBody>
  </Table>
  </div>
</div>
     <TableNavigation pagination={pagination}/>
    </div>
  );
}
export default page;