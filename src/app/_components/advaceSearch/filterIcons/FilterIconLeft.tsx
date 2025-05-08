import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
interface IFilterIconLeft{
    onClick:()=>void;
}
const FilterIconLeft:React.FC<IFilterIconLeft> = ({ onClick }) => {
  return (
    <div
      className="absolute top-1/2 -left-[50px] transform -translate-y-1/2 w-[50px] h-[50px] bg-primaryLight flex items-center justify-end hover:bg-primaryDark hover:text-background cursor-pointer"
      style={{ clipPath: 'polygon(100% 0%, 25% 0%, 0% 50%, 25% 100%, 100% 100%)' }}
      onClick={onClick}
    >
      <FontAwesomeIcon
        icon={faSlidersH}
        className="rounded-full border-2 border-transparent  pr-2"
        size="xl"
      />
    </div>
  );
};
export default FilterIconLeft;
