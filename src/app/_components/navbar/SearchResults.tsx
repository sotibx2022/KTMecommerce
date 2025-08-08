import Link from 'next/link';
import React from 'react';
interface SearchResultsProps {
  results: string[]; // Assuming results is an array of strings (product names)
  loading: boolean;
}
const SearchResults: React.FC<SearchResultsProps> = ({ results, loading }) => {
  return (
    <div
      className={`p-4 rounded-md shadow-md max-w-md mx-auto absolute top-[50px] left-0 z-50 w-[300px] ${
        results.length === 0 && !loading
          ? 'bg-[var(--background)] text-[var(--primaryDark)] shadow-sm'
          : 'bg-[var(--backgroundLight)]'
      }`}
    >
      {loading ? (
        <p className="text-[var(--primaryDark)]">Loading...</p>
      ) : results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <Link href={`/catalog/advanceSearch?highlighted=none&keyword=${result}`} key={index}>
            <li
              className="border-b border-[var(--primaryLight)] last:border-b-0 cursor-pointer hover:bg-[var(--helper)] transition-colors duration-200 px-3 py-2 text-[var(--primaryDark)] font-medium"
            >
              {result}
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SearchResults;
