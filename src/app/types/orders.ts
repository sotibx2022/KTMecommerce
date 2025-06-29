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
        productName:string,
        image:string,
        price:string,
        quantity:number,
    }
    export interface IOrderDetails {
        _id?:string,
        userEmail: string
        items:IProductDetailsforOrder[],
        status: "ordered" | "pending"| "confirmed" | "delivered" | "cancelled"
        paymentMethod: "paymentOnDelivery" | "online"
        shippingAddress: IShippingAddress
        shippingPerson:IShippingPerson
        cardDetails?:ICardDetails
        termsAgreed?:boolean,
        createdAt?:Date,
        updatedAt?:Date,
        orderSummary:{totalItems:number, totalCost:number, discount:number, shippingPrice:number, grossTotal:number}
    }
    export interface OrderDetailsProps extends IOrderDetails {
        _id: string;
        createdAt: Date;
        updatedAt: Date;
      }
      export interface IOrderItem {
        quantity: number;
        productId: string;
        price:string;
        image:string;
        productName:string;
      }