"use client"
import { Search, ShoppingCart, Heart } from "lucide-react";
import IconButton from "../../iconText/IconButton";
interface IActionIcons {
  onSearch: () => void,
  onCart: () => void,
  onWishlist: () => void,
  cartCount: number,
  wishlistCount: number,
  wishlistLoading: boolean,
  cartListLoading: boolean,
}
export const ActionIcons: React.FC<IActionIcons> = ({
  onSearch,
  onCart,
  onWishlist,
  cartCount,
  wishlistCount,
  wishlistLoading,
  cartListLoading,
}) => (
  <div className="flex justify-between w-full">
    <IconButton icon={<Search />} name="Search" onClick={onSearch}/>
    <IconButton
      icon={<ShoppingCart />}
      name="Cart"
      onClick={onCart}
      number={cartCount}
      loading={cartListLoading}
    />
    <IconButton
      icon={<Heart />}
      name="Wishlist"
      onClick={onWishlist}
      number={wishlistCount}
      loading={wishlistLoading}
    />
  </div>
);