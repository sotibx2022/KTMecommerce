"use client";
import SearchBar from "./SearchBar";
import SecondaryHeader from "./SecondaryHeader";
import MainPrimaryHeader from "./MainPrimaryHeader";
import { Suspense } from "react";
import SearchBarSkeleton from "./SearchBarSkleton";
import RecommendationTrigger from "../langchain/RecommendationTrigger";
const NavBar = () => {
  return (
    <>
          <RecommendationTrigger/>
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
