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
  console.log('------ LOGIN PROCESS STARTED ------');
  console.log('Input parameters:', { email: email.replace(/./g, '*') + email.slice(-3), password: '******' }); // Mask sensitive data
  try {
    console.log('Attempting database connection...');
    await connectToDB();
    console.log('Database connection established');
    // 1. Find user by email
    console.log(`Searching for user with email: ${email}`);
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      console.warn('No user found with email:', email);
      return {
        message: "Authentication failed: No user found with this email",
        status: 401,
        success: false,
      };
    }
    console.log('User found:', { 
      id: user._id, 
      email: user.email, 
      hasPassword: !!user.password 
    });
    // 2. Verify password
    console.log('Comparing passwords...');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn('Password validation failed for user:', user._id);
      return {
        message: "Authentication failed: Invalid password",
        status: 401,
        success: false,
      };
    }
    console.log('Password validation successful');
    // 3. Return sanitized user data
    const responseData = {
      id: user._id.toString(),
      email: user.email,
      name: user.fullName || undefined,
    };
    console.log('Login successful. Returning:', responseData);
    console.log('------ LOGIN PROCESS COMPLETED SUCCESSFULLY ------');
    return {
      message: "Login successful",
      status: 200,
      success: true,
      data: responseData,
    };
  } catch (error) {
    console.error('------ LOGIN PROCESS FAILED ------');
    console.error('Error details:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    console.error('------ END OF ERROR ------');
    return {
      message: "Authentication error: Internal server error",
      status: 500,
      success: false,
    };
  }
}