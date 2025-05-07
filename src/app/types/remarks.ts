export interface IProductIdentifier{
  productId:string;
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
    email:string;
    userEmail?:string;
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
  userEmail:string,
  reviewDescription:string,
  productIdentifier:IProductIdentifier,
}
