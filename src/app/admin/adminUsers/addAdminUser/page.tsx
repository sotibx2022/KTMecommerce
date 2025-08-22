"use client"
import { validateEmail, validateFullName } from '@/app/services/helperFunctions/validatorFunctions'
import { Button } from '@/components/ui/button'
import { AlertCircle, Plus } from 'lucide-react'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import SubmitError from '@/app/_components/submit/SubmitError'
import { IAddAdminData, IDisplayAdminData } from '@/app/types/admin'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users'
import toast from 'react-hot-toast'
import LoadingComponent from '@/app/_components/loadingComponent/LoadingComponent'
import { ThemeProviderContext } from '@/app/context/ThemeProvider'
const Page = () => {
  const themeContext = useContext(ThemeProviderContext);
  if (!themeContext) {
    throw new Error("Context is not available here")
  }
  const { theme } = themeContext;
  const { register, formState: { errors }, handleSubmit, reset } = useForm<IAddAdminData>({ mode: 'onBlur' })
  const queryClient = useQueryClient();
  const userNameRegexValue = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
  const addAdminMutate = useMutation({
    mutationFn: async (data: IAddAdminData) => {
      const resposne = await axios.post('/api/admin/addAdmin', { ...data });
      return resposne.data;
    },
    onSuccess: async (response: APIResponseSuccess<IDisplayAdminData> | APIResponseError) => {
      if (response.success) {
        toast.success(response.message)
        await queryClient.refetchQueries({ queryKey: ['allAdmins'] })
        reset()
      } else {
        toast.error(response.message)
        reset()
      }
    },
    onError: (error) => {
      toast.error(error.message)
      reset()
    }
  })
  const onSubmit = (data: IAddAdminData) => {
    addAdminMutate.mutate(data);
  }
  return (
    <form className='flex flex-col md:flex flex-wrap shadow-primaryLight p-4 gap-4' onSubmit={handleSubmit(onSubmit)}>
      {addAdminMutate.isPending && <LoadingComponent />}
      <h2 className={`${theme === 'dark' ? 'text-background' : 'text-primaryDark'} secondaryHeading`}>Add Admin</h2>
      <div className="">
        <label className="formLabel">Admin Email</label>
        <input type='text' placeholder='Enter Email of admin user' className='formItem'
          {...register("adminEmail", {
            validate: (value) => validateEmail("Admin Email", value)
          })} />
        {errors.adminEmail?.message && <SubmitError message={errors.adminEmail.message} />}
      </div>
      <div className="">
        <label className="formLabel">Admin Full Name</label>
        <input type='text' placeholder='Enter FullName of Admin user' className='formItem'
          {...register("adminFullName",
            { validate: (value) => validateFullName("Admin Full Name", value, 5, 20) }
          )} />
        {errors.adminFullName?.message && <SubmitError message={errors.adminFullName.message} />}
      </div>
      <div className="">
        <label className="formLabel">Admin User Name</label>
        <input type='text' placeholder='Enter User Name for Admin' className='formItem'
          {...register("adminUserName", {
            validate: (value: string) => {
              const regex = new RegExp(userNameRegexValue)
              const isUserNameValid = regex.test(value);
              return isUserNameValid || "User Name is not valid.";
            }
          })} />
        {errors.adminUserName?.message && <SubmitError message={errors.adminUserName.message} />}
        <div className="inputInfo text-primaryLight my-2">
          <AlertCircle className="w-6 h-6 text-helper mr-1 inline-flex" />
          The Admin UserName must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be a minimum of 6 characters long.
        </div>
      </div>
      <Button
        variant="success"
        size="default"
        className="gap-2"
        aria-label="Add Admin"
      >
        <Plus className="h-4 w-4" />
        <span className="hidden sm:flex">Add Admin</span>
      </Button>
    </form>
  )
}
export default Page