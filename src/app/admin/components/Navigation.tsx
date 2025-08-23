"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IPagination } from './products'
interface INavigation {
  pagination: IPagination,
  selectedPageNumber: (pageNumber: number) => void;
}
const Navigation: React.FC<INavigation> = ({ pagination, selectedPageNumber }) => {
  const handlePageChange = (pageNumber: number) => {
    selectedPageNumber(pageNumber);
  }
  return (
    <div className="flex justify-center items-center py-4 w-full">
      <div className="flex items-center gap-4">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primaryLight)] text-[var(--backgroundLight)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage <= 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2 font-medium">
          <span className="text-[var(--primaryLight)] font-bold">{pagination.currentPage} of {pagination.totalPages}</span>
        </div>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--primaryLight)] text-[var(--backgroundLight)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md"
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage >= pagination.totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
export default Navigation