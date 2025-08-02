export interface RegisterData {
    email: string; 
    password: string;
    confirmPassword: string;
  }
  export interface LoginData{
    loginEmail:string,
    loginPassword:string,
  }
export interface IUpdateUserData{
  fullName:string,
  email: string; 
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileFile:File;
  profileFileOriginalName:string;
  profileFileSize:number;
  profileFileType:string;
  profileUrl?:string
}