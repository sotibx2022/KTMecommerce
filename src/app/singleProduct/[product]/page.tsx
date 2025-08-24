import type { Metadata } from "next";
import { config } from "@/config/configuration";
import SingleProductPageClient from "./SIngleProductClientPage";
import SetRecentProducts from "./SetRecentProducts";
async function getSingleProduct(productId: string) {
  const response = await fetch(`${config.websiteUrl}/api/products/${productId}`, {
    next: { revalidate: 3600 },
  });
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}
interface ISearchParams {
  searchParams: Promise<{ id?: string; slug?: string }>
}
export async function generateMetadata({
  searchParams: mysearchParams
}: ISearchParams): Promise<Metadata> {
  const searchParams = await mysearchParams;
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
