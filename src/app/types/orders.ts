export interface IShippingPerson {
    firstName: string;
    lastName: string;
    email: string;
    phone: string
}
export interface IShippingAddress {
    street: string,
    city: string,
    state: string,
}
export interface IProductDetailsforOrder {
    productId: string,
    productName: string,
    image: string,
    price: string,
    quantity: number,
    wishersId: string,
}
export type TOrderStatus = "" | "ordered" | "pending" | "confirmed" | "delivered" | "cancelled" | "Paid" | "Unpaid";
export type TPaymentMethod = "online" | "paymentOnDelivery";
export interface IOrderDetails {
    _id?: string,
    userId: string
    items: IProductDetailsforOrder[],
    status: TOrderStatus
    paymentMethod: TPaymentMethod
    shippingAddress: IShippingAddress
    shippingPerson: IShippingPerson
    termsAgreed?: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    orderSummary: { totalItems: number, totalCost: number, discount: number, shippingPrice: number, grossTotal: number }
}
export interface OrderDetailsProps extends IOrderDetails {
    _id?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IOrderItem {
    quantity: number;
    productId: string;
    price: string;
    image: string;
    productName: string;
    wishersId: string,
}