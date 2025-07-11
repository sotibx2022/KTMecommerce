import { headers } from "next/headers";
import type { Metadata} from "next";
import SingleProductLayout from "./SingleProductLayout";
import { config } from "@/config/configuration";
import { ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
export default async function Layout({ children }: LayoutProps) {
  return (
    <SingleProductLayout>
      {children}
    </SingleProductLayout>
  );
}
