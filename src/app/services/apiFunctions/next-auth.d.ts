// types/next-auth.d.ts (or just next-auth.d.ts if in root or under types/)
import NextAuth from "next-auth";
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
  interface User {
    id: string;
    roles?: string[];
  }
}
