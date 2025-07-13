import LinkComponent from '@/app/_components/linkComponent/LinkComponent';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IWishListItemDisplay } from '@/app/types/wishlist';
import useAddItemToCart from '@/app/_components/singleProduct/useAddItemToCart';
import { removeFromWishList } from '@/app/redux/wishListSlice';
import { useDispatch } from 'react-redux';
import { useRemoveWishListFromDB } from '@/app/dashboard/wishlist/useRemoveWIshListFromDB';
import { useContext } from 'react';
import { Badge } from '@/components/ui/badge';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
interface WishlistItemProps {
  item: IWishListItemDisplay;
  actionAble?:boolean
}
const SingleWishListCard:React.FC<WishlistItemProps> = ({ item,actionAble}) => {
  const { userDetails } = useUserDetails();
  const dispatch = useDispatch()
  const removeFromWishList = useRemoveWishListFromDB()
  const dataForCartItem = (item: IWishListItemDisplay) => {
    return [{
      productName: item.productName,
      productId: item.productId,
      brand: item.brand!,
      price: item.price,
      image: item.image,
      quantity: 1,
      userId: userDetails?._id.toString() || "",
      category: item.category!,
      wishersId: item.wishersId
    }];
  };
  const removeItemFromWishList = (productId: string) => {
    removeFromWishList.mutate(productId);
  }
  const addItemToCart = useAddItemToCart()
  return (
    <div
  className={`group relative bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 shadow-primaryLight border border-gray-100`}
>
  {/* Product Image */}
  <div className="rounded-lg overflow-hidden bg-background aspect-square mb-3">
    <img
      src={item.image}
      alt={item.productName}
      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      loading="lazy"
    />
  </div>
  {/* Product Info */}
  <div className="flex flex-col gap-2">
    <div>
      <h3 className=" text-primaryDark text-xl font-medium line-clamp-2 min-h-[2.5rem]">
        <LinkComponent
          href={`/singleProduct/productIdentifier?id=${item.productId}&slug=${item.productName}`}
          text={item.productName}
          className="hover:underline"
        />
      </h3>
    </div>
    <div className="flex justify-between items-center">
      <Badge variant={'outline'}>{item.brand}</Badge>
      <Badge variant={'secondary'}>{item.category}</Badge>
      <p className="price-highlight text-lg font-semibold">
        ${item.price}
      </p>
    </div>
  </div>
  {/* Action Buttons - Only shown if actionAble */}
  {actionAble && (
    <div className="mt-4 flex justify-between items-center gap-2">
      <PrimaryButton
        searchText="Add to Cart"
        onClick={() => addItemToCart(dataForCartItem(item))}
      />
      <button
        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors flex items-center justify-center"
        aria-label="Remove from wishlist"
        onClick={() => removeItemFromWishList(item.productId)}
      >
        <FontAwesomeIcon icon={faTrashAlt} className="w-4 h-4" />
      </button>
    </div>
  )}
</div>
  );
};
export default SingleWishListCard;