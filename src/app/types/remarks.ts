export interface IAddReviewsProps {
  readOnly: boolean;
  productId:string;
  edit?:boolean;
}
export interface IAddReviewDatas {
  reviewedBy:{
    fullName:string;
    email:string;
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
