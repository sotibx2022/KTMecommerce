import React, { useContext } from 'react';
import { SearchContext } from './AdvanceSearchContext';
import { Star, Equal, ArrowUp, ArrowDown, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
const RatingSelection = () => {
  const { searchValues, setSearchValues } = useContext(SearchContext);
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
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>Normal</span>
            <Equal className="h-4 w-4" />
          </div>
        );
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between gap-2 p-2 rounded-lg w-[180px] border bg-primaryLight text-background  focus:outline-none">
        {getCurrentSelection()}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuItem 
          className="flex items-center gap-2 focus:bg-primary/10"
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