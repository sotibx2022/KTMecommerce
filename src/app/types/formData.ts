export interface RegisterData {
    fullName:string,
    email: string; // Corrected: Changed `email` to `string`
    phoneNumber: string; // Corrected: Changed `Number` to `number`
    password: string;
    confirmPassword: string;
  }
  export interface LoginData{
    email:string,
    password:string,
  }
export interface IUpdateUserData{
  fullName:string,
  email: string; // Corrected: Changed `email` to `string`
  phoneNumber: string; // Corrected: Changed `Number` to `number`
  password: string;
  confirmPassword: string;
  fullAddress:string;
  profileFile:File;
  profileFileOriginalName:string;
  profileFileSize:number;
  profileFileType:string;
  profileUrl?:string
}