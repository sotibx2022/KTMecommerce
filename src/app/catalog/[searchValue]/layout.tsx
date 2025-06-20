import { AdvanceSearchProvider } from "@/app/context/AdvanceSearchContext";
import CatalogPageLayout from "./CatalogPageLayout";
export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
      <div>
        <CatalogPageLayout>
{children}
        </CatalogPageLayout>
      </div>
  )
}