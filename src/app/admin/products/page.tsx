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
import dynamic from "next/dynamic";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Loader2, Menu } from "lucide-react";
import { IProductDisplay } from "@/app/types/products";
import { initialCategories } from "@/app/data/categoriesData";
import { useCategories } from "@/app/hooks/queryHooks/useCategory";
import { APIResponseError, APIResponseSuccess } from "@/app/services/queryFunctions/users";
import { ShortableTableHead } from "../components/ShortableTableHead";
import { Category } from "@/app/types/categories";
import CategoriesSelection from "../components/CategoreisSelection";
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
  const[selectedCategory,setSelectedCategory] = useState(false);
  const[selectedSubCategory,setSelectedSubCategory] = useState("Sub-Category")
  const[ratingSortState,setRatingSortState] = useState<"normal" | "ascending" | "descending">("normal")
  const handlePageChange=(pageNumber:number)=>{
  }
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
// const handleCategorySelection=(category:string)=>{
//   setSelectedCategory(category);
// }
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
  const response = await axios.get(`/api/categories/${selectedCategory}`);
  return response.data
}
// const { data:subCategories, isPending: subCategoriesPending } = useQuery<
//   APIResponseSuccess<ISubCategoryDatas> | APIResponseError
// >({
//   queryKey: ['subCategories', selectedCategory],
//   queryFn: () => fetchSubCategories(selectedCategory as string),
//   enabled: !!selectedCategory && selectedCategory !== 'Category'
// });
// const subCategoryLoading = subCategoriesPending && selectedCategory !== 'Category'
  return (
    <div className=" relative py-10">
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
      <Table className=" bg-green-500">
        <TableHeader>
          <TableRow>
            <TableHead>SN.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="min-w-[200px]">Product Name</TableHead>
            <ShortableTableHead label="Price" onClick={UpdatePriceSorting} state={priceSortState}/>
 <TableHead className=" mix-w-[50px]">
  <div className="flex items-center">
    <span>Stock</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-4 w-4 ml-2 hover:text-helper cursor-pointer">
          <Menu className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute left-0 mt-1 w-48 z-50" align="start">
        <DropdownMenuItem>Yes</DropdownMenuItem>
        <DropdownMenuItem>No</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</TableHead>
<TableHead className="min-w-[100px] overflow-visible relative">
  <div className="flex items-center relative">
    <span>{selectedCategory}</span>
    <button onClick={()=>setSelectedCategory(!selectedCategory)}>{selectedCategory?"Show":"Hide"}</button>
    {selectedCategory && <CategoriesSelection/>}
  </div>
</TableHead>
<TableHead className=" w-[150px]">
  <div className="flex items-center">
    <span>{selectedSubCategory}</span>
    {/* <DropdownMenu>
      {selectedCategory !== 'Category' && (
        <DropdownMenuTrigger asChild>
          <div className="h-4 w-4 ml-2 hover:text-helper cursor-pointer">
            {subCategoryLoading ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </div>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent className="absolute left-0 mt-1 w-48 z-50" align="start">
        <DropdownMenuItem onSelect={() => handleSubCategorySelection("Sub-Category")}>Sub Category</DropdownMenuItem>
        {subCategories?.success && subCategories.data?.subcategories.map((item: ISubCategoryData, index: number) => (
          <DropdownMenuItem 
            key={index} 
            onSelect={() => handleSubCategorySelection(item.category_name)}
          >
            {item.category_name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu> */}
  </div>
</TableHead>
<TableHead className=" w-[120px]">
  <div className="flex items-center">
    <span>HighLight</span>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-4 w-4 ml-2 hover:text-helper cursor-pointer">
          <Menu className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute left-0 mt-1 w-48 z-50" align="start">
        <DropdownMenuItem>New Arrival</DropdownMenuItem>
        <DropdownMenuItem>Best Seller</DropdownMenuItem>
        <DropdownMenuItem>Featured</DropdownMenuItem>
        <DropdownMenuItem>Special Offer</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</TableHead>
            <ShortableTableHead label="Rating" onClick={UpdateRatingSorting} state={ratingSortState}/>
            <TableHead className="w-[100px]">Actions</TableHead>
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
              <TableCell>${Number(product.price).toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={product.stockAvailability ? "success" : "failure"}>
                  {product.stockAvailability ? "yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell>{product.subCategoryName}</TableCell>
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
      <div className="container justify-center my-2 flex items-center gap-2">
  {Array.from({ length: pagination.totalPages }).map((_, index) => (
    <button
      key={index}
      className={`flex h-10 w-10 items-center justify-center rounded-md border ${
        pagination.currentPage === index + 1
          ? "bg-primaryDark text-background"
          : "hover:bg-primaryLight"
      }`}
      onClick={() => handlePageChange(index + 1)}
    >
      {index + 1}
    </button>
  ))}
</div>
    </div>
  );
}