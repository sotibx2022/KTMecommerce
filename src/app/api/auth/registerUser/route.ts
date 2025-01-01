import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const { fullName, email, phoneNumber,firebaseId }: { fullName: string; email: string; phoneNumber: string,firebaseId:string } = await request.json();
        // Validate required fields
        if (!fullName || !email || !phoneNumber || !firebaseId) {
            return NextResponse.json({
                status: 400,
                message: "All fields are required",
                success: false
            });
        }
        // Check if user already exists
        const savedUser = await UserModel.findOne({ email });
        if (savedUser) {
            return NextResponse.json({
                status: 409, // Conflict
                message: "User already registered with the provided email",
                success: false
            });
        }
        // Create and save the new user
        const newUser = new UserModel({ fullName, email, phoneNumber,firebaseId });
        await newUser.save();
        return NextResponse.json({
            status: 201, // Created
            message: "User registered successfully",
            success: true,
            newUser
        });
    } catch (error) {
        return NextResponse.json({
            status: 500, // Internal Server Error
            message: "An error occurred while processing your request",
            success: false
        });
    }
}
