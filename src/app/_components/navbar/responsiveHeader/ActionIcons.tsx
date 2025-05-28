import { faHeart, faLuggageCart, faSearch } from "@fortawesome/free-solid-svg-icons";
import IconButton from "../../iconText/IconButton";
import IconGroup from "../../iconText/IconGroup";
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
  <div className="flex justify-center mt-4 gap-2">
    <IconButton icon={faSearch} name="Search" onClick={onSearch} />
    <IconGroup />
  </div>
);