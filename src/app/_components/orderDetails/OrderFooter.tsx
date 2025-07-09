import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
interface OrderFooterProps {
  paymentMethod: string;
  orderId: string;
  onDownloadPdf: (id: string) => void;
}
export const OrderFooter = ({ paymentMethod, orderId, onDownloadPdf }: OrderFooterProps) => (
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
      onClick={() => onDownloadPdf(orderId)}
    >
      <FontAwesomeIcon icon={faFilePdf} className="text-xl md:text-2xl" />
    </button>
  </div>
);