import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import bcrypt from "bcryptjs";
interface LoginResponse {
  message: string;
  status: number;
  success: boolean;
  data?: {
    id: string;
    email: string;
    name?: string;
  };
}
export async function loginAuthorize(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    await connectToDB();
    // 1. Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return {
        message: "Authentication failed: No user found with this email",
        status: 401,
        success: false,
      };
    }
    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        message: "Authentication failed: Invalid password",
        status: 401,
        success: false,
      };
    }
    // 3. Return sanitized user data
    const responseData = {
      id: user._id.toString(),
      email: user.email,
      name: user.fullName || undefined,
    };
    return {
      message: "Login successful",
      status: 200,
      success: true,
      data: responseData,
    };
  } catch (error) {
    return {
      message: "Authentication error: Internal server error",
      status: 500,
      success: false,
    };
  }
}