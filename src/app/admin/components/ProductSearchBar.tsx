import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react'; // Import icons
const ProductSearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchValue);
  };
  const handleClear = () => {
    setSearchValue('');
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  return (
    <div className={`flex items-center gap-2 p-1 rounded-lg transition-all duration-300 ${isFocused ? 'ring-2 ring-primary/50 bg-white shadow-sm' : 'bg-muted/50'}`}>
      <div className="relative flex-1">
        <Search 
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} 
        />
        <Input
          className="pl-10 pr-8 border-0 shadow-none bg-transparent focus-visible:ring-0"
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
        variant="default" 
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