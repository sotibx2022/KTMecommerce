import { DollarSign, Equal, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchContext } from '@/app/context/AdvanceSearchContext';
import { useContext } from 'react';
const PriceSelection = () => {
const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
    }
    const {searchValues,setSearchValues} = context
  const handlePriceChange = (value: "normal" | "increasing" | "decreasing") => {
    setSearchValues(prev => ({
      ...prev,
      priceOrder: value
    }));
  };
  const getCurrentSelection = () => {
    switch(searchValues.priceOrder) {
      case 'increasing':
        return (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Increasing</span>
            <ArrowUp className="h-4 w-4 text-green-300" />
          </div>
        );
      case 'decreasing':
        return (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Decreasing</span>
            <ArrowDown className="h-4 w-4 text-red-300" />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Normal</span>
            <Equal className="h-4 w-4" />
          </div>
        );
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-12 flex items-center justify-between gap-2 p-2 rounded-lg w-full border bg-primaryLight text-background  focus:outline-none">
        {getCurrentSelection()}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full">
        <DropdownMenuItem 
          className="flex items-center gap-2 focus:bg-primary/10"
          onClick={() => handlePriceChange("normal")}
        >
          <DollarSign className="h-4 w-4" />
          <span>Normal</span>
          <Equal className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 focus:bg-green-500/10"
          onClick={() => handlePriceChange("increasing")}
        >
          <DollarSign className="h-4 w-4" />
          <span>Increasing</span>
          <ArrowUp className="h-4 w-4 text-green-300 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 focus:bg-red-500/10"
          onClick={() => handlePriceChange("decreasing")}
        >
          <DollarSign className="h-4 w-4" />
          <span>Decreasing</span>
          <ArrowDown className="h-4 w-4 text-red-300 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default PriceSelection;