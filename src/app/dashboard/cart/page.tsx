"use client";
import React from "react";
import { useSelector } from "react-redux";
import { CartState } from "@/app/redux/cartSlice";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import CartTable from "@/app/_components/cartTable/CartTable";
import CartSkeleton from "@/app/_components/skeletontext/CartSkleton";
import NoData from "@/app/_components/noData/NoData";
import { ShoppingBag, ShoppingCart,History } from "lucide-react";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { useRouter } from "next/navigation";
const Page = () => {
  const { cartItems, loading: cartLoading, initialized } = useSelector(
    (state: { cart: CartState }) => state.cart
  );
  const { userDetailsLoading } = useUserDetails();
  // Compute loading state
  const isLoading = cartLoading || userDetailsLoading || !initialized;
  const router = useRouter()
  // Compute empty state safely
  const isEmpty = !isLoading && cartItems.length === 0;
  return (
    <div className="container">
      <h2 className="secondaryHeading">Cart</h2>
      {isLoading ? (
        <CartSkeleton />
      ) : isEmpty ? (
        <div className="flex-1 flex flex-col">
          <NoData
            icon={<ShoppingCart />}
            notFoundMessage="There are no items in the cart. Please browse and add products"
          />
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Browse Products */}
      <div
        onClick={() => router.push("/catalog/advanceSearch?highlighted=none")}
        className="
          flex items-center gap-3 p-4 rounded-2xl cursor-pointer
          border border-[var(--primary)]
          bg-[var(--background)] shadow-sm
          transition-all duration-300
          hover:bg-[var(--primary)] hover:text-[var(--background)]
          hover:shadow-lg hover:scale-[1.02]
          active:scale-95
        "
      >
        <ShoppingBag className="w-6 h-6 text-[var(--helper)]" />
        <span className="font-medium">Browse Products</span>
      </div>
      {/* Check Recently Visited Products */}
      <div
        onClick={() => router.push("/pages/recent")}
        className="
          flex items-center gap-3 p-4 rounded-2xl cursor-pointer
          border border-[var(--primary)]
          bg-[var(--background)] shadow-sm
          transition-all duration-300
          hover:bg-[var(--primary)] hover:text-[var(--background)]
          hover:shadow-lg hover:scale-[1.02]
          active:scale-95
        "
      >
        <History className="w-6 h-6 text-[var(--helper)]" />
        <span className="font-medium">Check Recently Visited Products</span>
      </div>
    </div>
        </div>
      ) : (
        <div className="cartDetailsWrapper">
          <div className="cartTableandSummary">
            <CartTable />
            <CartSummary order={true} />
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
