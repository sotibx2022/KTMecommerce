export interface IAddAdminData {
    adminEmail: string,
    adminFullName: string,
    adminUserName: string,
    role?:string,
}
export interface IDisplayAdminData extends IAddAdminData{
createdAt:Date,
updatedAt:Date,
}