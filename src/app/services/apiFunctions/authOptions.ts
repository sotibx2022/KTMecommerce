import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAuthorize } from "@/app/services/apiFunctions/loginAuthorize";
import { config } from "@/config/configuration";
import { registerOrFetchUser } from "./registerOrFetchUser";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: config.nextAuth.googleClientId,
      clientSecret: config.nextAuth.googleClientSecret,
    }),
    FacebookProvider({
      clientId: config.nextAuth.faceBookClientId,
      clientSecret: config.nextAuth.faceBookClientSecret,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(
            JSON.stringify({ message: "Email and password are required" })
          );
        }
        const result = await loginAuthorize(credentials.email, credentials.password);
        if (!result.success || !result.data) {
          throw new Error(
            JSON.stringify({ message: result.message || "Login failed" })
          );
        }
        return {
          id: result.data.id.toString(),
          email: result.data.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if ((account?.provider === "google" || account?.provider === "facebook") && user) {
      const dbUser = await registerOrFetchUser(user);
      token.id = dbUser._id.toString();
      token.email = dbUser.email;
    }
      if (account?.provider === "credentials" && user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email || "",
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
