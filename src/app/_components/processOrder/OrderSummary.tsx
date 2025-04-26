"use client"
import { CartState } from '@/app/redux/cartSlice'
import { useSelector } from 'react-redux'
const OrderSummary = () => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems)
  const calculateTotals = () => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const totalCost = cartItems.reduce((acc, item) => acc + parseInt(item.price) * item.quantity, 0);
    const shippingPrice = totalCost > 1000 ? 0 : 50; // Example shipping cost logic
    const discount = totalCost > 200 ? totalCost * 0.1 : 0; // 10% discount for orders above $2000
    const grossTotal = totalCost - discount + shippingPrice;
    return grossTotal ;
  };
  const grossTotal  = calculateTotals();
  return (
    <div className="bg-background p-6 rounded-lg shadow-helper h-fit">
      <h2 className="text-xl font-semibold mb-4 text-primaryDark">Order Summary</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.productId} className="flex justify-between items-center border-b border-b-helper border-primaryLight pb-2">
            <div className="flex items-center space-x-3">
              <img src={item.image} alt={item.productName} className="w-12 h-12 object-cover rounded" />
              <span className="text-primaryDark">{item.productName}</span>
            </div>
            <span className="text-primaryDark">${item.price} × {item.quantity}</span>
          </div>
        ))}
         <div className="summaryLine flex justify-between items-center">
      <span className="cartSummaryTitle secondaryHeading  uppercase">Gross Total</span>
      <span className="cartSummaryData secondaryHeading price-highlight">${grossTotal.toFixed(2)}</span>
    </div>
      </div>
    </div>
  )
}
export default OrderSummary