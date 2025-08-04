import { connectToDB } from "@/config/db";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AdminModel from "@/models/admin.model";
interface AuthResult {
    message: string;
    success: boolean;
    status?: number; // Optional status if needed
}
export const checkAdminAuthorization = async (request: NextRequest): Promise<AuthResult> => {
    try {
        await connectToDB();
        const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET;
        if (!JWT_SECRET) {
            return {
                message: "JWT secret is not configured",
                success: false,
                status: 500
            };
        }
        const cookie = request.cookies.get('adminDetails')?.value;
        if (!cookie) {
            return {
                message: "Admin cookie not found",
                success: false,
                status: 401
            };
        }
        const decoded = jwt.verify(cookie, JWT_SECRET) as JwtPayload;
        const adminUser = await AdminModel.findOne({ adminUserName: decoded.userName });
        if (!adminUser) {
            return {
                message: "Admin not found",
                success: false,
                status: 404
            };
        }
        if (adminUser.roles === 'readOnly') {
            return {
                message: "ReadOnly Admin can only view data",
                success: false,
                status: 403
            };
        }
        return {
            message: "Admin is authorized",
            success: true,
            status: 200
        };
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            return {
                message: "Invalid token",
                success: false,
                status: 401
            };
        }
        return {
            message: "Internal server error",
            success: false,
            status: 500
        };
    }
};