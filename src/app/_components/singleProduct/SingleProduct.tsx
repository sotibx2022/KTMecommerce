"use client";
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../primaryButton/PrimaryButton";
import useAddItemToCart from "./useAddItemToCart";
import { IProductDisplay } from "@/app/types/products";
import { ICartItem } from "@/app/types/cart";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { CartState } from "@/app/redux/cartSlice";
import SubmitSuccess from "../submit/SubmitSuccess";
import DisplaySingleProductRating from "../singleProductReviews/DisplaySingleProductRating";
import SocialMediaSharing from "../socialMedia/SocialMediaSharing";
import { DisplayContext } from "@/app/context/DisplayComponents";
import ProductImage from "./ProductImage";
import LoginComponent from "../authComponent/LoginComponent";
import { IWishListItemDisplay } from "@/app/types/wishlist";
import useAddItemToWishList from "./useAddItemToWishList";
import ProductTitle from "../productCard/ProductTitle";
import ProductInformations from "./ProductInformations";
import { useUserDetails } from "@/app/context/UserDetailsContextComponent";
import { IWishListState } from "@/app/redux/wishListSlice";
const SingleProduct: React.FC<IProductDisplay> = ({ ...productDetails }) => {
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const wishListItems = useSelector((state: { wishList: IWishListState }) => state.wishList.wishListItems);
  const { userDetails } = useUserDetails();
  const {
    productName,
    productDescription,
    brand,
    price,
    stockAvailability,
    productFeatures,
    image,
    _id,
    quantity,
    userId,
    category,
    overallRating,
    isNewArrivals,
    isTrendingNow,
    isTopSell,
    isOfferItem
  } = productDetails;
  const baseData = {
    productName,
    productId: productDetails?._id,
    brand,
    price,
    image,
    category,
    userId,
    wishersId: userDetails?._id.toString() || ""
  };
  const dataForCartItem: ICartItem = {
    ...baseData,
    quantity,
  };
  const isAlreadyOnCart = cartItems?.some((item: ICartItem) => item.productId === _id);
  const isAlreadyOnWishList = wishListItems?.some((item: IWishListItemDisplay) => item.productId === _id);
  const addItemToCart = useAddItemToCart();
  const addItemsToWishList = useAddItemToWishList();
  return (
    <>
      <div className="container">
        <div className="flex-col md:flex-row flex justify-between items-center py-4 gap-4 min-h-[50vh]">
          <div className="singleProductLeft md:w-1/2 w-full">
            <ProductTitle productName={productName} productHighlight={{
              isNewArrivals,
              isTrendingNow,
              isTopSell,
              isOfferItem
            }} />
            <div className="overallRatingArea my-2">
              <DisplaySingleProductRating rating={overallRating} />
            </div>
            <p className="primaryParagraph">{productDescription}</p>
            <div className="productDetails flex items-center gap-4 my-2">
              <p className="text-background bg-helper p-2 rounded-md">Brand: {brand}</p>
              <h3 className={`text-background p-2 rounded-md ${stockAvailability ? "bg-green-500" : "bg-red-500"}`}>
                {stockAvailability ? "In Stock" : "Out of Stock"}
              </h3>
              <p className="price-highlight">${price}</p>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-primaryDark">Features</h2>
            <ul className="primaryList">
              {productFeatures?.map((feature: string, index: number) => (
                <li key={index} className="text-primaryDark flex items-center gap-1">
                  <FontAwesomeIcon icon={faCaretRight} className="mr-2" />
                  <p>{feature}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 h-auto">
            <img
              src={image}
              alt={productName}
              className="max-w-[300px] h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="productActions flex gap-4 my-4 items-center justify-center md:justify-start">
            <PrimaryButton
              searchText="To Cart"
              onClick={() => userDetails ? addItemToCart([dataForCartItem]) : setVisibleComponent('login')}
              disabled={isAlreadyOnCart || !stockAvailability}
            />
            <PrimaryButton
              searchText="To WishList"
              onClick={() => userDetails ? addItemsToWishList(baseData) : setVisibleComponent('login')}
              disabled={isAlreadyOnWishList}
            />
            <PrimaryButton
              searchText="To Others"
              onClick={() => setVisibleComponent('productImage')}
            />
          </div>
          <ProductInformations
            productInformations={{
              stockAvailability,
              isAlreadyOnCart,
              isAlreadyOnWishList
            }}
          />
        </div>
        <Toaster />
      </div>
      {visibleComponent === 'login' && <LoginComponent />}
      {visibleComponent === 'productImage' && <ProductImage {...productDetails} />}
    </>
  );
};
export default SingleProduct;
