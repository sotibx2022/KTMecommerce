import axios from "axios";
import { config } from "@/config/configuration"; // Import your config
export const getAllCategories = async() =>{
    const response = await axios.get(`${config.websiteUrl}/api/categories`);
    return response.data.category;
}