import React from 'react';
import { FaTimesCircle } from 'react-icons/fa'; // Import Font Awesome times icon
interface SubmitErrorProps {
  message: string;
}
const SubmitError: React.FC<SubmitErrorProps> = ({ message }) => {
  return (
    <div className="flex items-center">
      <FaTimesCircle className="text-red-500 mr-2" /> {/* Icon */}
      <span className="text-red-500 text-sm">{message}</span>
    </div>
  );
};
export default SubmitError;
