import { ICartItem } from "@/app/types/cart";
export const calculateTotals = (cartItems:ICartItem[]) => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = cartItems.reduce((acc, item) => {
        const price = Number(item.price) || 0;
        return acc + price * item.quantity;
    }, 0);
    const shippingPrice = totalCost > 1000 ? 0 : 50; // Example shipping cost logic
    const discount = totalCost > 200 ? totalCost * 0.1 : 0; // 10% discount for orders above $2000
    const grossTotal = totalCost - discount + shippingPrice;
    return {totalItems,totalCost,shippingPrice,discount, grossTotal} ;
  };