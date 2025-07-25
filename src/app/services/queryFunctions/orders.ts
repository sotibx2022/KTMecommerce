import { IOrderDetails } from "@/app/types/orders";
import axios, { AxiosError } from "axios";
import { APIResponseError, APIResponseSuccess } from "./users";
import { config } from "@/config/configuration";
import { ApiError } from "next/dist/server/api-utils";
export const postOrderDetails = async (
  orderDetails: IOrderDetails
): Promise<APIResponseSuccess | APIResponseError> => {
  let postUrl;
  if (orderDetails.paymentMethod === 'online') {
    postUrl = "/api/payment/createCheckOutSession"
  } else {
    postUrl = '/api/order'
  }
  try {
    const response = await axios.post(
      postUrl,
      orderDetails,
      {
        headers: { 'Content-Type': 'application/json' },
        validateStatus: (status) => status < 600
      }
    );
    await deleteCartItems(orderDetails.userId); // Add this line
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      throw new Error(axiosError.response.data.message || 'No Response from Server');
    }
    throw new Error(axiosError.message || 'Unknown Error Occurred');
  }
};
export const fetchAllOrders = async (userId: string) => {
  try {
    const response = await axios.post('/api/ordersHistory', { userId }, {
      headers: { 'Content-Type': 'application/json' }
    })
    return response.data.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>
    if (axiosError.response) {
      throw new Error(axiosError.response.data.message || "Axios Error Occured on Response")
    } else if (axiosError.request) {
      throw new Error(axiosError.request.data.message || 'Axios Error Occured on Request')
    }
    throw new Error(axiosError.message || 'Unknown Error Occured')
  }
}
const deleteCartItems = async (userId: string) => {
  try {
    await axios.post('/api/cart/clearCart', { userId }); // Fixed payload format
  } catch (error) {
    throw new Error('Failed to remove cart items from database'); // Fixed typo
  }
};