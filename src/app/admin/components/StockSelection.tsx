import { Menu } from 'lucide-react';
const StockSelection = () => {
  return (
      <div className="absolute top-[30px] left-0">
        <ul className="bg-white rounded-md shadow-primaryDark py-1 border">
          <li className="text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer">
            Yes
          </li>
          <li className="text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer">
            No
          </li>
        </ul>
      </div>
  );
};
export default StockSelection;