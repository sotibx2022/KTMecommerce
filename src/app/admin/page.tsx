"use client"
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
const DisplaySingleProductRating = dynamic(
  () => import("../_components/singleProductReviews/DisplaySingleProductRating"),
  {
    ssr: false,
  }
);
import dynamic from "next/dynamic";
import { DateFormator } from "../services/helperFunctions/functions";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { ShortableTableHead } from "./components/ShortableTableHead";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { APIResponseSuccess,APIResponseError } from "../services/queryFunctions/users";
import { IProductDisplay } from "../types/products";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useCategories } from "../hooks/queryHooks/useCategory";
import { initialCategories } from "../data/categoriesData";
import { Category } from "../types/categories";
interface IPagination {
  currentPage: number;
  pageSize: number;
  totalProducts: number;
  totalPages: number;
}
interface IResponseData {
  pagination: IPagination;
  products: IProductDisplay[];
}
export default function ProductsPage() {
  const { data: navItems = initialCategories, isPending:isCategoryPending, isError } = useCategories();
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
// Corrected destructuring - access productsResponse.data.products/pagination
const products = productsResponse?.success ? productsResponse.data!.products : [];
const pagination = productsResponse?.success ? productsResponse.data!.pagination : {
  currentPage: 1,
  pageSize: 10,
  totalProducts: 0,
  totalPages: 1
};
  const[priceSortState,setPriceSortState] = useState<"normal" | "ascending" | "descending">("normal")
  const[selectedCategory,setSelectedCategory] = useState("Category")
  const[selectedSubCategory,setSelectedSubCategory] = useState("Sub-Category")
  const[ratingSortState,setRatingSortState] = useState<"normal" | "ascending" | "descending">("normal")
  const UpdatePriceSorting = () => {
  setPriceSortState(prevState => 
    prevState === "ascending" ? "descending" : "ascending"
  );
}
const UpdateRatingSorting = () => {
  setRatingSortState(prevState => 
    prevState === "ascending" ? "descending" : "ascending"
  );
}
const handleCategorySelection=(category:string)=>{
  setSelectedCategory(category);
}
const handleSubCategorySelection=(category:string)=>{
  setSelectedSubCategory(category)
}
interface ISubCategoryData{
  category_name:string
}
interface ISubCategoryDatas{
  _id:string,
  subcategories:ISubCategoryData[]
}
const fetchSubCategories = async(category:string):Promise<APIResponseSuccess<ISubCategoryDatas>| APIResponseError>=>{
  const response = await axios.get(`/api/categoreis/${selectedCategory}`);
  return response.data
}
const { data:subCategories, isPending: subCategoriesPending } = useQuery<
  APIResponseSuccess<ISubCategoryDatas> | APIResponseError
>({
  queryKey: ['subCategories', selectedCategory],
  queryFn: () => fetchSubCategories(selectedCategory as string),
  enabled: !!selectedCategory
});
  return (
    <div className="container mx-auto py-10">
      <div className="ContainerHeader flex justify-between items-center my-4">
        <div className="headerLeft ">
          <div className="containerLeft flex gap-2">
            <Input className="formItem" placeholder="Search Keyword"></Input>
      <Button variant="default">Search</Button>
          </div>
        </div>
      <div className="headerRight">
        <Button variant="outline">Add Product</Button>
      </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>SN.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Brand</TableHead>
            <ShortableTableHead label="Price" onClick={UpdatePriceSorting} state={priceSortState}/>
            <TableHead>Stock</TableHead>
            <TableHead className="flex gap-2 items-center">{selectedCategory}
              <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-4 h-4 cursor-pointer hover:text-helper">  {/* `size="icon"` makes it square */}
          <FontAwesomeIcon icon={faBars}/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>All Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {navItems.map((item:Category,index:number)=>{
          return <DropdownMenuItem key={index} onSelect={()=>handleCategorySelection(item.category_name)}>{item.category_name}</DropdownMenuItem>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
            </TableHead>
            <TableHead>{selectedSubCategory}
              <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-4 h-4 cursor-pointer hover:text-helper">  {/* `size="icon"` makes it square */}
          {
  subCategoriesPending ? (
    <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
  ) : (
    <FontAwesomeIcon icon={faBars} />
  )
}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Sub Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {subCategories?.success && subCategories.data?.subcategories.map((item:ISubCategoryData,index:number)=>{
          return <DropdownMenuItem key={index} onSelect={()=>handleSubCategorySelection(item.category_name)}>{item.category_name}</DropdownMenuItem>
        })}
      </DropdownMenuContent>
    </DropdownMenu>
            </TableHead>
            <TableHead>HighLight</TableHead>
            <ShortableTableHead label="Rating" onClick={UpdateRatingSorting} state={ratingSortState}/>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product:IProductDisplay,index:number) => (
            <TableRow key={index}>
              <TableCell>
                {index+1}
              </TableCell>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.brand}
                  width={50}
                  height={50}
                  className="rounded"
                />
              </TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>${Number(product.price).toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={product.stockAvailability ? "success" : "failure"}>
                  {product.stockAvailability ? "yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>Smartphones</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {product.isNewArrivals && <Badge variant='default' className="flex justify-center items-center">New</Badge>}
                {product.isOfferItem && <Badge variant='default' className="flex justify-center items-center">Offer</Badge>}
                {product.isTopSell && <Badge variant='default' className="flex justify-center items-center">Top</Badge>}
                {product.isTrendingNow && <Badge variant='default'className="flex justify-center items-center">Trending</Badge>}
                {!product.isNewArrivals && !product.isOfferItem && !product.isTopSell && !product.isTrendingNow && <Badge variant='outline' className="flex justify-center items-center">Regular</Badge>}
                </div>
              </TableCell>
              <TableCell >
                <Badge className="" variant ="outline">
                    <p>{product.overallRating}/5</p>
                </Badge>
              </TableCell>
              <TableCell className="">
  <div className="flex items-center flex-wrap justify-center gap-2">
    <button className="text-blue-500 hover:text-blue-700">
    <FaEye size={18} />
  </button>
  <button className="text-green-500 hover:text-green-700">
    <FaEdit size={18} />
  </button>
  <button className="text-red-500 hover:text-red-700">
    <FaTrash size={18} />
  </button>
  </div>
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}