import { APIResponseError, APIResponseSuccess } from '@/app/services/queryFunctions/users';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Menu } from 'lucide-react';
interface ISubCategoryData{
  category_name:string
}
interface ISubCategoryDatas{
  _id:string,
  subcategories:ISubCategoryData[]
}const selectedCategory = "mobile"
const SubCategorySelection = () => {
    const fetchSubCategories = async(category:string):Promise<APIResponseSuccess<ISubCategoryDatas>| APIResponseError>=>{
  const response = await axios.get(`/api/categories/${selectedCategory}`);
  return response.data
}
const { data:subCategories, isPending: subCategoriesPending } = useQuery<
  APIResponseSuccess<ISubCategoryDatas> | APIResponseError
>({
  queryKey: ['subCategories', selectedCategory],
  queryFn: () => fetchSubCategories(selectedCategory as string),
  enabled: !!selectedCategory
});
const subCategoryLoading = subCategoriesPending;
  return (
      <div className="absolute top-[30px] left-0 ">
        <ul className="bg-white rounded-md shadow-primaryDark py-1 border">
            {subCategories?.success && subCategories.data?.subcategories.map((item,index:number)=>{
                return  <li className="w-full text-left p-4 hover:bg-primaryLight hover:text-white cursor-pointer" key={index}>
            {item.category_name}
          </li>
            })}
        </ul>
      </div>
  );
};
export default SubCategorySelection;