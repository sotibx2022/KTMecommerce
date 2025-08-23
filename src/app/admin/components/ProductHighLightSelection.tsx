import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ProductFilterContext } from '@/app/context/ProductFilterContext';
import { useContext } from 'react';
const highlightOptions = [
  { id: 'isNew', label: 'New' },
  { id: 'isTrending', label: 'Trending' },
  { id: 'isTop', label: 'Top' },
  { id: 'isOffer', label: 'Offer' },
  { id: 'isRegular', label: 'Regular' },
];
const ProductHighLightSelection = () => {
  const { setFilterState } = useContext(ProductFilterContext);
  return (
    <div className="flex flex-wrap gap-4 absolute top-0 left-0 w-full h-full selectAbleTableHead shadow-primaryLight">
      {highlightOptions.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox
            id={option.id}
          />
          <Label htmlFor={option.id}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};
export default ProductHighLightSelection;
