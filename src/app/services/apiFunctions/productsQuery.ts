import axios from "axios"
import { config } from "@/config/configuration"
export const SpecificProducts=async(specificProperty:string)=>{
    try {
        const response = await axios.get(`${config.websiteUrl}/api/products/specificProducts/${specificProperty}`);
        return response.data.products;
    } catch (error) {
    }
}