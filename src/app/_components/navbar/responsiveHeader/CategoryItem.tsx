import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Category, Subcategory } from "@/app/types/categories";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { DisplayContext } from "@/app/context/DisplayComponents";
export const CategoryItem = ({
  item,
  isActive,
  onToggle
}: {
  item: Category;
  isActive: boolean;
  onToggle: () => void;
}) => {
  const router = useRouter();
  const { visibleComponent, setVisibleComponent } = useContext(DisplayContext);
  const handlePageChange = (category_name: string) => {
    router.push(`/catalog/advanceSearch?category=${category_name}`);
    setVisibleComponent("");
  };
  return (
    <li className="shadow-helper px-4">
      <div className="flex justify-between items-center py-3">
        <h2 
          className="text-primaryDark hover:text-primaryDark flex-grow cursor-pointer" 
          onClick={() => handlePageChange(item.category_name)}
        >
          {item.category_name}
        </h2>
        <Link href={``} className=""></Link>
        {item.subcategories?.length > 0 && (
          <FontAwesomeIcon 
            onClick={onToggle}
            icon={isActive ? faMinus : faPlus} 
            className="p-2 rounded-full text-primaryDark bg-primaryLight hover:bg-primaryDark hover:text-background cursor-pointer"
          />
        )}
      </div>
      {isActive && item.subcategories?.length > 0 && (
        <ul className="pl-4 pb-2 space-y-2">
          {item.subcategories.map((subItem) => (
            <SubcategoryItem 
              key={subItem.url_slug} 
              subItem={subItem} 
              parentCategory={item.category_name} 
            />
          ))}
        </ul>
      )}
    </li>
  );
};
const SubcategoryItem = ({ 
  subItem, 
  parentCategory 
}: { 
  subItem: Subcategory; 
  parentCategory: string; 
}) => {
  const router = useRouter();
  const { setVisibleComponent } = useContext(DisplayContext);
  const handleSubPageChange = (subcategory: string, category: string) => {
    router.push(`/catalog/advanceSearch?category=${category}&subcategory=${subcategory}`);
    setVisibleComponent("");
  };
  return (
    <li onClick={() => handleSubPageChange(subItem.category_name, parentCategory)}>
      <h2 className="text-primaryDark hover:text-primaryDark flex-grow cursor-pointer">
        {subItem.category_name}
      </h2>
    </li>
  );
};