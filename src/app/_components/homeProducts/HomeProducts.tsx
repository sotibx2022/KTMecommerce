"use client";
import { getAllProducts } from "@/app/services/queryFunctions/products";
import { useQuery } from "@tanstack/react-query";
import { IProductDisplay } from "../../types/products";
import React from "react";
import ProductCard from "../productCard/ProductCard";
const HomeProducts = () => {
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return (
    <div className="bg-primaryDark mt-4 pt-4 px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: IProductDisplay, index: number) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomeProducts;
