import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAuthorize } from "@/app/services/apiFunctions/loginAuthorize";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
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
        token.exp = Math.floor(Date.now() / 1000) + 1 * 60 * 60;
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
    strategy: "jwt",
    maxAge:1*60*60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
};

function GoogleProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers/index").Provider {
  throw new Error("Function not implemented.");
}
function FacebookProvider(arg0: { clientId: string; clientSecret: string; }): import("next-auth/providers/index").Provider {
  throw new Error("Function not implemented.");
}

