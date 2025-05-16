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
  error?: string;
}
export async function loginAuthorize(
  email: string,
  password: string
): Promise<LoginResponse> {
  try {
    // 1. Find user by email
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      return {
        message: "Authentication failed",
        status: 401,
        success: false,
        error: "No user found with this email",
      };
    }
    // 2. Verify password (corrected parameter order)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        message: "Authentication failed",
        status: 401,
        success: false,
        error: "Invalid password",
      };
    }
    // 3. Return sanitized user data (never return password hashes)
    return {
      message: "Login successful",
      status: 200,
      success: true,
      data: {
        id: user._id.toString(),
        email: user.email,
        name: user.fullName || undefined,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      message: "Authentication error",
      status: 500,
      success: false,
      error: "Internal server error",
    };
  }
}