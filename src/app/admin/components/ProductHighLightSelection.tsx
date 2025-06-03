import { Menu } from 'lucide-react';
const ProductHighLightSelection = () => {
  return (
      <div className="absolute top-[30px] left-0">
        <ul className="bg-white rounded-md shadow-primaryDark py-1">
          <li className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer">
            New Arrival
          </li>
          <li className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer">
            Best Seller
          </li>
          <li className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer">
            Featured
          </li>
          <li className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer">
            Special Offer
          </li>
        </ul>
      </div>
  );
};
export default ProductHighLightSelection;