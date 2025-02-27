"use client";
import SearchBar from "./SearchBar";
import SecondaryHeader from "./SecondaryHeader";
import MainPrimaryHeader from "./MainPrimaryHeader";
const NavBar = () => {
  return (
    <>
        <MainPrimaryHeader />
        <div className="hidden lg:block">
          <SearchBar />
          <SecondaryHeader />
        </div>
    </>
  );
};
export default NavBar;
