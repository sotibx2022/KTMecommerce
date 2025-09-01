import { checkAdminAuthorization } from "@/app/services/apiFunctions/checkAdminAuthorization";
import { validateAdmin } from "@/app/services/apiFunctions/validateAdmin";
import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import { getPublicId } from "@/app/services/helperFunctions/uploadImageHelpers";
import { connectToDB } from "@/config/db";
import { SliderModel } from "@/models/sliders.model";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    try {
        await validateAdmin(req);
        await connectToDB();
        const url = new URL(req.url);
        const pathSegments = url.pathname.split("/");
        const sliderId = pathSegments.pop();
        if (!sliderId) {
            return NextResponse.json(
                { message: "Slider ID is required" },
                { status: 400 }
            );
        }
        const existingSlider = await SliderModel.findById(sliderId);
        if (!existingSlider) {
            return NextResponse.json(
                { message: "Slider not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(
            {
                message: "Slider item retrieved successfully",
                data: existingSlider,
                success: true
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Error fetching slider",
                error: error.message,
                success: false
            },
            { status: 500 }
        );
    }
}
export async function POST(req: NextRequest) {
    try {
        const authorizationResponse = await checkAdminAuthorization(req);
    const { message, success, status } = authorizationResponse;
    if (!success) {
      return NextResponse.json({ message: message, success: success, status: status || 400 })
    }
        await connectToDB();
        // Extract sliderId from URL
        const url = new URL(req.url);
        const pathSegments = url.pathname.split("/");
        const sliderId = pathSegments.pop();
        if (!sliderId) {
            return NextResponse.json(
                { message: "Slider ID is required" },
                { status: 400 }
            );
        }
        // Parse form data
        const formData = await req.formData();
        const sliderTitle = formData.get('sliderTitle') as string;
        const sliderSlogan = formData.get('sliderSlogan') as string;
        const sliderImage = formData.get('sliderImage') as File;
        const existingSlider = await SliderModel.findById(sliderId);
        if (!existingSlider) {
            return NextResponse.json(
                { message: "Slider not found" },
                { status: 404 }
            );
        }
        // Update slider fields
        existingSlider.sliderTitle = sliderTitle;
        existingSlider.sliderSlogan = sliderSlogan;
        const publicId = getPublicId(existingSlider.sliderImage) as string;
        // Handle image upload if provided
        if (sliderImage && sliderImage.size > 0) {
            const uploadResult = await uploadImage(
                sliderImage,
                "sliders",
                sliderImage.type,
                sliderTitle,
                publicId
            );
            existingSlider.sliderImage = uploadResult.profileUrl;
        }
        // Save changes
        await existingSlider.save();
        return NextResponse.json(
            {
                message: "Slider updated successfully",
                data: existingSlider,
                success: true
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            {
                message: "Error updating slider",
                error: error.message,
                success: false
            },
            { status: 500 }
        );
    }
}