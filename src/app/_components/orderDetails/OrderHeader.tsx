import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
interface OrderHeaderProps {
  _id?: string;
  createdAt: Date;
  status: string;
  expandable?: boolean;
  showDetails?: boolean;
  onToggleDetails?: () => void;
}
export const OrderHeader = ({
  _id,
  createdAt,
  status,
  expandable = false,
  showDetails = false,
  onToggleDetails
}: OrderHeaderProps) => (
  <div className="mb-4 md:mb-6 w-full">
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primaryDark">
        Order # {_id?.slice(-8).toUpperCase()}
      </h2>
      {expandable && (
        <FontAwesomeIcon
          icon={showDetails ? faMinus : faPlus}
          className="bg-helper p-2 md:p-3 rounded-full cursor-pointer text-background text-sm md:text-base"
          onClick={onToggleDetails}
        />
      )}
    </div>
    <div className="flex justify-between items-center">
      <p className="text-xs sm:text-sm md:text-base text-primaryLight">
        {format(new Date(createdAt), 'MMM dd, yyyy')}
      </p>
      <span className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold 
        ${status === 'ordered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
        {status}
      </span>
    </div>
  </div>
);