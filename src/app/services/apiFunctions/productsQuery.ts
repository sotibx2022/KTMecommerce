import axios from "axios"
import { config } from "@/config/configuration"; // Import your config
export const SpecificProducts = async (specificProperty: string, page: string, limit: string) => {
    try {
        const response = await axios.get(
            `${config.websiteUrl}/api/allProducts/displayProducts/advanceCategories?${specificProperty}=true&page=${page}&limit=${limit}`
        );
        return response.data;
    } catch (error) {
        throw error; 
    }
}