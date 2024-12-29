import { config } from "@/config/configuration"
import axios from "axios"
export const getAllCategories = async() =>{
    const response = await axios.get(`http://localhost:3000/api/categories`);
    return response.data.category;
}