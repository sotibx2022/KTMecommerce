import axios from "axios"
export const SpecificProducts=async(specificProperty:string)=>{
    try {
        const response = await axios.get(`/api/products/specificProducts/${specificProperty}`);
        return response.data.products;
    } catch (error) {
    }
}