import { headers } from "next/headers";
export async function getProductIdFromHeaders() {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const proto = headersList.get("x-forwarded-proto") || "http";
    const urlHeader = headersList.get("x-url") || "";
    const referer = headersList.get("referer");
    const fullUrl = referer?.includes("?") ? referer : `${proto}://${host}${urlHeader}`;
    const url = new URL(fullUrl);
    const productId = url.searchParams.get("id");
    console.log("🧭 getProductIdFromHeaders - host:", host);
    console.log("🧭 getProductIdFromHeaders - proto:", proto);
    console.log("🧭 getProductIdFromHeaders - urlHeader:", urlHeader);
    console.log("🧭 getProductIdFromHeaders - referer:", referer);
    console.log("🧭 getProductIdFromHeaders - fullUrl:", fullUrl);
    console.log("🧭 getProductIdFromHeaders - productId:", productId);
    return productId;
}
