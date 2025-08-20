"use client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export const useBrands = () => {
    return useQuery({
        queryFn: async () => {
            const response = await axios.get('/api/categories/brand');
            return response.data.brandsArray
        },
        queryKey: ['brands'],
        staleTime:1*60*60*1000;
    })
}