import { config } from "@/config/configuration"
import axios from "axios"
export const getAllCategories = async() =>{
    const response = await axios.get(`${config.websiteUrl}/api/categories`);
    return response.data.category;
}