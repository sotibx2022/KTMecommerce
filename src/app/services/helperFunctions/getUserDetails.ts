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
        const response = await axios.get<APIResponse>(`${config.websiteUrl}/api/userId`);
        if (response.data.success) {
            return response.data.userDetails || null;
        }
        return null;
    } catch (error) {
        console.error("Error during API call:", error);
        return null;
    }
};
