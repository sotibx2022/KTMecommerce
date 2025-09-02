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
  console.log("Raw token from cookies:", rawToken);
  if (rawToken) {
    try {
      const { payload } = await jwtVerify(rawToken, new TextEncoder().encode(JWT_SECRET));
      console.log("JWT verified successfully. Payload:", payload);
      return payload.userId as string;
    } catch (error) {
      console.log("Failed to verify JWT from cookies:", error);
      // Fall through to NextAuth token check
    }
  } else {
    console.log("No userToken cookie found, checking NextAuth token...");
  }
  try {
    const nextAuthToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    console.log("NextAuth token retrieved:", nextAuthToken);
    return nextAuthToken?._id as string | undefined;
  } catch (error) {
    console.log("Failed to retrieve NextAuth token:", error);
    return undefined;
  }
};
