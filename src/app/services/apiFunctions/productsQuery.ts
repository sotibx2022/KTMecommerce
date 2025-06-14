import axios from "axios"
export const SpecificProducts=async(specificProperty:string,page:string,limit:string)=>{
    try {
        const response = await axios.get(`/api/allProducts/displayProducts/advanceCategories?${specificProperty}=true&page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
    }
}