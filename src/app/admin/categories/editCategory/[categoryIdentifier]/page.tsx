import React from 'react'
import AddCategoryTemplate from '../../addCategory/AddCategoryTemplate'
interface ISearchParams {
    searchParams: Promise<{ categoryId: string }>
}
const Page: React.FC<ISearchParams> = async ({ searchParams: maybeSearchParams }) => {
    const searchParams = await maybeSearchParams
    const { categoryId } = searchParams
    return (
        <div>
           <AddCategoryTemplate categoryId={categoryId}/>
        </div>
    )
}
export default Page