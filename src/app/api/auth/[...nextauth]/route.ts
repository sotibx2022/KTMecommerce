declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string;
      roles?: string[];
    };
  }
  interface JWT {
    _id?: string;
    email?: string;
    provider?: string;
  }
}
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import type { NextAuthOptions } from "next-auth";
import UserModel from "@/models/users.model";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // You can add custom logic here if needed
      return true;
    },
    async session({ session, token }) {
      if (session.user && token._id) {
        session.user.id = token._id as string;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        let dbUser = await UserModel.findOne({ email: user.email });
        if (!dbUser) {
          dbUser = await UserModel.create({
            fullName: user.name,
            email: user.email,
            profileImage: user.image,
          });
          await dbUser.save();
        }
        // Assign user info to token
        token.email = dbUser.email;
        token._id = dbUser._id.toString(); // MongoDB ObjectId as string
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
