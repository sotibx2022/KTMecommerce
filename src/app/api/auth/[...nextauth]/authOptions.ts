import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import UserModel from "@/models/users.model";
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
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
        token.email = dbUser.email;
        token._id = dbUser._id.toString();
      }
      if (account?.provider) {
        token.provider = account.provider;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
  secret: process.env.NEXTAUTH_SECRET,
};
