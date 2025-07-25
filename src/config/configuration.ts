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
    nextAuthUrl:process.env.NEXTAUTH_URL!,
    faceBookClientId:process.env.FACEBOOK_CLIENT_ID!,
    faceBookClientSecret:process.env.FACEBOOK_CLIENT_SECRET!,
    googleClientId:process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret:process.env.GOOGLE_CLIENT_SECRET!
  },
  stripe:{
    stripeSecretKey:process.env.STRIPE_SECRET_KEY!,
    stripePublishableKey:process.env.STRIPE_PUBLISHABLE_KEY!
  },
  cookieSecret:process.env.NEXTJS_COOKIE_SECRET!,
  tokenSecret:process.env.TOKENSECRET!
};
export const config = Object.freeze(_config);
