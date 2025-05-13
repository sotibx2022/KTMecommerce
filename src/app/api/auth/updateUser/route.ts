import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import UserModel from "@/models/users.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const fullName = (formData.get('fullName') as string) || '';
    const email = (formData.get('email') as string) || '';
    const fullAddress = (formData.get('fullAddress') as string) || '';
    const phoneNumber = (formData.get('phoneNumber') as string) || '';
    const file = formData.get('profileFile') as unknown as File;
    const fileName = formData.get('ProfileFileOriginalName') as string || "";
    const fileSize = formData.get('profileFileSize') as string || "";
    const fileType = formData.get('profileFileType') as string || "";
    if (!file) {
      return NextResponse.json({
        message: "Profile image is required.",
        success: false,
        status: 400,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "There is no user found with the provided email.",
        success: false,
        status: 401,
      });
    }
    if (
      user.fullName === fullName &&
      user.address === fullAddress &&
      user.phoneNumber === phoneNumber &&
      user.profileFileOriginalName === fileName &&
      user.profileFileSize === fileSize &&
      user.profileFileType === fileType
    ) {
      return NextResponse.json({
        message: "There is nothing to update.",
        success: false,
        status: 400,
      });
    }
    // File upload handling
    const type = file.type;
    const { message, status, success, profileUrl } = await uploadImage(file, "profileImages", type, fullName);
    if (!success) {
      return NextResponse.json({
        message: "There was an issue uploading the profile image.",
        status,
        success,
      });
    }
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      {
        fullName,
        email,
        address: fullAddress,
        phoneNumber,
        profileImage: profileUrl,
        accountStatus: "customer",
        profileFileOriginalName:fileName,
        profileFileSize:fileSize,
        profileFileType:fileType
      },
      { new: true } // Ensure the updated document is returned
    );
    const response = NextResponse.json({
      message: "User updated successfully.",
      success: true,
      status: 200,
      data:updatedUser,
    });
    return response;
  } catch (error) {
    return NextResponse.json({
      message: "An error occurred while processing the request.",
      success: false,
      status: 500,
    });
  }
}
