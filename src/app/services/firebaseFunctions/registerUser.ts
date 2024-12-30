import { createUserWithEmailAndPassword } from 'firebase/auth';
import {auth} from "../../../config/firebaseConfig"
const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user; // Optionally return the user object
  } catch (error) {
    console.error('Error registering user:', error);
  }
};
export default registerUser;