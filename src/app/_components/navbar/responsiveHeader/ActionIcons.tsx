import { faHeart, faLuggageCart, faSearch } from "@fortawesome/free-solid-svg-icons";
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
  <div className="flex justify-around mt-4 space-x-2">
    <IconButton icon={faSearch} name="Search" onClick={onSearch} />
    <IconButton
      icon={faLuggageCart}
      name="Cart"
      number={cartCount}
      onClick={onCart}
    />
    <IconButton
      icon={faHeart}
      name="Wishlist"
      onClick={onWishlist}
    />
  </div>
);