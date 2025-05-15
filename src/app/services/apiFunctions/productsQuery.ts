import axios from "axios"
export const SpecificProducts=async(specificProperty:string,page:string,limit:string)=>{
    try {
        const response = await axios.get(`/api/products/specificProducts/advanceCategories?validProperty=${specificProperty}&page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
    }
}