import axios from "axios"
export const getAllCategories = async() =>{
    const response = await axios.get(`/api/categories`);
    return response.data.category;
}