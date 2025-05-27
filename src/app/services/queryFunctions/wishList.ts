import { IWishListItem } from "@/app/types/wishlist";
import { APIResponseError, APIResponseSuccess } from "./users";
import axios from "axios";
export const updateWishListItem = async (wishListItemDetails: IWishListItem):Promise<APIResponseSuccess | APIResponseError> => {
  try {
    const response = await axios.post("/api/wishList/addToWishList", wishListItemDetails);
    return response.data;
  } catch (error: any) {
    return {message:"There is issuse with API Call function",status:400, success:false}
  }
};