import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export const useAdminUser = () => {
    return useQuery({
        queryKey: ['adminUser'],
        queryFn: async () => {
            const response = await axios.get('/api/admin/validateAdmin/adminUser');
            return response.data.adminUser
        },
        staleTime: 300000, // 5 minutes
        gcTime: 1800000,  // 30 minutes
    })
}