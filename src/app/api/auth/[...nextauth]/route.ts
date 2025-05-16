import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAuthorize } from "@/app/services/apiFunctions/loginAuthorize";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
    };
  }
  interface User {
    id: string;
    email: string;
  }
  interface JWT {
    id: string;
    email: string;
  }
}
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const result = await loginAuthorize(credentials.email, credentials.password);
        if (!result.success || !result.data) return null;
        return {
          id: result.data.id,
          email: result.data.email
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string
      };
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
});