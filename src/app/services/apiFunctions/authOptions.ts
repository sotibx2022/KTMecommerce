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
        try {
          // Validate credentials
          if (!credentials?.email || !credentials?.password) {
            throw new Error(JSON.stringify({
              message: "Email and password are required",
            }));
          }
          const result = await loginAuthorize(credentials.email, credentials.password);
          if (!result.success || !result.data) {
            throw new Error(JSON.stringify({
              message: result.message,
            }));
          }
          return {
            id: result.data.id.toString(),
            email: result.data.email,
          };
        } catch (error) {
          throw error;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        email: token.email || ""
      };
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};