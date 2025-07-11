import { Types } from "mongoose";
export interface IProductIdentifier{
  productId:Types.ObjectId;
  productName:string;
  productImage:string;
}
export interface IAddReviewsProps {
  productIdentifier:IProductIdentifier,
  readOnly: boolean;  
}
export interface IAddReviewDatas {
  reviewedBy:{
    fullName:string;
    userId:Types.ObjectId;
  }
  reviewDescription:string;
  productIdentifier:IProductIdentifier,
  rating:string;
  reviewerImage?:string;
}
export interface IDisplayReviewDatas extends IAddReviewDatas{
  createdAt:Date;
  updatedAt?:Date;
}
export interface IUpdateRemarkAPIData{
  rating:string,
  userId?:string,
  reviewDescription:string,
  productIdentifier:IProductIdentifier,
}
