import { ICartItem } from "./cart";
import { IProductCreate } from "./products";
import { IUser } from "./user";
export interface IShippingPerson{
    firstName:string;
    lastName:string;
    email:string;
    phone:string
}
export interface IShippingAddress{
    street:string,
    city:string,
    state:string,
}
export interface ICardDetails{
    cardHolderName:string,
        cardNumber:string,
        cardExpiry:string,
        cvvNumber:string,
}
export interface IProductDetailsforOrder{
    productId:string,
    quantity:number,
}
export interface IOrderDetails {
    userEmail: string
    items:IProductDetailsforOrder[],
    status: "ordered" | "pending"| "confirmed" | "delivered" | "cancelled"
    paymentMethod: "paymentOnDelivery" | "online"
    shippingAddress: IShippingAddress
    shippingPerson:IShippingPerson
    cardDetails?:ICardDetails
}