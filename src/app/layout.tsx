// layout.tsx (server component)
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "./provider/queryProvider";
import RootClientProviders from "./RootClientProviders";
const myFont = localFont({ src: "./fonts/GeistVF.woff", variable: "--myFont" });
export const metadata = {
  title: "Ecommerce KTM",
  description: "Best electronics deals in Kathmandu",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={myFont.variable}>
        <RootClientProviders>{children}</RootClientProviders>
      </body>
    </html>
  );
}
