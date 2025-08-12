import { useContext, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FilterX, Search, X } from 'lucide-react'; // Import icons
import { ProductFilterContext } from '@/app/context/ProductFilterContext';
const ProductSearchBar = () => {
  const {setFilterState} = useContext(ProductFilterContext);
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleSearch = () => {
setFilterState(prev => ({
  ...prev,
  keyword: searchValue,
}));
  };
  const handleClear = () => {
    setSearchValue('');
    setFilterState(prev => ({
  ...prev,
  keyword:'',
}));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className={`flex items-center gap-2 p-1 rounded-lg `}>
      <div className="relative flex-1">
        <Input
          className="pl-4 pr-8 border-0 shadow-none bg-transparent focus-visible:ring-0"
          placeholder="Search keywords..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
        />
        {searchValue && (
          <X 
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground"
            onClick={handleClear}
          />
        )}
      </div>
      <Button 
        variant="secondary" 
        size="sm"
        className="shrink-0"
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};
export default ProductSearchBar;