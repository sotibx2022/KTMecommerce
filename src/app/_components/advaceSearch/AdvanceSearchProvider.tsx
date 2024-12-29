import React, { ReactNode } from 'react';
import AdvanceSearchContextComponent from '@/app/context/AdvanceSearchContext'; // Correct the path as needed
import AdvanceSearch from './AdvanceSearch'; // Correct the path as needed
// Define the component with children prop
const AdvanceSearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AdvanceSearchContextComponent>
      {children} {/* The children will now be properly passed down */}
    </AdvanceSearchContextComponent>
  );
};
export default AdvanceSearchProvider;
