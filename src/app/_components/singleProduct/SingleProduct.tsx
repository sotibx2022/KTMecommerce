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
import { UserDetailsContext } from "@/app/context/UserDetailsContextComponent";
import LoginComponent from "../authComponent/LoginComponent";
import { IWishListItem } from "@/app/types/wishlist";
import { addToWishList, IWishListState } from "@/app/redux/wishListSlice";
import useAddItemToWishList from "./useAddItemToWishList";
const SingleProduct: React.FC<IProductDisplay> = ({ ...cartItemDetails }) => {
  const {visibleComponent,setVisibleComponent} = useContext(DisplayContext);
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
  const wishListItems = useSelector((state:{wishList:IWishListState})=>state.wishList.wishListItems)
  const {
    productName,
    productDescription,
    brand,
    price,
    stockAvailability,
    productFeatures,
    _id, // _id is received as a string
    image,
    quantity,
    userId,
    category,
    overallRating
  } = cartItemDetails;
  // Construct the dataToSend object based on ICartItem interface
  const baseData={
productName,
    productId: _id,
    brand,
    price,
    image,
    category,
    userId,
  }
  const dataForCartItem: ICartItem = {
    ...baseData,
    quantity
  };
  const context = useContext(UserDetailsContext);
  if(!context){
    throw new Error("User Details Context is not accessible");
  }
  const {userDetails} = context;
const isAlreadyOnCart = cartItems.some((item: ICartItem) => item.productId === _id);
const isAlreadyOnWishList = wishListItems.some((item:IWishListItem)=>item.productId === _id)
  const addItemToCart = useAddItemToCart();
  const addItemsToWishList = useAddItemToWishList();
  return (
    <>
    <div className="container">
      <div className="flex-col md:flex-row flex justify-between items-center py-4 gap-4 min-h-[50vh]">
        <div className="singleProductLeft md:w-1/2 w-full">
          <h1 className="subHeading">
            {productName}
            </h1>
            <div className="overallRatingArea my-2">
             <DisplaySingleProductRating rating={overallRating}/>
            </div>
          <p className="primaryParagraph">{productDescription}</p>
          <div className="productDetails flex items-center gap-4 my-2">
            <p className="text-background bg-helper p-2 rounded-md">Brand: {brand}</p>
            <h3
              className={`text-background p-2 rounded-md ${
                stockAvailability ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {stockAvailability ? "In Stock" : "Out of Stock"}
            </h3>
            <p className="price-highlight">${price}</p>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-primaryDark">Features</h2>
          <ul className="primaryList">
            {productFeatures &&
              productFeatures.map((feature: string, index: number) => (
                <li key={index} className="text-primaryDark flex items-center gap-1">
                  <FontAwesomeIcon icon={faCaretRight} className="mr-2" />
                  <p>{feature}</p>
                </li>
              ))}
          </ul>
        </div>
        <div className="md:w-1/2  h-auto">
          <img src={image} alt={productName} className="max-w-[300px] h-auto rounded-lg" loading="lazy" />
        </div>
      </div>
      <div className="productActions flex gap-4 my-4 items-center justify-center md:justify-start">
        <PrimaryButton
  searchText="To Cart"
  onClick={() => userDetails ? addItemToCart(dataForCartItem) : setVisibleComponent('login')}
  disabled={userDetails !==null && isAlreadyOnCart}
/>
        <PrimaryButton searchText="To WishList"
        onClick={() => userDetails ? addItemsToWishList(baseData) : setVisibleComponent('login')}
  disabled={userDetails !==null && isAlreadyOnWishList}
   />
        <PrimaryButton searchText="To Others" onClick={()=>setVisibleComponent('productImage')}/>
          {visibleComponent === 'productImage' && <ProductImage {...cartItemDetails}/>}
      </div>
      {isAlreadyOnCart && (
  <SubmitSuccess message="This Item is already in the cart. You can update it from the cart page." />
)}
    {isAlreadyOnWishList && (
  <SubmitSuccess message="This Item is already in the WishList. You can add it to the cart page." />
)}
      <Toaster />
    </div>
    {visibleComponent==='login' && <LoginComponent/>}
    </>
  );
};
export default SingleProduct;
