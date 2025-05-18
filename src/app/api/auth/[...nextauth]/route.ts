import { authOptions } from "@/app/services/apiFunctions/authOptions";
import NextAuth from "next-auth";
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };