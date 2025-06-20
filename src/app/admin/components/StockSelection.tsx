import {ProductFilterContext} from '@/app/context/ProductFilterContext';
import { Menu } from 'lucide-react';
import { useContext } from 'react';
const StockSelection = () => {
  const {setFilterState} = useContext(ProductFilterContext)
  const onStockChange=(stockValue: "Yes" | "No")=>{
setFilterState((prev)=>({
  ...prev,
  stock:stockValue,
}));
  }
  return (
      <div className="absolute top-[30px] left-0">
        <ul className="bg-white rounded-md shadow-primaryDark py-1 border">
          <li className="text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
          onClick={()=>onStockChange("Yes")}>
            Yes
          </li>
          <li className="text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
          onClick={()=>onStockChange("No")}>
            No
          </li>
        </ul>
      </div>
  );
};
export default StockSelection;