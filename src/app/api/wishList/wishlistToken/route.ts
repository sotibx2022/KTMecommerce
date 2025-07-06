import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromCookies } from "../../auth/authFunctions/getUserIdFromCookies";
import jwt from 'jsonwebtoken';
export async function GET(req: NextRequest) {
    try {
        console.log(process.env.TOKENSECRET)
        const userId = await getUserIdFromCookies(req);
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
        const wishlistToken = jwt.sign(
            {
                userId:userId,
            },
            process.env.TOKENSECRET!,
            { expiresIn: '7d' }
        );
        return NextResponse.json(
            {
                success: true,
                data: wishlistToken
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("[WISHLIST_TOKEN_ERROR]", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}