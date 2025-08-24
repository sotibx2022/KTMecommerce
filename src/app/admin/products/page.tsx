"use client"
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { IProductDisplay } from "@/app/types/products";
import { APIResponseError, APIResponseSuccess } from "@/app/services/queryFunctions/users";
import TableTop from "../components/TableHeader";
import { IResponseData } from "../components/products";
import TableData from "../components/TableData";
import { useScreenWidth } from "@/app/services/helperFunctions/findScreenWidth";
import ProductFilterProvider, { ProductFilterContext } from "@/app/context/ProductFilterContext";
import { TableRowSkleton } from "../components/TableRowSkleton";
import { updatePageURL } from "@/app/services/apiFunctions/updateProductsApi";
import { useRouter } from "next/navigation";
import { ProductsPageHeader } from "../components/ProductsPageHeader";
import LoadingComponent from "@/app/_components/loadingComponent/LoadingComponent";
import { useProductDelete } from "@/app/context/ProductDeleteContext";
import { ThemeProvider, ThemeProviderContext } from "@/app/context/ThemeProvider";
import Navigation from "../components/Navigation";
import { useSidebar } from "@/components/ui/sidebar";
const page = () => {
  const themeContext = useContext(ThemeProviderContext);
  if (!themeContext) {
    throw new Error("Context is not available here")
  }
  const { theme } = themeContext;
  const { isPending: deleteProductPending } = useProductDelete()
  const context = useContext(ProductFilterContext);
  const { filterState, setFilterState } = context;
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
  useEffect(() => {
    if (isPending) {
      setFilterState((prev) => ({ ...prev, loading: true }))
    } else {
      setFilterState((prev) => ({ ...prev, loading: false }))
    }
  }, [isPending])
  // ✅ NEW: refs + sidebar + screen width
  const screenWidth = useScreenWidth();
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === "collapsed";
  const tableWrapperRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const products = productsResponse?.success ? productsResponse.data!.products : [];
  const pagination = productsResponse?.success ? productsResponse.data!.pagination : {
    currentPage: 1,
    pageSize: 10,
    totalProducts: 0,
    totalPages: 1
  };
  return (
    <div className="relative py-10">
      {deleteProductPending && <LoadingComponent />}
      <ProductsPageHeader />
      <div
        className="tableContainer ml-4"
        ref={tableWrapperRef}
        style={{
          maxWidth: isCollapsed ? "85vw" : "70vw",
        }}
      >
        <div
          className={
            tableWrapperRef.current?.clientWidth &&
              tableRef.current?.clientWidth &&
              tableWrapperRef.current.clientWidth > tableRef.current.clientWidth
              ? "overflow-x-hidden w-full "
              : `overflow-x-auto w-full`
          }
        >
          <Table
            ref={tableRef}
            className={`${theme === 'dark' ? "darkTable" : "lightTable"}`}
          >
            <TableTop />
            <TableBody >
              {isPending ? <TableRowSkleton rowNumber={10} /> : (<>
                {products.map((product: IProductDisplay, index: number) => (
                  <TableData key={index} product={product} index={index} theme={theme} />
                ))}
              </>)}
            </TableBody>
          </Table>
        </div>
      </div>
      <Navigation pagination={pagination} selectedPageNumber={(pageNumber: number) => {
        setFilterState((prev) => ({ ...prev, page: pageNumber }))
      }} />
    </div>
  );
}
export default page;
