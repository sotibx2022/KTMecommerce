import { ProductFilterContext } from '@/app/context/ProductFilterContext';
import { Menu } from 'lucide-react';
import { useContext } from 'react';
const ProductHighLightSelection= () => {
  const {setFilterState} = useContext(ProductFilterContext)
   const onHighlightSelection = (highlight: string) => {
setFilterState((prev)=>({...prev,highlights:highlight}))
   };
  return (
    <div className="absolute top-[30px] left-0">
      <ul className="bg-white rounded-md shadow-primaryDark py-1">
        <li
          className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
          onClick={() => onHighlightSelection("New")}
        >
          New
        </li>
        <li
          className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
          onClick={() => onHighlightSelection("Trending")}
        >
          Trending
        </li>
        <li
          className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
          onClick={() => onHighlightSelection("Top")}
        >
          Top
        </li>
        <li
          className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
          onClick={() => onHighlightSelection("Offer")}
        >
          Offer
        </li>
        <li
          className="whitespace-nowrap text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer"
          onClick={() => onHighlightSelection("Regular")}
        >
          Regular
        </li>
      </ul>
    </div>
  );
};
export default ProductHighLightSelection;
