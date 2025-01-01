// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// Directly write Firebase configuration here
const firebaseConfig = {
  apiKey: "AIzaSyBXsN29EmAh_b6PhyaO0-P1Y13jXmaZqJ8",
  authDomain: "ktmecommerce-f5d04.firebaseapp.com",
  projectId: "ktmecommerce-f5d04",
  storageBucket: "ktmecommerce-f5d04.firebasestorage.app",
  messagingSenderId: "393872513950",
  appId: "1:393872513950:web:4f95544304fd5c007ad48f",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
