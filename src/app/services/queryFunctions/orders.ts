import { IOrderDetails } from "@/app/types/orders";
import axios, { AxiosError } from "axios";
import { APIResponseError, APIResponseSuccess } from "./users";
import { config } from "@/config/configuration";
import { ApiError } from "next/dist/server/api-utils";
export const postOrderDetails = async (
    orderDetails: IOrderDetails
  ): Promise<APIResponseSuccess | APIResponseError> => {
    try {
      const response = await axios.post(
        `${config.websiteUrl}/api/order`,
        orderDetails,
        { headers: { 'Content-Type': 'application/json' } }
      );
      await deleteCartItems(orderDetails.userEmail); // Add this line
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response) {
        throw new Error(axiosError.response.data.message || 'No Response from Server');
      }
      throw new Error(axiosError.message || 'Unknown Error Occurred');
    }
  };
  const deleteCartItems = async (userEmail: string) => {
    try {
      await axios.post('/api/cart/clearCart', { userEmail }); // Fixed payload format
    } catch (error) {
      throw new Error('Failed to remove cart items from database'); // Fixed typo
    }
  };