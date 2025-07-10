import { headers } from "next/headers";
import type { Metadata} from "next";
import SingleProductLayout from "./SingleProductLayout";
import { config } from "@/config/configuration";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
async function getSingleProduct(productId: string) {
  const response = await fetch(`${config.websiteUrl}/api/products/${productId}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const proto = headersList.get("x-forwarded-proto") || "http";
  const urlHeader = headersList.get("x-url") || "";
  const referer = headersList.get("referer");
  const fullUrl = referer?.includes("?")
    ? referer
    : `${proto}://${host}${urlHeader}`;
  const url = new URL(fullUrl);
  const productId = url.searchParams.get("id");
  const slug = url.searchParams.get("slug");
  if (!productId) {
    return {
      title: "Product Page",
      description: "View our product details",
    };
  }
  const productResponse = await getSingleProduct(productId);
  const product = productResponse.data;
  return {
    title: product.productName,
    description: product.productDescription,
    openGraph: {
      images: [product.image],
    },
    alternates: {
      canonical: `/singleProduct/productIdentifier?id=${productId}&slug=${slug || ""}`,
    },
  };
}
export default async function Layout({ children }: LayoutProps) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const proto = headersList.get("x-forwarded-proto") || "http";
  const urlHeader = headersList.get("x-url") || "";
  const referer = headersList.get("referer");
  const fullUrl = referer?.includes("?")
    ? referer
    : `${proto}://${host}${urlHeader}`;
  const url = new URL(fullUrl);
  const productId = url.searchParams.get("id");
  if (!productId) {
    return <div>Product ID is required</div>;
  }
  const productResponse = await getSingleProduct(productId);
  const productData = productResponse.data;
  return (
    <SingleProductLayout>
      {children}
    </SingleProductLayout>
  );
}
