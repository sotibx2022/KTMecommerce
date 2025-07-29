import { Types } from "mongoose";
export interface ISliderItem {
    sliderImage?: Blob,
    sliderTitle: string,
    sliderSlogan: string,
}
export interface ISliderItemDB{
    sliderImage?: string,
    sliderTitle: string,
    sliderSlogan: string,
}
export interface IDisplaySlideItems extends ISliderItemDB{
_id:Types.ObjectId
}