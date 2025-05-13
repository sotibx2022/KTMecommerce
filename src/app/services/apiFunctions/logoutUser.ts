import { config } from "@/config/configuration";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { APIResponseError, APIResponseSuccess } from "../queryFunctions/users";
export const logoutUser = async (): Promise<APIResponseSuccess | APIResponseError> => {
  const response = await axios.get(`/api/auth/logoutUser`);
  return response.data;
};
