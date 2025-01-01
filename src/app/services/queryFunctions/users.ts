import { IUser } from "@/app/types/user";
import axios from "axios"
interface CreateUserMutaion{
    fullName:string,
    email:string,
    phoneNumber:string,
    firebaseId:string,
}
export const createUserMutaion = async(userData:CreateUserMutaion):Promise<{message:string,status:number, success:boolean,newUser?:IUser}> =>{
const response = await axios.post("/api/auth/registerUser");
return response.data
}