import { IAddAdminData } from "@/app/types/admin";
import mongoose, { Schema } from "mongoose";
const adminSchema = new Schema<IAddAdminData>({
    adminEmail: {
        type: String,
        required: true
    },
    adminFullName: {
        type: String,
        required: true
    },
    adminUserName: {
        type: String,
        required: true
    },
}, { timestamps: true })
const AdminModel = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default AdminModel