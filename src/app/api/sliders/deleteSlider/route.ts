import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { deleteCloudinaryImage, getPublicId } from "@/app/services/helperFunctions/uploadImageHelpers";
import { connectToDB } from "@/config/db";
import { SliderModel } from "@/models/sliders.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const authorizationResponse = await checkAdminAuthorization(req);
    const { message, success, status } = authorizationResponse;
    if (!success) {
      return NextResponse.json({ message: message, success: success, status: status || 400 })
    }
        await connectToDB();
        // Extract sliderId from headers
        const sliderId = req.headers.get('sliderId');
        if (!sliderId) {
            return NextResponse.json(
                { message: "Slider ID is required in headers" },
                { status: 400 }
            );
        }
        // Find existing slider
        const existingSlider = await SliderModel.findById(sliderId);
        if (!existingSlider) {
            return NextResponse.json(
                { message: "Slider not found" },
                { status: 404 }
            );
        }
        // Delete Cloudinary image if exists
        if (existingSlider.sliderImage) {
            const imagePublicId = getPublicId(existingSlider.sliderImage);
            if (imagePublicId) {
                await deleteCloudinaryImage(imagePublicId);
            }
        }
        // Delete from database
        await existingSlider.deleteOne();
        return NextResponse.json(
            { 
                message: "Slider deleted successfully",
                success: true 
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { 
                message: "Error deleting slider",
                error: error.message,
                success: false 
            },
            { status: 500 }
        );
    }
}