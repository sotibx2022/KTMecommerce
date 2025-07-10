import LinkComponent from '@/app/_components/linkComponent/LinkComponent';
import PrimaryButton from '@/app/_components/primaryButton/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { IWishListItemDisplay } from '@/app/types/wishlist';
import useAddItemToCart from '@/app/_components/singleProduct/useAddItemToCart';
import { UserDetailsContext } from '@/app/context/UserDetailsContextComponent';
import { removeFromWishList } from '@/app/redux/wishListSlice';
import { useDispatch } from 'react-redux';
import { useRemoveWishListFromDB } from '@/app/dashboard/wishlist/useRemoveWIshListFromDB';
import { useContext } from 'react';
interface WishlistItemProps {
  item: IWishListItemDisplay;
  actionAble?:boolean
}
const SingleWishListCard:React.FC<WishlistItemProps> = ({ item,actionAble}) => {
  const userContext = useContext(UserDetailsContext);
  if (!userContext) {
    throw new Error("User Detail Context is not defined here.")
  }
  const { userDetails } = userContext;
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
      className={`group relative bg-background p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 shadow-primaryLight`}
    >
      {/* Product Image */}
      <div className="rounded-lg overflow-hidden bg-background">
        <img
          src={item.image}
          alt={item.productName}
          className="w-full max-h-[200px] object-cover object-center group-hover:opacity-75"
          loading="lazy"
        />
      </div>
      {/* Product Info */}
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-primaryDark">
            <LinkComponent
              href={`/singleProduct/productIdentifier?id=${item.productId}&slug=${item.productName}`}
              text={item.productName}
            />
          </h3>
          <p className="text-background bg-helper p-2 rounded-md text-center">
            {item.brand}
          </p>
        </div>
        <p className="price-highlight">
          ${item.price}
        </p>
      </div>
      {/* Action Buttons */}
      {actionAble && <div className="mt-4 flex justify-between items-center">
        <PrimaryButton
          searchText="To Cart"
          onClick={() => addItemToCart(dataForCartItem(item))}
        />
        <button
          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Remove from wishlist"
          onClick={() => removeItemFromWishList(item.productId)}
        >
          <FontAwesomeIcon icon={faTrashAlt} className="w-5 h-5" />
        </button>
      </div>}
    </div>
  );
};
export default SingleWishListCard;