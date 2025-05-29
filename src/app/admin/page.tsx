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
const products = [
  {
    id: "prod_123",
    productImage: "/placeholder-product.jpg",
    productName:"This is samsung product which is great to use",
    brand: "Apple",
    price: 1299.99,
    stockAvailability: true,
    variant: "256GB Space Gray",
    categoryId: "cat_electronics",
    subCategoryID: "subcat_smartphones",
    isNewArrivals: true,
    isTrendingNow: true,
    isTopSell: false,
    isOfferItem: false,
    overallRating: 4.8,
  },
];
export default function ProductsPage() {
  const[priceSortState,setPriceSortState] = useState<"normal" | "ascending" | "descending">("normal")
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
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Brand</TableHead>
            <ShortableTableHead label="Price" onClick={UpdatePriceSorting} state={priceSortState}/>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Subcategory</TableHead>
            <TableHead>HighLight</TableHead>
            <ShortableTableHead label="Rating" onClick={UpdateRatingSorting} state={ratingSortState}/>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  src={product.productImage}
                  alt={product.brand}
                  width={50}
                  height={50}
                  className="rounded"
                />
              </TableCell>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant={product.stockAvailability ? "success" : "failure"}>
                  {product.stockAvailability ? "yes" : "No"}
                </Badge>
              </TableCell>
              <TableCell>Electronics</TableCell>
              <TableCell>Smartphones</TableCell>
              <TableCell>
                <div className="flex gap-2 flex-wrap">
                  {product.isNewArrivals && <Badge variant='default'>New</Badge>}
                {product.isOfferItem && <Badge variant='default'>Offer</Badge>}
                {product.isTopSell && <Badge variant='default'>Top</Badge>}
                {product.isTrendingNow && <Badge variant='default'>Trending</Badge>}
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