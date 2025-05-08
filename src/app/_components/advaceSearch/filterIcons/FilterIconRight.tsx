import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
interface IFilterIconRight{
    onClick:()=>void;
}
const FilterIconRight:React.FC<IFilterIconRight> = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 -right-[50px] transform -translate-y-1/2 w-[50px] h-[50px] bg-primaryLight flex items-center hover:bg-primaryDark hover:text-background cursor-pointer"
      style={{ clipPath: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)' }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faSlidersH}
        className="rounded-full border-2 border-transparent  pl-2"
        size="xl"
      />
    </div>
  );
};
export default FilterIconRight;
