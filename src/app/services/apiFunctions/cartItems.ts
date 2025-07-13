import { config } from "@/config/configuration";
import axios from "axios";
import { APIResponseError, APIResponseSuccess } from "../queryFunctions/users";
import { ICartItem } from "@/app/types/cart";
import { IWishListItem, IWishListItemDisplay } from "@/app/types/wishlist";
export const fetchCartFromDatabase = async ():Promise<APIResponseSuccess<ICartItem[]>|APIResponseError> => {
    try {
      const response = await axios.get(`/api/cart/cartItems`);
      return response.data;
    } catch (error) {
      return {
        message:"Axios Error to fetch cart Items",
        success:false,
        status:400,
      }
    }
  };
  export const fetchWishListFromDashboard = async ():Promise<APIResponseSuccess<IWishListItemDisplay[]>|APIResponseError> => {
    try {
      const response = await axios.get(`/api/wishList/wishListItems`);
      return response.data.data;
    } catch (error) {
      return {
        message:"Axios Error to fetch cart Items",
        success:false,
        status:400,
      }
    }
  };