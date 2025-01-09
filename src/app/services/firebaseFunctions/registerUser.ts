import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../../config/firebaseConfig"
import toast from 'react-hot-toast';
const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user; // Optionally return the user object
  } catch (error) {
    toast.error("User already registerd with provided Email")
  }
};
export default registerUser;