import axios, { AxiosError } from "axios";
import { APIResponseError, APIResponseSuccess } from "./users";
import { ApiError } from "next/dist/server/api-utils";
import { IAddReviewDatas, IDisplayReviewDatas, IUpdateRemarkAPIData } from "@/app/types/remarks";
export const postSingleProductReview = async (
  data: IAddReviewDatas
): Promise<APIResponseSuccess | APIResponseError> => {
  try {
    const response = await axios.post('/api/remarks/addRemarks', data, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      throw new Error(
        axiosError.response.data.message || "Error on Response from DB"
      );
    } else if (axiosError.request) {
      throw new Error(
        "Error to get Request from DB. The request was made but no response was received"
      );
    }
    throw new Error("Unknown Error Occurred during request setup");
  }
};
export const getSpecificRemarks = async (
    productId: string
  ): Promise<APIResponseSuccess<IDisplayReviewDatas[]>| APIResponseError> => {
    try {
      const response = await axios.get(`/api/remarks/${productId}`);
      return response.data;
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
  export const getSpecificReviewofProductbyUser = async (
    userEmail: string, productId: string 
  ): Promise<APIResponseSuccess<IDisplayReviewDatas> | APIResponseError> => {
    try {
      const response = await axios.get('/api/remarks/specificRemark', {
        headers: {  
          productId,
          userEmail
        }
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<APIResponseError>;
      if (axiosError.response) {
        return {
          message: axiosError.response.data.message || "Failed to fetch review",
          success: false,
          status: axiosError.response.status
        };
      }
      return {
        message: "Network error occurred",
        success: false,
        status: 500
      };
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
  export const getSpecificRemarksofUser = async (
    userEmail: string
  ): Promise<APIResponseSuccess<IDisplayReviewDatas[]> | APIResponseError> => {
    try {
      const response = await axios.get('/api/remarks/specificUserRemarks', {
        headers: { userEmail }
      });
      if (!response.data.success) {
        return {
          message: "Failed to fetch remarks data",
          success: false,
          status: response.status || 400
        };
      }
      return response.data;
    } catch (error) {
      return {
        message: "There was an error while fetching data",
        success: false,
        status: (error as any)?.response?.status || 500
      };
    }
  };
