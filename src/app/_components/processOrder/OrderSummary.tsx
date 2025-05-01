"use client"
import { CartState } from '@/app/redux/cartSlice'
import { calculateTotals } from '@/app/services/helperFunctions/cartFunctions'
import { IOrderItem } from '@/app/types/orders';
import { useSelector } from 'react-redux'
interface OrderSummaryProps {
  items?: IOrderItem[]; // Make items prop optional
}
const OrderSummary = ({ items }: OrderSummaryProps) => {
  const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems)
  const dataToRender = items || cartItems;
  const {grossTotal}  = calculateTotals(cartItems);
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