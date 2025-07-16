import { config } from "@/config/configuration";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { WishListModel } from "@/models/wishList.model";
import UserModel from "@/models/users.model";
import { connectToDB } from "@/config/db";
export async function GET(req: NextRequest) {
    try {
        connectToDB()
        const url = new URL(req.url);
        const token = url.pathname.split("/").pop();
        if (!token) {
            return NextResponse.json(
                { message: "Token is required", success: false },
                { status: 400 }
            );
        }
        // Verify token with proper type casting
        const { userId } = jwt.verify(token, config.tokenSecret) as JwtPayload;
        const [wishListItems, userDetails] = await Promise.all([
            WishListModel.find({ userId }).select('productName image'),
            UserModel.findById(userId).select('fullName profileImage')
        ]);
        const wishlistDetails = wishListItems.map((wishlistItem, index) => ({
            url: wishlistItem.image,
            alt: wishlistItem.productName
        }));
        const message =
            wishListItems.length === 0
                ? `Your wishlist is empty, ${userDetails?.fullName || 'user'}! Start adding items you love.`
                : `${wishListItems.length} Wishlist Item${wishListItems.length !== 1 ? 's' : ''} for ${userDetails?.fullName || 'user'}`;
        return NextResponse.json({
            message: message,
            success: true,
            data: {
                count: wishListItems.length,
                userName: userDetails?.fullName,
                profileImage: userDetails?.profileImage,
                wishlistDetails: wishlistDetails
            }
        }, { status: 200 });
    } catch (error) {
        console.error("Error in GET wishlist:", error);
        if (error instanceof jwt.JsonWebTokenError) {
            return NextResponse.json(
                { message: "Invalid token", success: false },
                { status: 401 }
            );
        }
        return NextResponse.json(
            { message: "Internal server error", success: false },
            { status: 500 }
        );
    }
}