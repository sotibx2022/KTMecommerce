import type { Metadata } from "next";
import "./../globals.css";
export const metadata: Metadata = {
  title: "WishList",
  description:
    "Explore your saved items on the Wishlist page of EcommerceKTM. View, manage, and move favorite products to your cart for quick and easy checkout. Keep track of what you love in one place.",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
