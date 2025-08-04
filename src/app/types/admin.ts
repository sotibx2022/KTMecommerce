export interface IAddAdminData {
    adminEmail: string,
    adminFullName: string,
    adminUserName: string,
    roles?:string,
}
export interface IDisplayAdminData extends IAddAdminData{
createdAt:Date,
updatedAt:Date,
}