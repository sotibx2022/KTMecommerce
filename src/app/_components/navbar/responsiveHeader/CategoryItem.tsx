import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Category, Subcategory } from "@/app/types/categories";
export const CategoryItem = ({
  item,
  isActive,
  onToggle
}: {
  item: Category,
  isActive: boolean,
  onToggle: () => void
}) => (
  <li className="shadow-helper px-4">
    <div className="flex justify-between items-center py-3">
      <Link
        href={`/catalog/advanceSearch?category=${item.category_name}`}
        className="text-primaryDark hover:text-primaryDark flex-grow"
      >
        {item.category_name}
      </Link>
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
const SubcategoryItem = ({ subItem, parentCategory }: { subItem: Subcategory, parentCategory: string }) => (
  <li>
    <Link
      href={`/catalog/advanceSearch?category=${parentCategory}&subcategory=${subItem.category_name}`}
      className="block py-2 text-primaryLight hover:text-primaryDark"
    >
      {subItem.category_name}
    </Link>
  </li>
);