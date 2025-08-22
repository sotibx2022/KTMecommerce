"use client";
import React, { useContext, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CategoryTable from "./CategoryTable";
import SubCategoryTable from "./SubCategoryTable";
import { DisplayContext } from "@/app/context/DisplayComponents";
import { ThemeProviderContext } from "@/app/context/ThemeProvider";
const Page = () => {
  const [tabValue, setTabValue] = useState("categories");
   const themeContext = useContext(ThemeProviderContext);
    if (!themeContext) {
      throw new Error("Theme Context is not Defined here")
    }
    const { theme } = themeContext
  return (
    <>
      <Tabs
        value={tabValue}
        onValueChange={setTabValue}
        className="w-full mb-4"
      >
        {/* Tab Header */}
        <TabsList className="flex w-fit gap-2 bg-[--backgroundLight] rounded-md p-1">
          <TabsTrigger
            value="categories"
            className="px-4 py-2 rounded-md data-[state=active]:bg-[--primary] data-[state=active]:text-[--background] data-[state=inactive]:text-[--primaryDark] transition-colors"
          >
            Categories
          </TabsTrigger>
          <TabsTrigger
            value="subcategories"
            className="px-4 py-2 rounded-md data-[state=active]:bg-[--primary] data-[state=active]:text-[--background] data-[state=inactive]:text-[--primaryDark] transition-colors"
          >
            Subcategories
          </TabsTrigger>
        </TabsList>
        {/* Tab Content */}
        <TabsContent value="categories">
          <CategoryTable theme={theme}/>
        </TabsContent>
        <TabsContent value="subcategories">
          <SubCategoryTable  theme={theme}/>
        </TabsContent>
      </Tabs>
    </>
  );
};
export default Page;
