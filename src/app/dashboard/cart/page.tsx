"use client";
import React from "react";
import { useSelector } from "react-redux";
import { CartState } from "@/app/redux/cartSlice";
import CartSummary from "@/app/_components/cartSummary/CartSummary";
import CartTable from "@/app/_components/cartTable/CartTable";
import CartSkeleton from "@/app/_components/skeletontext/CartSkleton";
import NoData from "@/app/_components/noData/NoData";
import { ShoppingCart } from "lucide-react";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import PrimaryButton from "@/app/_components/primaryButton/PrimaryButton";
import { useRouter } from "next/navigation";
import SecondaryButton from "@/app/_components/secondaryButton/SecondaryButton";
import LinkComponent from "@/app/_components/linkComponent/LinkComponent";
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
        <div className="flex-1 flex flex-col items-center justify-center">
          <NoData
            icon={<ShoppingCart />}
            notFoundMessage="There are no items in the cart. Please browse and add products"
          />
          <div className="mt-6 flex flex-col gap-4 browserButtons">
            <LinkComponent
              text="Browse Products"
              href={"/catalog/advanceSearch?highlighted=none"} />
            <LinkComponent
              text="Check Recently Visited Products"
              href={"/pages/recent"} />
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
