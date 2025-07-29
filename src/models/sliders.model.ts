import { ISliderItemDB } from "@/app/types/sliders";
import mongoose, { Schema, model, Document } from "mongoose";
interface ISliderItemDocument extends ISliderItemDB, Document { }
const sliderSchema = new Schema<ISliderItemDocument>({
    sliderImage: String,
    sliderTitle: String,
    sliderSlogan: String
}, { timestamps: true });
export const SliderModel = mongoose.models.Slider || mongoose.model<ISliderItemDocument>("Slider", sliderSchema);