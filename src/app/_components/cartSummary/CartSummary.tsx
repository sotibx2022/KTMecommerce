import React from 'react';
import PrimaryButton from '../primaryButton/PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { CartState } from '@/app/redux/cartSlice';
import { useRouter } from 'next/navigation';
import { calculateTotals } from '@/app/services/helperFunctions/cartFunctions';
import { IOrderItem } from '@/app/types/orders';
import { Rupee } from '../productCard/Rupee';
interface ICartSummary {
  order?: boolean;
  items?: IOrderItem[];
}
const CartSummary: React.FC<ICartSummary> = ({ order, items }) => {
  const { cartItems, isInitialized } = useSelector(
    (state: { cart: CartState }) => state.cart
  );
  const datatoRender = items || cartItems;
  const router = useRouter();
  const handleOrderProducts = () => {
    router.push(`/dashboard/cartProcess`);
  };
  // Calculate totals or fallback if not initialized
  const { totalItems, totalCost, discount, shippingPrice, grossTotal } =
    !isInitialized && !items
      ? {
          totalItems: 0,
          totalCost: 0,
          discount: 0,
          shippingPrice: 0,
          grossTotal: 0,
        }
      : calculateTotals(datatoRender);
  // Helper function to display values with loading state
  const displayValue = (value: number, isCurrency = false) => {
    if (!items && !isInitialized) return "Loading...";
    return isCurrency ? <Rupee price={value} /> : value.toString();
  };
  return (
    <div className="CartSummary flex flex-col gap-2 my-5 max-w-[500px]">
      {datatoRender === cartItems && isInitialized && (
        <h2 className="subHeading">Cart Summary</h2>
      )}
      <div className="summaryLine flex justify-between items-center border-b-2 border-dotted border-helper">
        <span className="cartSummaryTitle secondaryHeading">
          <FontAwesomeIcon icon={faSquareCheck} className="mr-2" />
          Total Items
        </span>
        <span className="cartSummaryData secondaryHeading">
          {displayValue(totalItems)}
        </span>
      </div>
      <div className="summaryLine flex justify-between items-center border-b-2 border-dotted border-helper">
        <span className="cartSummaryTitle secondaryHeading">
          <FontAwesomeIcon icon={faSquareCheck} className="mr-2" />
          Total Cost
        </span>
        <span className="cartSummaryData secondaryHeading">
          {displayValue(totalCost, true)}
        </span>
      </div>
      <div className="summaryLine flex justify-between items-center border-b-2 border-dotted border-helper">
        <div className="cartSummaryTitle">
          <p className="secondaryHeading">
            <FontAwesomeIcon icon={faSquareCheck} className="mr-2" />
            Discount
          </p>
          {datatoRender === cartItems && isInitialized && (
            <span className="primaryParagraph italic text-green-500">
              10% off above <Rupee price="2000"/>
            </span>
          )}
        </div>
        <span className="cartSummaryData secondaryHeading">
          {displayValue(discount, true)}
        </span>
      </div>
      <div className="summaryLine flex justify-between items-center border-b-2 border-dotted border-helper">
        <div className="cartSummaryTitle">
          <p className="secondaryHeading">
            <FontAwesomeIcon icon={faSquareCheck} className="mr-2" />
            Shipping Price
          </p>
          {datatoRender === cartItems && isInitialized && (
            <span className="primaryParagraph italic text-green-500">
              Free shipping over <Rupee price={'10000'}/>
            </span>
          )}
        </div>
        <span className="cartSummaryData secondaryHeading">
          {displayValue(shippingPrice, true)}
        </span>
      </div>
      <div className="summaryLine flex justify-between items-center">
        <span className="cartSummaryTitle secondaryHeading uppercase">
          Gross Total
        </span>
        <span className="cartSummaryData secondaryHeading price-highlight">
          {displayValue(grossTotal, true)}
        </span>
      </div>
      {order && isInitialized && (
        <PrimaryButton searchText="Order" onClick={handleOrderProducts} />
      )}
    </div>
  );
};
export default CartSummary;
