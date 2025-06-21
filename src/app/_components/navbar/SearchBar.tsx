"use client"
import PrimaryButton from '../primaryButton/PrimaryButton';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState, useEffect } from 'react'; // Added useEffect
import IconGroup from '../iconText/IconGroup';
import { DisplayContext } from '@/app/context/DisplayComponents';
import AdvanceSearchMobile from '@/app/catalog/[searchValue]/AdvanceSearchMobile';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  // Initialize searchValue with keyword when component mounts
  useEffect(() => {
    if (keyword) {
      setSearchValue(keyword);
    }else{
      setSearchValue("")
    }
  }, [keyword]);
  const handleSearch = () => {
    if (searchValue) {
      router.push(`/catalog/advanceSearch?keyword=${searchValue}`);
    }
  };
  const handleFilter = () => {
    setVisibleComponent('advanceSearch');
  };
  return (
    <>
      <div className='container flex justify-between items-center gap-4 my-4 flex-wrap'>
        <Link href="/">
          <img src='../assets/brand/logo.png' className='w-auto h-[50px] min-w-[150px]' alt="Brand Logo" />
        </Link>
        <div className="searchArea flex">
          <div className="InputArea relative">
            <input
              type='text'
              placeholder='Search the product'
              className='min-w-[300px] h-full pl-10  bg-background text-primaryDark border-b-2 border-primaryDark border-solid focus:outline-none focus:placeholder-opacity-0'
              value={searchValue} // Only use searchValue here
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              className="w-5 h-5 absolute top-1/2 left-[10px] -translate-y-1/2 text-primaryDark" 
            />
          </div>
          <div className="searchBarButtons flex gap-2 items-center">
            <PrimaryButton searchText='Search' onClick={handleSearch} theme='dark' />
            <Button variant='helper' onClick={handleFilter}>
              <Filter />
            </Button>
          </div>
        </div>
        <IconGroup />
      </div>
      {visibleComponent === 'advanceSearch' && <AdvanceSearchMobile />}
    </>
  );
};
export default SearchBar;