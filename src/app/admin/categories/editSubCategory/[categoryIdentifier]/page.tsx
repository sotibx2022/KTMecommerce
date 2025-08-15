import React from 'react'
import AddSubCategoryTemplate from '../../addSubCategory/AddSubCategoryTemplate'
interface ISearchParams {
    searchParams: Promise<{ categoryId: string }>
}
const Page: React.FC<ISearchParams> = async ({ searchParams: maybeSearchParams }) => {
    const searchParams = await maybeSearchParams
    const { categoryId } = searchParams
    return (
        <div>
           <AddSubCategoryTemplate categoryId={categoryId}/>
        </div>
    )
}
export default Page