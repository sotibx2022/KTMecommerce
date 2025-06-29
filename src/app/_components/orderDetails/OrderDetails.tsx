"use client"
import { OrderDetailsProps } from '@/app/types/orders';
import { format } from 'date-fns';
import CartTableSummary from '../cartTableSummary/CartTableSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faFilePdf, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import CartSummary from '../cartSummary/CartSummary';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf'; 
const OrderDetails: React.FC<{ order: OrderDetailsProps,nonExpandable?:boolean }> = ({ order,nonExpandable }) => {
const downloadPdf = async (name: string) => {
  if (typeof document !== "undefined") {
    try {
      const element: HTMLElement | null = document.getElementById('orderDetailsContainer');
      if (!element) return;
      // Convert HTML to PNG
      const dataUrl = await toPng(element, { quality: 1 }); // Highest quality
      // PDF setup (A4 dimensions in mm)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width (210mm)
      const pageHeight = 297; // A4 height (297mm)
      // Calculate image height (maintain aspect ratio)
      const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth;
      // Add image to PDF (split across pages if too tall)
      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
      // Add new pages for overflow content
      while (heightLeft > pageHeight) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`Order # ${name} Details.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
};
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const {
    _id,
    status,
    items,
    paymentMethod,
    shippingAddress,
    shippingPerson,
    createdAt,
  } = order;
  return (
    <div className="max-w-4xl p-4 md:p-6 bg-background rounded-lg shadow-helper mb-6"
    id='orderDetailsContainer'>
      {/* Order Header - Responsive */}
      <div className="mb-4 md:mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primaryDark">
            Order # {_id!.slice(-8).toUpperCase()}
          </h2>
          {!nonExpandable && <FontAwesomeIcon
            icon={showOrderDetails ? faMinus : faPlus}
            className="bg-helper p-2 md:p-3 rounded-full cursor-pointer text-background text-sm md:text-base"
            onClick={() => setShowOrderDetails(!showOrderDetails)}
          />}
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs sm:text-sm md:text-base text-primaryLight">
            {format(new Date(createdAt!), 'MMM dd, yyyy')}
          </p>
          <span className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold 
            ${status === 'ordered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {status}
          </span>
        </div>
      </div>
      {/* Order Details - Responsive */}
      {showOrderDetails || nonExpandable && (
        <div className="orderDetails space-y-6">
          {/* Shipping Info - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="md:border-r md:border-helper md:pr-6">
              <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-primaryDark">
                Shipping Details
              </h3>
              <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                <p className="text-primaryLight">
                  {shippingPerson.firstName} {shippingPerson.lastName}
                </p>
                <p className="text-primaryLight">{shippingPerson.email}</p>
                <p className="text-primaryLight">{shippingPerson.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-primaryDark">
                Shipping Address
              </h3>
              <div className="space-y-1 md:space-y-2 text-sm md:text-base">
                <p className="text-primaryLight">{shippingAddress.street}</p>
                <p className="text-primaryLight">
                  {shippingAddress.city}, {shippingAddress.state}
                </p>
              </div>
            </div>
          </div>
          {/* Order Items - Responsive Table */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primaryDark">
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <CartTableSummary items={items} />
            </div>
          </div>
          {/* Order Summary - Responsive */}
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primaryDark">
              Order Summary
            </h3>
            <CartSummary items={items} />
          </div>
          {/* Payment Method - Responsive Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-helper pt-4 md:pt-6 gap-2">
            <div className="text-sm md:text-base">
              <p className="font-semibold text-primaryDark">Payment Method:</p>
              <p className="capitalize text-primaryLight">
                {paymentMethod.replace('paymentOn', '')}
              </p>
            </div>
            <button 
              className="text-red-600 hover:text-red-800 transition-colors"
              aria-label="Download PDF"
              onClick={()=>downloadPdf(_id!.slice(-8).toUpperCase())}
            >
              <FontAwesomeIcon
                icon={faFilePdf}
                className="text-xl md:text-2xl"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default OrderDetails;