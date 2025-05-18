import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAuthorize } from "@/app/services/apiFunctions/loginAuthorize";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('\n------ AUTHORIZE FUNCTION STARTED ------');
        console.log('Received credentials:', {
          email: credentials?.email ? credentials.email.replace(/.(?=.{3})/g, '*') : 'none',
          password: credentials?.password ? '******' : 'none'
        });
        try {
          // Validate credentials
          if (!credentials?.email || !credentials?.password) {
            console.error('Validation failed: Missing credentials');
            throw new Error(JSON.stringify({
              message: "Email and password are required",
            }));
          }
          console.log('Calling loginAuthorize service...');
          const result = await loginAuthorize(credentials.email, credentials.password);
          console.log('loginAuthorize response:', {
            success: result.success,
            message: result.message,
            data: result.data ? { 
              id: result.data.id, 
              email: result.data.email 
            } : null
          });
          if (!result.success || !result.data) {
            console.error('Authorization failed:', result.message);
            throw new Error(JSON.stringify({
              message: result.message,
            }));
          }
          console.log('Authorization successful. Returning user:', {
            id: result.data.id,
            email: result.data.email
          });
          console.log('------ AUTHORIZE FUNCTION COMPLETED ------');
          return {
            id: result.data.id.toString(),
            email: result.data.email,
          };
        } catch (error) {
          console.error('------ AUTHORIZE FUNCTION ERROR ------');
          console.error('Error:', error instanceof Error ? error.message : error);
          if (error instanceof Error && error.stack) {
            console.error('Stack trace:', error.stack);
          }
          console.error('------ END OF ERROR ------');
          throw error; // Re-throw to maintain NextAuth error handling
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log('\n------ JWT CALLBACK TRIGGERED ------');
      console.log('Initial token:', token);
      if (user) {
        console.log('User exists, updating token with user data:', user);
        token.id = user.id;
        token.email = user.email;
      }
      console.log('Returning token:', token);
      console.log('------ JWT CALLBACK COMPLETED ------');
      return token;
    },
    async session({ session, token }) {
      console.log('\n------ SESSION CALLBACK TRIGGERED ------');
      console.log('Initial session:', session);
      console.log('Received token:', token);
      session.user = {
        ...session.user,
        email: token.email || ""
      };
      console.log('Modified session:', session);
      console.log('------ SESSION CALLBACK COMPLETED ------');
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development' // Enable NextAuth debug mode in development
};