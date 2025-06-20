import React, { useContext } from 'react';
import { Star, Equal, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SearchContext } from '@/app/context/AdvanceSearchContext';
const RatingSelection = () => {
  const context = useContext(SearchContext);
      if (!context) {
          throw new Error('useSearchContext must be used within an AdvanceSearchProvider');
      }
      const {searchValues,setSearchValues} = context
  const handleRatingChange = (value: "normal" | "increasing" | "decreasing") => {
    setSearchValues(prev => ({
      ...prev,
      ratingOrder: value
    }));
  };
  const getCurrentSelection = () => {
    switch(searchValues.ratingOrder) {
      case 'increasing':
        return (
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Increasing</span>
            <ArrowUp className="h-4 w-4 text-green-300" />
          </div>
        );
      case 'decreasing':
        return (
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Decreasing</span>
            <ArrowDown className="h-4 w-4 text-red-300" />
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 w-full">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
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
      <DropdownMenuContent className="">
        <DropdownMenuItem 
          className="flex items-center gap-2 focus:bg-primaryLight w-full"
          onClick={() => handleRatingChange("normal")}
        >
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span>Normal</span>
          <Equal className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 focus:bg-green-500/10"
          onClick={() => handleRatingChange("increasing")}
        >
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span>Increasing</span>
          <ArrowUp className="h-4 w-4 text-green-300 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 focus:bg-red-500/10"
          onClick={() => handleRatingChange("decreasing")}
        >
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span>Decreasing</span>
          <ArrowDown className="h-4 w-4 text-red-300 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default RatingSelection;