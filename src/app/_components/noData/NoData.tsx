import { ReactNode } from 'react';
import Link from 'next/link';
import PrimaryButton from "../primaryButton/PrimaryButton";
interface NoDataProps {
  icon: ReactNode; // Lucide icon component
  notFoundMessage: string;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonLink?: string; // New prop for link URL
}
const NoData = ({ 
  icon, 
  notFoundMessage, 
  buttonText, 
  onButtonClick,
  buttonLink
}: NoDataProps) => {
  return (
    <div className="flex flex-col  gap-4 py-12 text-center">
      <div className="text-red-500">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-red-500">
        {notFoundMessage}
      </h3>
      {buttonText && (
          <Link href={buttonLink!} passHref>
            <PrimaryButton searchText={buttonText} />
          </Link>
        ) 
      }
    </div>
  );
};
export default NoData;