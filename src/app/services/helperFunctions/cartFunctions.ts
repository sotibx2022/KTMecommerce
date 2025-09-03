import { ICartItem } from "@/app/types/cart";
import { IOrderItem } from "@/app/types/orders";
export const calculateTotals = (cartItems:IOrderItem[]) => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = cartItems.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        return acc + price * item.quantity;
    }, 0);
    const shippingPrice = totalCost > 10000 ? 0 : 500; // Example shipping cost logic
    const discount = totalCost > 2000 ? totalCost * 0.1 : 0; // 10% discount for orders above $2000
    const grossTotal = totalCost - discount + shippingPrice;
    return {totalItems,totalCost,shippingPrice,discount, grossTotal} ;
  };