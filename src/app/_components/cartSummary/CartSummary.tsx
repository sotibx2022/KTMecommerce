import React from 'react'
import PrimaryButton from '../primaryButton/PrimaryButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { CartState } from '@/app/redux/cartSlice';
import { useRouter } from 'next/navigation';
import { config } from '@/config/configuration';
import { calculateTotals } from '@/app/services/helperFunctions/cartFunctions';
import { IOrderItem } from '@/app/types/orders';
interface ICartSummary{
  order?:boolean
  items?:IOrderItem[]
}
const CartSummary:React.FC<ICartSummary> = ({order,items}) => {
    const cartItems = useSelector((state: { cart: CartState }) => state.cart.cartItems);
    const datatoRender = items || cartItems
    const router = useRouter()
    const handleOrderProducts =() =>{
router.push(`${config.websiteUrl}/dashboard/cartProcess`)
    }
      const { totalItems, totalCost, discount, shippingPrice, grossTotal } = calculateTotals(datatoRender);
  return (
    <div className="CartSummary flex flex-col gap-2 my-5 max-w-[500px]">
    {datatoRender === cartItems && <h2 className="subHeading">Cart Summary</h2>}
    <div className="summaryLine flex justify-between items-center border-b-2 border-dotted border-helper">
      <span className="cartSummaryTitle secondaryHeading"> <FontAwesomeIcon icon={faSquareCheck} className="mr-2"/>Total Items</span>
      <span className="cartSummaryData secondaryHeading">{totalItems}</span>
    </div>
    <div className="summaryLine flex justify-between items-center border-b-2 border-dotted border-helper">
      <span className="cartSummaryTitle secondaryHeading"> <FontAwesomeIcon icon={faSquareCheck} className="mr-2"/>Total Cost</span>
      <span className="cartSummaryData secondaryHeading">${totalCost.toFixed(2)}</span>
    </div>
    <div className="summaryLine flex justify-between items-center border-b-2 border-dotted border-helper">
      <div className="cartSummaryTitle">
        <p className="secondaryHeading"> <FontAwesomeIcon icon={faSquareCheck} className="mr-2"/>Discount</p>
        {datatoRender === cartItems && <span className="primaryParagraph italic text-green-500">10% off above $200</span>}
      </div>
      <span className="cartSummaryData secondaryHeading">${discount.toFixed(2)}</span>
    </div>
    <div className="summaryLine flex justify-between items-center border-b-2 border-dotted border-helper">
      <div className="cartSummaryTitle">
       <p className="secondaryHeading secondaryHeading"> <FontAwesomeIcon icon={faSquareCheck} className="mr-2"/>Shipping Price</p> 
       {datatoRender === cartItems && <span className="primaryParagraph italic text-green-500">Free shipping over $1000</span>}
      </div>
      <span className="cartSummaryData secondaryHeading">${shippingPrice.toFixed(2)}</span>
    </div>
    <div className="summaryLine flex justify-between items-center">
      <span className="cartSummaryTitle secondaryHeading  uppercase">Gross Total</span>
      <span className="cartSummaryData secondaryHeading price-highlight">${grossTotal.toFixed(2)}</span>
    </div>
   {order && <PrimaryButton searchText="Order" onClick={handleOrderProducts}/>}
  </div>
  )
}
export default CartSummary