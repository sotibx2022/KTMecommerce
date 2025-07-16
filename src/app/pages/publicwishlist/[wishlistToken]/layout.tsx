import { headers } from "next/headers";
import { URL } from "url";
interface IRootLayout {
    children: React.ReactNode;
}
export default async function RootLayout({ children }: IRootLayout) {
    const headersList = await headers(); // ✅ Correct, not async
    const referer = headersList.get("referer"); // or try 'x-url'
    let wishlistToken: string | null = null;
    if (referer) {
        try {
            const url = new URL(referer);
            wishlistToken = url.searchParams.get("wishlistCollectionToken");
        } catch (err) {
            console.error("Error parsing URL:", err);
        }
    }
    return (
        <>
            {wishlistToken && <p>Token from referer: {wishlistToken}</p>}
            {children}
        </>
    );
}
