import { config } from "@/config/configuration";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface APIResponse{
    message:string;
    success:boolean,
    status:number,
}
export const logoutUser = async():Promise<APIResponse> =>{
    const response = await axios.get(`/api/auth/logoutUser`);
    return response.data
  }
  const useLogout = () => {
    const router = useRouter()
    const mutation = useMutation({
      mutationFn: logoutUser, // Function to log out the user
      onSuccess: (response) => {
        toast.success(response.message); // Show success toast on successful logout
        window.location.reload()
      },
      onError: (error) => {
        toast.error(error.message); // Show error toast if the logout fails
      },
    });
    return mutation; // Return the mutation object for use in components
  };
  export default useLogout;