import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./provider/queryProvider";
import { AdvanceSearchProvider } from "./context/AdvanceSearchContext";
import { Suspense } from "react";
import LoadingComponent from "./_components/loadingComponent/LoadingComponent";
const myFont = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--myFont",
  weight: "100 900",
});
export const metadata: Metadata = {
  metadataBase:new URL('https://ecommercektm.vercel.app'),
  title: "Ecommerce KTM - One Stock Electronics Store in Kathmandu, Nepal",
  description: "Best electronics deals in Kathmandu. Fast delivery, genuine products, and competitive prices.",
  keywords: ['online shopping nepal', 'ecommerce ktm', 'buy electronics in kathmandu'],
  alternates: {
    canonical: "https://ecommercektm.vercel.app"
  },
  openGraph: {
    title: "Ecommerce KTM - One Stock Electronics Store in Kathmandu, Nepal",
    description: "Best electronics deals in Kathmandu. Fast delivery, genuine products, and competitive prices.",
    url: "https://ecommercektm.vercel.app",
    siteName: "Ecommerce KTM",
    images: [
      {
        url: "../assets/socialPreview.PNG",
        width: 1200,
        height: 630,
        alt: "Ecommerce KTM - Your One Stop Electronics Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce KTM - One Stock Electronics Store in Kathmandu, Nepal",
    description: "Best electronics deals in Kathmandu. Fast delivery, genuine products, and competitive prices.",
    images: ["../assets/socialPreview.PNG"],
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${myFont.variable}`}>
        <QueryProvider>
          <Suspense fallback={<LoadingComponent/>}>
           <AdvanceSearchProvider>
          {children}
          </AdvanceSearchProvider>
          </Suspense>
        </QueryProvider>
      </body>
    </html>
  );
}