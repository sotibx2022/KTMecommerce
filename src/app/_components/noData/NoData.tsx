import { ReactNode } from 'react';
import Link from 'next/link';
import PrimaryButton from "../primaryButton/PrimaryButton";
interface NoDataProps {
  icon: ReactNode; // Lucide icon component
  notFoundMessage: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonLink?: string; // Optional link URL
}
const NoData = ({ 
  icon, 
  notFoundMessage, 
  buttonText, 
  onButtonClick,
  buttonLink
}: NoDataProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-red-500 text-6xl sm:text-7xl flex items-center justify-center p-4 rounded-full bg-red-100">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-red-500 text-center max-w-md">
        {notFoundMessage}
      </h3>
      {buttonText && (
        buttonLink ? (
          <Link href={buttonLink} passHref>
            <PrimaryButton searchText={buttonText} />
          </Link>
        ) : (
          <PrimaryButton searchText={buttonText} onClick={onButtonClick} />
        )
      )}
    </div>
  );
};
export default NoData;
