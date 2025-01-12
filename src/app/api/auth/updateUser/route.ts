import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    console.log("Received request to update user profile.");
    // Handling form data with fallbacks to empty strings
    const formData = await req.formData();
    const fullName = (formData.get('fullName') as string) || '';
    const email = (formData.get('email') as string) || '';
    const fullAddress = (formData.get('fullAddress') as string) || '';
    const phoneNumber = (formData.get('phoneNumber') as string) || '';
    const file = formData.get('profileFile') as unknown as File;
    const fileName = formData.get('ProfileFileOriginalName') as string || "";
    const fileSize = formData.get('profileFileSize') as string || "";
    const fileType = formData.get('profileFileType') as string || "";
    console.log("Form data received:", { fullName, email, fullAddress, phoneNumber, file,fileName,fileSize,fileType });
    if (!file) {
      console.log("No file found in the request.");
      return NextResponse.json({
        message: "Profile image is required.",
        success: false,
        status: 400,
      });
    }
    // Check if the user exists
    console.log("Checking if user exists with email:", email);
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      return NextResponse.json({
        message: "There is no user found with the provided email.",
        success: false,
        status: 401,
      });
    }
    console.log("User details from database are",user.fullName, user.address,user.phoneNumber,user.profileFileSize,user.profileFileType,user.ProfileFileOriginalName);
    console.log("user details at the API point are",fullName,fullAddress,phoneNumber,fileName,fileSize,fileType)
    // Check if user details are the same, no need to update
    if (
      user.fullName === fullName &&
      user.address === fullAddress &&
      user.phoneNumber === phoneNumber &&
      user.ProfileFileOriginalName === fileName &&
      user.profileFileSize === fileSize &&
      user.profileFileType === fileType
    ) {
      console.log("No changes detected in user details.");
      return NextResponse.json({
        message: "There is nothing to update.",
        success: false,
        status: 400,
      });
    }
    console.log("User found:", user);
    // File upload handling
    const type = file.type;
    console.log("File type detected:", type);
    const { message, status, success, profileUrl } = await uploadImage(file, "profileImages", type, fullName);
    if (!success) {
      console.log("File upload failed. Response:", { message, status, success });
      return NextResponse.json({
        message: "There was an issue uploading the profile image.",
        status,
        success,
      });
    }
    console.log("File uploaded successfully. Profile URL:", profileUrl);
    // Updating user information in the database
    console.log("Connecting to the database...");
    await connectToDB();
    console.log("Database connection established.");
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        fullName,
        email,
        address: fullAddress,
        phoneNumber,
        profileImage: profileUrl,
        accountStatus: "customer",
      },
      { new: true } // Ensure the updated document is returned
    );
    console.log("User updated successfully:", updatedUser);
    const response = NextResponse.json({
      message: "User updated successfully.",
      success: true,
      status: 200,
    });
    return response;
  } catch (error) {
    console.error("Error occurred during request processing:", error);
    return NextResponse.json({
      message: "An error occurred while processing the request.",
      success: false,
      status: 500,
    });
  }
}
