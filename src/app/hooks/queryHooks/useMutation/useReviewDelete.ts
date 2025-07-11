import { DisplayContext } from "@/app/context/DisplayComponents";
import { deleteSpecificReview } from "@/app/services/queryFunctions/remarks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
const useReviewDelete = (userId: string, productId: string) => {
    const queryClient = useQueryClient();
    const { setVisibleComponent } = useContext(DisplayContext);
    return useMutation({
        mutationFn: deleteSpecificReview,
        onSuccess: async (response) => {
            toast.success(response.message);
            setVisibleComponent('');
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['specificUserRemarks', userId],refetchType:'active' }),
                queryClient.invalidateQueries({ queryKey: ['specificRemarks', productId],refetchType:'active' }),
                queryClient.invalidateQueries({ queryKey: ['specificProduct', productId],refetchType:'active' })
            ]);
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
};
export default useReviewDelete;