import { auth } from '@/config/firebaseConfig';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
interface AuthAction {
    action: string;
}
const SocialMediaAuth: React.FC<AuthAction> = ({ action }) => {
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Google user:", user);
            // Optional: Send user data to your backend
            await registerUserInBackend(user);
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };
    // Facebook Sign-In
    const handleFacebookSignIn = async () => {
        const provider = new FacebookAuthProvider();
        provider.addScope("email"); // Request email permission
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Facebook user:", user);
            await registerUserInBackend(user);
        } catch (error) {
            console.error("Facebook sign-in error:", error);
        }
    };
    // Send user data to your backend (optional)
    const registerUserInBackend = async (user: any) => {
        await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                provider: user.providerData[0].providerId,
            }),
        });
    };
    return (
        <div className="socialMediaAuth">
            <h2 className='secondaryHeading text-center my-4'>Or, {action} With</h2>
            <div className="flex justify-center items-center gap-4">
                {/* Facebook Button */}
                <button 
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-100 transition"
                    onClick={handleFacebookSignIn}
                >
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        className="text-blue-600 w-5 h-5"
                    />
                    <span className="text-blue-600 font-medium">Facebook</span>
                </button>
                {/* Google Button */}
                <button 
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-red-100 transition"
                    onClick={handleGoogleSignIn}
                >
                    <FontAwesomeIcon
                        icon={faGoogle}
                        className="text-red-500 w-5 h-5"
                    />
                    <span className="text-red-500 font-medium">Google</span>
                </button>
            </div>
        </div>
    );
};
export default SocialMediaAuth;