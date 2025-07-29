import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IDisplaySlideItems } from "@/app/types/sliders";
import { slidesData } from "@/app/data/slidesData";
export const useSlidersData = () => {
    return useQuery({
        queryKey: ['slidersData'],
        queryFn: async () => {
            const response = await axios.get('/api/sliders');
            return response.data.data;
        },
    });
}
