import { IUser } from "@/app/types/user";
import { config } from "@/config/configuration";
import axios from "axios";
interface APIResponse {
    message: string;
    success: boolean;
    status: number;
    userDetails?: IUser;
}
export const getUserDetails = async (): Promise<IUser | null> => {
    try {
        const response = await axios.get<APIResponse>(`${config.websiteUrl}/api/userId`); // Use GET if the API is designed for GET
        if (response.data.success) {
            return response.data.userDetails || null; // Safely return userDetails or null
        }
        return null; // Return null if success is false
    } catch (error) {
        console.error("Error during API call:", error);
        return null; // Return null in case of an error
    }
};
