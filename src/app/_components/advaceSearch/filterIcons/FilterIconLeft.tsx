import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons';
const FilterIconLeft = () => {
  return (
    <div className='absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <FontAwesomeIcon
        icon={faSlidersH}
        className="bg-helper ml-2 w-[20px] h-[20px] p-[10px] rounded-full text-background"
        size="sm"
      />
    </div>
  );
};
export default FilterIconLeft;
