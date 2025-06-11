"use client"
import PrimaryButton from '../primaryButton/PrimaryButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import IconGroup from '../iconText/IconGroup';
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if (searchValue) {
      router.push(`/catalog/advanceSearch?keyword=${searchValue}`);
    }
  };
  return (
    <div className='container flex justify-between items-center gap-4 my-4 flex-wrap'>
      <Link href="/">
        <img src='../assets/brand/logo.png' className='w-auto h-[50px] min-w-[150px]' alt="Brand Logo"/>
      </Link>
      <div className="searchArea flex">
        <input
          type='text'
          placeholder='Search the product'
          className='min-w-[300px] bg-background text-primaryDark border-b-2 border-primaryDark border-solid focus:outline-none focus:placeholder-opacity-0'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <PrimaryButton searchText='Search' onClick={handleSearch} theme='dark'/>
      </div>
      <IconGroup/>
    </div>
  );
};
export default SearchBar;
