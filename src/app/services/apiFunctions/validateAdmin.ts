import { connectToDB } from "@/config/db";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AdminModel from "@/models/admin.model";
export const validateAdmin = async (request: NextRequest): Promise<void> => {
  try {
    await connectToDB();
    const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET;
    if (!JWT_SECRET) {
      const error = new Error("JWT secret is not configured");
      throw error;
    }
    const cookie = request.cookies.get('adminDetails')?.value;
    if (!cookie) {
      const error = new Error("Admin cookie not found");
      throw error;
    }
    const decoded = jwt.verify(cookie, JWT_SECRET) as JwtPayload;
    const adminUser = await AdminModel.findOne({ adminUserName: decoded.userName });
    if (!adminUser) {
      const error = new Error("Admin not found");
      throw error;
    }
    // Success case: return nothing (undefined) to allow caller to proceed
    return;
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      const authError = new Error("Invalid token");
      throw authError;
    }
    // Rethrow error if it already has status and success, or throw new error
    if (error.status && error.success === false) {
      throw error;
    }
    const internalError = new Error("Internal server error");
    throw internalError;
  }
};