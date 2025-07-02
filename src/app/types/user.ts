export interface RegisterUserInput {
  email: string;
  password:string;
}
interface IPasswordHistory{
  password:string;
  createdAt:Date;
}
export interface IUser {
  _id:Object;
    fullName?: string;
    email: string;
    password?:string;
    passwordHistory?:IPasswordHistory[];
    phoneNumber?: string;
    isAdmin?: boolean; // Optional field
    accountStatus?: string; // Optional field, e.g., "Registered", "Customer"
    address?: string; // Optional field for user address,
    profileImage?: string; // Optional field for profile image URL
    profileFileOriginalName?:string;
  profileFileSize?:string;
  profileFileType?:string;
    roles?: string; // Optional field, default 'user'
    createdAt?: Date | string; // Optional field for the user creation date
    updatedAt?: Date | string; // Optional field for the user last updated date
  }