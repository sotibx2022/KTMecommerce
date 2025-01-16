"use client";
import React from "react";
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
const SingleProduct: React.FC<IProductDisplay> = ({ ...cartItemDetails }) => {
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
  const isAlreadyOnCart = cartItems.some((item: ICartItem) => item.productId === _id);
  const addItemToCart = useAddItemToCart();
  return (
    <div className="container">
      <div className="flex-col md:flex-row flex justify-between items-center py-4 gap-4 min-h-[50vh]">
        <div className="singleProductLeft w-1/2">
          <h1 className="subHeading">{productName}</h1>
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
          <h2 className="primaryHeading">Features</h2>
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
        <div className="w-1/2">
          <img src={image} alt={productName} className="max-w-full rounded-lg" />
        </div>
      </div>
      <div className="productActions flex gap-4 my-4">
        <PrimaryButton
          searchText="To Cart"
          onClick={() => addItemToCart(dataToSend)} // Send dataToSend with relevant properties
          disabled={isAlreadyOnCart} // Disable button if the item is already in the cart
        />
        <PrimaryButton searchText="To WishList" />
        <PrimaryButton searchText="To Others" />
      </div>
      {isAlreadyOnCart && (
  <SubmitSuccess message="This Item is already in the cart. You can update it from the cart page." />
)}
      <Toaster />
    </div>
  );
};
export default SingleProduct;
