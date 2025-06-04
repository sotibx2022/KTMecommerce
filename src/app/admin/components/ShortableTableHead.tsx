import { TableHead } from "@/components/ui/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsUpDown,
  faArrowUpWideShort,
  faArrowDownWideShort
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { ProductFilterContext } from "@/app/context/ProductFilterContext";
interface ISortableTableHead {
  label: string;
  onClick: () => void;
  state: "normal" | "ascending" | "descending";
}
export const ShortableTableHead = ({ label, onClick, state }: ISortableTableHead) => {
  const{filterState, setFilterState} = useContext(ProductFilterContext)
  const icon = {
    normal: faArrowsUpDown,
    ascending: faArrowUpWideShort,
    descending: faArrowDownWideShort
  }[state];
  return (
    <TableHead onClick={onClick} className="cursor-pointer">
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {!filterState.loading && <button>
            <FontAwesomeIcon 
          icon={icon} 
          className={`
            hover:text-helper
            ${state !== 'normal' ? 'text-primaryLight' : 'text-primaryDark'}
          `}
        />
        </button>}
         </div>
    </TableHead>
  );
};