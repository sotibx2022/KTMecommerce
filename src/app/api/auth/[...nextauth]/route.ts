import NextAuth, { Session, User,} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginAuthorize } from "@/app/services/apiFunctions/loginAuthorize";
import { JWT } from "next-auth/jwt";
const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
async authorize(credentials): Promise<User | null> {
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
}
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      session.user = {
        ...session.user,
        email: token.email || ""
      };
      return session;
    }
  },
  session: {
    strategy: "jwt" as const
  },
  secret: process.env.NEXTAUTH_SECRET
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };