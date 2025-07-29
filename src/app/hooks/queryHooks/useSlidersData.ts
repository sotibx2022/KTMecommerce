import { useQuery } from "@tanstack/react-query";
import axios from "axios";
export const useSlidersData = () => {
    return useQuery({
        queryKey: ['slidersData'],
        queryFn: async () => {
            const response = await axios.get('/api/sliders');
            return response.data.data;
        }
    })
}
