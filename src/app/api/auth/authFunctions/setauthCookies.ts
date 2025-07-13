// src/utils/cookies.ts
import { NextResponse } from "next/server";
import { IUser } from "@/app/types/user";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.NEXTJS_COOKIE_SECRET!;
export const setAuthCookies = (user: IUser, response: NextResponse): NextResponse => {
  const token = jwt.sign(
    { userId: user._id.toString() },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  response.cookies.set({
    name: "userToken",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60,
    sameSite: "strict",
    path: "/",
  });
  return response;
};
