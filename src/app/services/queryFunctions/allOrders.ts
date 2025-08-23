import axios, { AxiosError } from "axios"
import { APIResponseError, APIResponseSuccess } from "./users";
import { IOrderDetails } from "@/app/types/orders";
interface OrdersResult{
    data:IOrderDetails[],
    pagination:{
        currentPage: number,
        pageSize: number,
        totalOrders: number,
        totalPages: number
    }
}
export const fetchAllOrders = async (
    queryString: string
): Promise<APIResponseSuccess<OrdersResult> | APIResponseError> => {
    try {
        const response = await axios.get(queryString ? queryString : '/api/allOrders');
        return response.data;
    } catch (error) {
        return { message: "There is Axios Error Happened", success: false, status: 400 };
    }
};
