import { headers } from "next/headers";
import type { Metadata } from "next";
import React from "react";
import { config } from "@/config/configuration";
import SingleProductPageClient from "./SIngleProductClientPage";
import { getProductIdFromHeaders } from "./getProductIdFromHeaders";
interface PageProps {
  params: {
    productIdentifier: string;
  };
}
async function getSingleProduct(productId: string) {
  const response = await fetch(`${config.websiteUrl}/api/products/${productId}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}
export async function generateMetadata({
  searchParams: maybeSearchParams,
}: {
  searchParams: Promise<{ id?: string; slug?: string }>;
}): Promise<Metadata> {
  const searchParams = await maybeSearchParams;
  const productId = searchParams.id;
  const slug = searchParams.slug;
  if (!productId) {
    return {
      title: "Product Page",
      description: "View our product details",
    };
  }
  try {
    const productResponse = await getSingleProduct(productId);
    const product = productResponse.data;
    return {
      title: product.productName,
      description: product.productDescription,
      openGraph: {
        images: [product.image],
      },
      alternates: {
        canonical: `/singleProduct/${productId}?id=${productId}&slug=${slug || ""}`,
      },
    };
  } catch {
    return {
      title: "Product Page",
      description: "View our product details",
    };
  }
}
// Default export as async function
export default async function Page({ params }: PageProps) {
  return (
    <div>
      <SingleProductPageClient />
    </div>
  );
}
