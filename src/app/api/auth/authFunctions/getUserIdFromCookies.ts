import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
interface JwtPayload {
  userId: string;
}
const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET!;
export const getUserIdFromCookies = async (
  req: NextRequest
): Promise<string | undefined> => {
  const rawToken = req.cookies.get("userToken")?.value;
  if (rawToken) {
    try {
      const decoded = jwt.verify(rawToken, JWT_SECRET) as JwtPayload;
      return decoded.userId;
    } catch {
      return undefined;
    }
  }
  const nextAuthToken = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  return nextAuthToken?._id as string | undefined;
};
