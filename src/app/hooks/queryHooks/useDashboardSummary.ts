import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export const useDashboardSummary = (summaryFor: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await axios.get(`/api/admin/summary/${summaryFor}`);
            return response.data;
        },
        queryKey: [`${summaryFor}summary`]
    })
}