import axios, { AxiosError } from "axios"
import { APIResponseError, APIResponseSuccess } from "./users";
import { IOrderDetails } from "@/app/types/orders";
export const fetchAllOrders = async (
    queryString: string
): Promise<APIResponseSuccess<IOrderDetails[]> | APIResponseError> => {
    try {
        const response = await axios.get(queryString ? queryString : '/api/allOrders');
        return response.data;
    } catch (error) {
        return { message: "There is Axios Error Happened", success: false, status: 400 };
    }
};
