"use client"
export interface IBrand {
    brandName: string,
    brandImageUrl: string,
}
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export const useBrands = () => {
    return useQuery<IBrand[]>({
        queryFn: async () => {
            const response = await axios.get('/api/categories/brand');
            return response.data.brandsArray
        },
        queryKey: ['brands'],
        staleTime: 1 * 60 * 60 * 1000,
    })
}