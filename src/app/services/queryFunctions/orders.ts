import { IOrderDetails } from "@/app/types/orders";
import { config } from "@/config/configuration";
import axios, { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { APIResponseError, APIResponseSuccess } from "./users";
export const postOrderDetails=async(orderDetails:IOrderDetails):Promise<APIResponseSuccess | APIResponseError>=>{
    try {
        const response = await axios.post(`${config.websiteUrl}/api/order`,orderDetails,{
            headers:{'Content-Type':'application/json'}
        });
        return response.data;
    } catch (error) {
     const axiosError = error as AxiosError<ApiError> 
     if(axiosError.response){
        throw new Error(axiosError.response.data.message || 'No Response from Server')
     }else if(axiosError.request){
        throw new Error(axiosError.request.data.message||'Request failed')
     }else{
        throw new Error('Unknown Error Occured.')
     }
    }
}