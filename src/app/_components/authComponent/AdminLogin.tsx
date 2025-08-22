"use client";
import React from "react";
import {
  Info,
  Package,
  SlidersHorizontal,
  FileText,
  UserCog,
  Bell,
  StickyNote,
  ShoppingCart,
  Boxes,
  ListTree,
  Heart,
} from "lucide-react";
import Divider from "./Divider";
import PrimaryButton from "../primaryButton/PrimaryButton";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import {
  APIResponseError,
  APIResponseSuccess,
} from "@/app/services/queryFunctions/users";
import { useForm } from "react-hook-form";
import FormInput from "../submit/formInput/FormInput";
const crudItems = [
  { label: "Products", icon: Package },
  { label: "Sliders", icon: SlidersHorizontal },
  { label: "Blogs", icon: FileText },
  { label: "Users", icon: UserCog },
];
const reportItems = [
  { label: "Notifications", icon: Bell },
  { label: "Remarks", icon: StickyNote },
  { label: "Orders", icon: ShoppingCart },
  { label: "Products", icon: Package },
  { label: "Carts", icon: ShoppingCart },
  { label: "Wishlists", icon: Heart },
  { label: "Categories", icon: Boxes },
  { label: "Subcategories", icon: ListTree },
];
interface IValidateAdminData {
  adminUserName: string;
}
const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IValidateAdminData>();
  const validateAdminMutation = useMutation<
    APIResponseSuccess | APIResponseError,
    AxiosError,
    IValidateAdminData
  >({
    mutationFn: async (data) => {
      const response = await axios.post("/api/admin/validateAdmin", data);
      return response.data;
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        if (typeof window !== "undefined") {
          window.location.href = "/admin";
        }
      } else {
        toast.error(response.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit = (data: IValidateAdminData) => {
    validateAdminMutation.mutate(data);
  };
  return (
    <div className="flex flex-col gap-2 max-w-[800px]">
      {validateAdminMutation.isPending && <LoadingComponent />}
      {/* ✅ Using FormInput with react-hook-form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          icon={Info}
          label="Enter User ID or contact admin."
          id="adminUserName"
          type="text"
          placeholder="Enter Your UserId"
          register={register}
          rules={{
            validate: (value: string) =>
              value?.length > 3 || "User ID must be at least 4 characters",
          }}
          error={errors.adminUserName?.message}
          required
        />
        <PrimaryButton searchText="Login" />
      </form>
      {/* ✅ Demo Info */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-green-800 mt-4">
        <Info className="w-5 h-5 text-green-600" />
        <div>
          <span className="font-medium">Demo Account:</span>{" "}
          <span className="font-mono bg-green-100 px-2 py-1 rounded text-green-700">
            Demo4Ktm@2026
          </span>
        </div>
      </div>
      {/* ✅ Capabilities */}
      <Divider text="Admin Capabilities" />
      <div>
        <h3 className="text-primaryDark">CRUD Operations:</h3>
        <ul className="list-none grid sm:grid-cols-1 md:grid-cols-2 gap-2 text-sm ml-1">
          {crudItems.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="inline-flex items-center px-4 py-2 gap-2 text-sm text-background bg-primaryLight rounded-xl shadow-sm"
            >
              <Icon className="w-4 h-4 text-background" />
              {label}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-primaryDark">Reports:</h3>
        <ul className="list-none grid sm:grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {reportItems.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="inline-flex items-center px-4 py-2 gap-2 text-sm text-background bg-primaryLight rounded-xl shadow-sm"
            >
              <Icon className="w-4 h-4 text-background" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AdminLogin;
