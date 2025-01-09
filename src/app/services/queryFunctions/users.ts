import { LoginData } from "@/app/types/formData";
import axios from "axios";
// Interfaces for API Response
export interface APIResponseSuccess {
  message: string; // A descriptive success message
  status: number;  // HTTP status code (e.g., 200, 201)
  success: true;   // Indicates the operation was successful
}
export interface APIResponseError {
  message: string; // A descriptive error message
  status: number;  // HTTP status code (e.g., 400, 404, 500)
  success: false;  // Indicates the operation failed
}
// Input Interface for Mutation
export interface ICreateUserMutaion {
  fullName: string;
  email: string;
  phoneNumber: string;
  firebaseId: string;
}
// Function with Generic Type
export const createUserMutation = async (
  userData: ICreateUserMutaion
): Promise<APIResponseSuccess | APIResponseError> => {
  try {
    const response = await axios.post("/api/auth/registerUser", userData);
    return response.data as APIResponseSuccess; // Explicitly cast to success type
  } catch (error) {
    // Check if the error is an Axios error
    if (axios.isAxiosError(error) && error.response) {
      return {
        message: error.response.data.message || "An error occurred",
        success: false,
        status: error.response.status || 500,
      };
    } else {
      // Handle unexpected errors
      return {
        message: "Unexpected error occurred",
        success: false,
        status: 500,
      };
    }
  }
};
export const loginUserMutation = async (
  loginData: LoginData
): Promise<APIResponseSuccess | APIResponseError> => {
  try {
    const response = await axios.post<APIResponseSuccess>("/api/auth/loginUser", loginData);
    return response.data;
  } catch (error: any) {
    // Handle axios errors
    if (axios.isAxiosError(error) && error.response?.data) {
      return error.response.data as APIResponseError;
    }
    return { message: "Unexpected error occurred.", status: 400, success: false };
  }
};