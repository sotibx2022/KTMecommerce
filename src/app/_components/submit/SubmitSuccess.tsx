import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Import Font Awesome check icon
interface SubmitSuccessProps {
  message: string;
}
const SubmitSuccess: React.FC<SubmitSuccessProps> = ({ message }) => {
  return (
    <div className="flex items-center">
      <FaCheckCircle className="text-green-500 mr-2" /> {/* Icon */}
      <span className="text-green-500 text-sm">{message}</span>
    </div>
  );
};
export default SubmitSuccess;
