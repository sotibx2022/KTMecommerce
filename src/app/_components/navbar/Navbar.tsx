"use client";
import SearchBar from "./SearchBar";
import SecondaryHeader from "./SecondaryHeader";
import MainPrimaryHeader from "./MainPrimaryHeader";
import { Suspense } from "react";
import SearchBarSkeleton from "./SearchBarSkleton";
const NavBar = () => {
  return (
    <>
        <MainPrimaryHeader />
        <div className="hidden lg:block">
          <Suspense  fallback={<SearchBarSkeleton/>}>
            <SearchBar />
          </Suspense >
          <SecondaryHeader />
        </div>
    </>
  );
};
export default NavBar;
