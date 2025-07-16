import type { Metadata } from "next";
import { config } from "@/config/configuration";
import SingleProductPageClient from "./SIngleProductClientPage";
async function getSingleProduct(productId: string) {
  const response = await fetch(`${config.websiteUrl}/api/products/${productId}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}
// 🧠 SEO Metadata Generator
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { id?: string; slug?: string };
}): Promise<Metadata> {
  const productId = await searchParams.id;
  const slug = await searchParams.slug;
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
        title: product.productName,
        description: product.productDescription,
        type: "website",
        images: [product.image],
        url: `${config.websiteUrl}/singleProduct/${productId}?id=${productId}&slug=${slug || ""}`,
      },
    };
  } catch {
    return {
      title: "Product Page",
      description: "View our product details",
    };
  }
}
export default async function Page() {
  return (
    <div>
      <SingleProductPageClient />
    </div>
  );
}
