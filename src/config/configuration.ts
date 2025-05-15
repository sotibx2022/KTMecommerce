const _config = {
  connectionString: process.env.CONNECTION_STRING!,
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL!,
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.FIREBASE_APP_ID!,
    firebaseprojectId:process.env.FIREBASE_PROJECT_ID!,
    firebaseclientEmail:process.env.FIREBASE_CLIENT_EMAIL!,
    firebaseprivateKey:process.env.FIREBASE_ADMIN_PRIVATE_KEY!
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
};
export const config = Object.freeze(_config);
