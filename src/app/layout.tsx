import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./provider/queryProvider";
const myFont = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--myFont",
  weight: "100 900",
});
export const metadata: Metadata = {
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
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Additional meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${myFont.variable}`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}