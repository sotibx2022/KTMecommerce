"use client"
import PrimaryButton from '../primaryButton/PrimaryButton';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState, useEffect, ChangeEvent } from 'react';
import IconGroup from '../iconText/IconGroup';
import { DisplayContext } from '@/app/context/DisplayComponents';
import AdvanceSearchMobile from '@/app/catalog/[searchValue]/AdvanceSearchMobile';
import { Button } from '@/components/ui/button';
import { BadgeX, Cross, Filter } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LogoComponent from '../logoComponent/LogoComponent';
import { useDebounce } from '@/app/hooks/generalHooks/useDebounce';
import { AdvanceSearchProvider, SearchContext } from '@/app/context/AdvanceSearchContext';
import axios from 'axios';
import SearchResults from './SearchResults';
import { useUserDetails } from '@/app/context/UserDetailsContextComponent';
const SearchBar = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("Advance Search Context is not defined here.")
  }
  const { searchValues, setSearchValues } = context;
  const [searchResults, setSearchResults] = useState([])
  const pathName = usePathname()
  const [searchValue, setSearchValue] = useState("");
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const [searchBarUsed, setSearchBarUsed] = useState(false);
  const [typesenceLoading, setTypesenceLoading] = useState(false);
  const handleSearch = () => {
    if (searchValue) {
      router.push(`/catalog/advanceSearch?keyword=${searchValue}&price=descending`);
    } else {
      router.push('/catalog/advanceSearch?highlighted=none&price=descending')
    }
  };
  useEffect(() => {
    if (keyword) {
      setSearchValue(keyword);
    } else {
      setSearchValue("")
    }
  }, [keyword]);
  const handleFilter = () => {
    setVisibleComponent('advanceSearch');
    setSearchBarUsed(true);
  };
  const resetSearch = () => {
    setSearchValue("");
    setSearchValues({ ...searchValues, keyword: '' })
  }
  function handleTypesenceResult(event: ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value);
    setSearchBarUsed(true);
    setTypesenceLoading(true);
  }
  useDebounce({
    callback: async () => {
      if (!searchBarUsed) return;
      if (searchValue === "") return;
      const response = await axios.post('/api/smartSearch', { searchValue });
      setSearchResults(response.data);
      setTypesenceLoading(false);
      return response.data;
    },
    delay: 200,
    dependencies: [searchValue, searchBarUsed],
  });
  return (
    <>
      <div className='container flex justify-between items-center gap-4 my-4 flex-wrap'>
        <LogoComponent />
        <div className="InputArea relative flex items-center h-[50px]">
          {/* Input field with proper padding for icons */}
          <input
            type='text'
            placeholder='Search the product'
            className='min-w-[300px] h-full pl-10 pr-8 bg-background text-primaryDark border-b-2 border-primaryDark border-solid focus:outline-none focus:placeholder-opacity-0'
            value={searchValue}
            onChange={(e) => handleTypesenceResult(e)}
          />
          {/* Search icon - positioned left */}
          <FontAwesomeIcon
            icon={faSearch}
            className="w-5 h-5 absolute top-1/2 left-[10px] -translate-y-1/2 text-primaryDark pointer-events-none"
          />
          {/* Clear button - positioned right after text */}
          {searchValue && (
            <button
              type="button"
              onClick={resetSearch}
              className="absolute left-[250px] top-1/2 -translate-y-1/2 text-primaryDark hover:text-primary focus:outline-none"
              aria-label="Clear search"
            >
              <BadgeX />
            </button>
          )}
          {/* Action buttons */}
          <div className="searchBarButtons flex gap-2 items-center ml-2">
            <PrimaryButton searchText='Search' onClick={handleSearch} theme='dark' />
            <Button variant='helper' onClick={handleFilter}>
              <Filter />
            </Button>
          </div>
          {searchBarUsed && <SearchResults results={searchResults} loading={typesenceLoading} />}
        </div>
        <IconGroup />
      </div>
      {visibleComponent === 'advanceSearch' && <AdvanceSearchMobile />}
    </>
  );
};
export default SearchBar;