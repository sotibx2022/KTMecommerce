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
import SingleProductServerLayout from "../singleProductLayout/SingleProductServerLayout";
const SingleProduct: React.FC<IProductDisplay> = ({ ...cartItemDetails }) => {
  const {visibleComponent,setVisibleComponent} = useContext(DisplayContext);
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
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
  const dataToSend: ICartItem = {
    productName,
    productId: _id, // Ensure it's a string
    brand,
    price,
    image,
    quantity,
    category,
    userId,
  };
  // Check if the item is already in the cart
  const context = useContext(UserDetailsContext);
  if(!context){
    throw new Error("User Details Context is not accessible");
  }
  const {userDetails} = context;
const isAlreadyOnCart = cartItems.some((item: ICartItem) => item.productId === _id);
  const addItemToCart = useAddItemToCart();
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
  onClick={() => userDetails ? addItemToCart(dataToSend) : setVisibleComponent('login')}
  disabled={userDetails !==null && isAlreadyOnCart}
/>
        <PrimaryButton searchText="To WishList" />
        <PrimaryButton searchText="To Others" onClick={()=>setVisibleComponent('productImage')}/>
          {visibleComponent === 'productImage' && <ProductImage {...cartItemDetails}/>}
      </div>
      {isAlreadyOnCart && (
  <SubmitSuccess message="This Item is already in the cart. You can update it from the cart page." />
)}
      <Toaster />
    </div>
    {visibleComponent==='login' && <LoginComponent/>}
    </>
  );
};
export default SingleProduct;
