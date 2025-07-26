"use client"
import { Search, ShoppingCart, Heart } from "lucide-react";
import IconButton from "../../iconText/IconButton";
export const ActionIcons = ({
  onSearch,
  onCart,
  onWishlist,
  cartCount
}: {
  onSearch: () => void,
  onCart: () => void,
  onWishlist: () => void,
  cartCount: number
}) => (
  <div className="flex justify-between w-full"> 
    <IconButton icon={<Search />} name="Search" onClick={onSearch} />
    <IconButton
      icon={<ShoppingCart />}
      name="Cart"
      onClick={onCart}
      number={cartCount}
    />
    <IconButton
      icon={<Heart />}
      name="Wishlist"
      onClick={onWishlist}
      number={0} // Replace with actual wishlist count if needed
    />
  </div>
);