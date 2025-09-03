"use client";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { DisplayContext } from "@/app/context/DisplayComponents";
import { HeaderSection } from "./HeaderSection";
import { ActionIcons } from "./ActionIcons";
import { CategoryItem } from "./CategoryItem";
import { QuickLinks } from "./QuickLinks";
import { UserSection } from "./UserSection";
import LoginComponent from "../../authComponent/LoginComponent";
import { CartState } from "@/app/redux/cartSlice";
import { Category } from "@/app/types/categories";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { useInitialCategories } from "@/app/data/categoriesData";
const ResponsiveHeader = () => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const { data: navItems } = useInitialCategories();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeScreen, setActiveScreen] = useState(false);
  const toggleCategory = (index: number) => {
    setActiveCategory(prev => prev === index ? null : index);
  };
  return (
    <div className="fixed inset-0 z-50 min-h-[100vh]" style={{ background: "var(--gradientwithOpacity)" }}>
      <div className="absolute right-0 h-full w-full max-w-sm bg-background shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-background z-10 p-4">
          <HeaderSection onClose={() => setVisibleComponent('')} />
        </div>
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-primaryDark">Categories</h3>
            <ul className="space-y-2">
              {navItems?.data && navItems.data?.map((item: Category, index: number) => (
                <CategoryItem
                  key={item.url_slug || index}
                  item={item}
                  isActive={index === activeCategory}
                  onToggle={() => toggleCategory(index)}
                />
              ))}
            </ul>
          </div>
          <div>
            <QuickLinks />
          </div>
        </div>
        {activeScreen && visibleComponent === 'login' && (
          <LoginComponent />
        )}
      </div>
    </div>
  );
};
export default ResponsiveHeader;