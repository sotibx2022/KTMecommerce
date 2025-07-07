import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
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
      const { payload } = await jwtVerify(rawToken, new TextEncoder().encode(JWT_SECRET));
      return payload.userId as string;
    } catch (error) {
      // Fall through to NextAuth token check
    }
  }
  try {
    const nextAuthToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    return nextAuthToken?._id as string | undefined;
  } catch (error) {
    return undefined;
  }
};