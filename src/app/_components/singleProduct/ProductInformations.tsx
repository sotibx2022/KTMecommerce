import React from 'react';
import { Info, CheckCircle2, AlertCircle, ShoppingCart, Heart } from 'lucide-react';
interface IProductInformationProps {
  productInformations:{
    stockAvailability:boolean,
    isAlreadyOnCart:boolean,
    isAlreadyOnWishList:boolean
  }
}
const ProductInformations: React.FC<IProductInformationProps> = ({
  productInformations
}) => {
  const {stockAvailability,isAlreadyOnCart,isAlreadyOnWishList} = productInformations
  console.log("Is the item already in the cart?", isAlreadyOnCart, "| Type:", typeof isAlreadyOnCart);
  console.log("Is the item already in the wishlist?", isAlreadyOnWishList, "| Type:", typeof isAlreadyOnWishList);
  console.log("Stock availability status:", stockAvailability, "| Type:", typeof stockAvailability);
  return (
    <div className='flex flex-col gap-3 max-w-[400px]'>
      {stockAvailability === false && (
        <div className="flex items-start gap-2 p-3 bg-red-50 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span className="text-sm">
            This product is currently out of stock. We'll notify you when it's available again if you added to Wishlist.
          </span>
        </div>
      )}
      {isAlreadyOnCart === true && (
        <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg text-blue-700">
          <ShoppingCart className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span className="text-sm">
            Already in your cart. You can update the quantity from your cart page.
          </span>
        </div>
      )}
      {isAlreadyOnWishList === true && isAlreadyOnCart === false && (
        <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg text-green-700">
          <Heart className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span className="text-sm">
            Saved in your wishlist. Ready to purchase? Add to cart now!
          </span>
        </div>
      )}
      {stockAvailability === true && isAlreadyOnCart === false && isAlreadyOnWishList === false && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg text-amber-700">
          <Info className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span className="text-sm">
            Available in stock. Add to your cart or save to wishlist.
          </span>
        </div>
      )}
    </div>
  );
};
export default ProductInformations;
