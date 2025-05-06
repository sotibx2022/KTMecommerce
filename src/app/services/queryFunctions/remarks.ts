import axios, { AxiosError } from "axios";
import { APIResponseError, APIResponseSuccess } from "./users";
import { ApiError } from "next/dist/server/api-utils";
import { IAddReviewDatas, IDisplayReviewDatas, IUpdateRemarkAPIData } from "@/app/types/remarks";
export const postSingleProductReview =async(data:IAddReviewDatas):Promise<APIResponseSuccess|APIResponseError>=>{
try {
const response = await axios.post('/api/remarks/addRemarks',data,{
    headers:{'Content-Type':'application/json'}
})
   return response.data; 
} catch (error) {
    const axiosError = error as AxiosError<ApiError>
    if(axiosError.response){
        throw new Error(axiosError.response.data.message || "Error on Response from DB")
    }else if(axiosError.request){
        throw new Error(axiosError.request.data.message || "Error tp get Request from db.")
    }
    throw new Error ("Unknown Error Occured")
}
}
export const getSpecificRemarks = async (
    productId: string
  ): Promise<APIResponseSuccess<IDisplayReviewDatas[]>| APIResponseError> => {
    try {
      const response = await axios.get(`/api/remarks/${productId}`);
      return response.data.data;
    } catch (error) {
     throw new Error('Something wrong to get the data.')
    }
  };
  export const deleteSpecificReview = async (datasToDelete: { productId: string, userEmail: string }): Promise<APIResponseSuccess | APIResponseError> => {
    try {
      const response = await axios.post(
        `/api/remarks/${datasToDelete.productId}`,
        { action: 'delete', ...datasToDelete },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Something went wrong while deleting the specific remark");
    }
  };
  export const updateSingleProductReview = async (
    data: IUpdateRemarkAPIData  // Accept single object instead of separate params
  ): Promise<APIResponseSuccess | APIResponseError> => {
    try {
      const response = await axios.post('/api/remarks/updateRemarks', data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      return {
        message: "There is something wrong.",
        status: 500,
        success: false
      };
    }
  };
export const getSingleProductReview = async (
  userEmail: string,
  productId: string
): Promise<APIResponseSuccess<IDisplayReviewDatas> | APIResponseError> => {
  try {
    const response = await axios.get('/api/remarks/specificRemark', {
      headers: {
        'userEmail': userEmail, 
        'productId': productId   
      }
    });
    return response.data;
  } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || error.request.data.message || "Unknown Error Occured.",
        status:400
      };
  }
};