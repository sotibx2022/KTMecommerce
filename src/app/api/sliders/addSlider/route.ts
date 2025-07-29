import { uploadImage } from "@/app/services/helperFunctions/uploadImage";
import { SliderModel } from "@/models/sliders.model";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const sliderImage = formData.get('sliderImage') as Blob | null;
    const sliderTitle = formData.get('sliderTitle') as string | null;
    const sliderSlogan = formData.get('sliderSlogan') as string | null;
    if (!sliderImage || !sliderTitle || !sliderSlogan) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
        status: 400  
      });
    }
    const uploadResult = await uploadImage(
      sliderImage,
      "sliders",
      sliderImage.type,
      sliderTitle
    );
    if (!uploadResult.success || !uploadResult.profileUrl) {
      return NextResponse.json({
        success: false,
        message: uploadResult.message || "Image upload failed",
        status: uploadResult.status || 500  
      });
    }
    const newSlider = new SliderModel({
      sliderImage: uploadResult.profileUrl,
      sliderTitle,
      sliderSlogan
    });
    await newSlider.save();
    return NextResponse.json({
      success: true,
      message: "Slider created successfully",
      status: 201,  
    });
  } catch (error) {
    console.error("Error creating slider:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500 
    });
  }
}