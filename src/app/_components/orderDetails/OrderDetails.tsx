"use client";
import { useState } from 'react';
import { OrderDetailsProps } from '@/app/types/orders';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { OrderHeader } from './OrderHeader';
import { OrderFooter } from './OrderFooter';
import CartTableSummary from '../cartTableSummary/CartTableSummary';
import CartSummary from '../cartSummary/CartSummary';
import { ShippingInfo } from './OrderShippingInfo';
export const OrderDetails = ({ order, expandAble = false }: { order: OrderDetailsProps, expandAble?: boolean }) => {
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const { _id, status, items, paymentMethod, shippingAddress, shippingPerson, createdAt } = order;
  const downloadPdf = async (name: string) => {
  if (typeof document !== "undefined") {
    try {
      const element = document.getElementById('orderDetailsContainer');
      if (!element) return;
      // 1. Temporarily override styles for PDF (14px font, A4-optimized width)
      const originalStyles = element.getAttribute('style');
      element.style.width = '210mm'; // Match A4 width (210mm)
      element.style.fontSize = '14px'; // Standard print size
      element.style.padding = '10mm'; // Add margins
      // 2. Convert to PNG with high DPI (300 DPI for print quality)
      const dataUrl = await toPng(element, { 
        quality: 1,
        pixelRatio: 3, // 3x resolution (e.g., 288 DPI)
      });
      // 3. Restore original styles
      if (originalStyles) {
        element.setAttribute('style', originalStyles);
      } else {
        element.removeAttribute('style');
      }
      // 4. Generate PDF (A4 portrait)
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // A4 width - margins (210mm - 20mm)
      const imgHeight = (element.offsetHeight * imgWidth) / element.offsetWidth;
      pdf.addImage(dataUrl, 'PNG', 10, 10, imgWidth, imgHeight); // 10mm margins
      pdf.save(`Order # ${name} Details.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
};
  return (
    <div className="p-4 md:p-6 bg-background rounded-lg shadow-helper mb-6 min-w-[300px]" id='orderDetailsContainer'>
      {expandAble &&  (
        <OrderHeader
          _id={_id!}
          createdAt={createdAt!}
          status={status}
          expandable={expandAble}
          showDetails={showOrderDetails}
          onToggleDetails={() => setShowOrderDetails(!showOrderDetails)}
        />
      )}
      {(!expandAble || showOrderDetails) && (
        <div className="orderDetails space-y-6 w-full">
          {!expandAble && (
            <OrderHeader 
              _id={_id!}
              createdAt={createdAt!}
              status={status}
            />
          )}
          <ShippingInfo 
            shippingPerson={shippingPerson} 
            shippingAddress={shippingAddress} 
          />
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primaryDark">
              Order Items
            </h3>
            <div className="overflow-x-auto">
              <CartTableSummary items={items} />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primaryDark">
              Order Summary
            </h3>
            <CartSummary items={items} />
          </div>
          <OrderFooter 
            paymentMethod={paymentMethod}
            orderId={_id!}
            onDownloadPdf={(id) => downloadPdf(id.slice(-8).toUpperCase())}
          />
        </div>
      )}
    </div>
  );
};
export default OrderDetails;