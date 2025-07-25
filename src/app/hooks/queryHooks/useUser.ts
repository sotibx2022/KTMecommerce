// hooks/useUser.ts
import { getUserDetails } from '@/app/services/helperFunctions/getUserDetails';
import { useQuery } from '@tanstack/react-query';
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUserDetails,
    staleTime: 300000, // 5 minutes
    gcTime: 1800000,  // 30 minutes
  });
};