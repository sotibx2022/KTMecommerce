const _config = {
  connectionString: process.env.CONNECTION_STRING!,
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL!,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME!,
    apiKey: process.env.CLOUDINARY_API_KEY!,
    apiSecret: process.env.CLOUDINARY_API_SECRET!,
  },
  nextAuth:{
    nextAuthSecret:process.env.NEXTAUTH_SECRET!,
    nextAuthUrl:process.env.NEXTAUTH_URL!
  }
};
export const config = Object.freeze(_config);
