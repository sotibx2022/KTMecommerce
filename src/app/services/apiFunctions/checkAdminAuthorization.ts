import { connectToDB } from "@/config/db";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AdminModel from "@/models/admin.model";
export const checkAdminAuthorization = async (request: NextRequest): Promise<void> => {
  try {
    await connectToDB();
    const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT secret is not configured");
    }
    const cookie = request.cookies.get('adminDetails')?.value;
    if (!cookie) {
      throw new Error("Admin cookie not found");
    }
    const decoded = jwt.verify(cookie, JWT_SECRET) as JwtPayload;
    const adminUser = await AdminModel.findOne({ adminUserName: decoded.userName });
    if (!adminUser) {
      throw new Error("Admin not found");
    }
    if (adminUser.roles === 'readOnly') {
      throw new Error("ReadOnly Admin can only view data");
    }
    // Success case: return nothing (undefined) to allow caller to proceed
    return;
  } catch (error: any) {
    throw new Error("Internal server error");
  }
};