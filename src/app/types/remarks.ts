export interface IAddReviewsProps {
  readOnly: boolean;
  productId:string;
}
export interface IUpdateReviewsProps{
  productId:string
}
export interface IAddReviewDatas {
  reviewedBy:{
    fullName:string;
    email:string;
    userEmail?:string;
  }
  reviewDescription:string;
  productId: string;
  rating:string;
  reviewerImage?:string;
}
export interface IDisplayReviewDatas extends IAddReviewDatas{
  createdAt?:Date;
  updatedAt:Date;
}
export interface IUpdateRemarkAPIData{
  rating:string,
  productId:string,
  userEmail:string,
  reviewDescription:string,
}
