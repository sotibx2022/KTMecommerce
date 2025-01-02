import { auth } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
const loginUser = async (email: string, password: string): Promise<{ message: string; success: boolean; status: number }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user; // You can use this for further operations
    return { message: "Login Successful", success: true, status: 200 };
  } catch (error: any) { // `any` is used to allow access to `error.message`
    return { message: error.message || "Login Failed", success: false, status: 400 };
  }
};
export default loginUser;
