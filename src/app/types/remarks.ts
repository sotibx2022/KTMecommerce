import { Types } from "mongoose";
export interface IProductIdentifier {
  productId: string;
  productName: string;
  productImage: string;
}
export interface IRemarksBase {
  productIdentifier: IProductIdentifier,
  reviewedBy: {
    userId: string;
    fullName: string;
    email?:string;
  };
  reviewDescription: string;
  rating: string;
  reviewerImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  readOnly?: boolean;
}
export interface IRemarksBaseForDB 
  extends Omit<IRemarksBase, 'productIdentifier' | 'reviewedBy'> {
  productIdentifier: {
    productId: Types.ObjectId;  // Override with ObjectId
    productName: string;
    productImage: string;
  };
  reviewedBy: {
    userId: Types.ObjectId;     // Override with ObjectId
    fullName: string;
    email?: string;
  };
}
