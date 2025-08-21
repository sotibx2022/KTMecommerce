const CategoriesSkeleton = ({ categoriesCount = 3, subcategoriesCount = 6 }) => {
    return (
        <div className="space-y-12 mt-8">
            {Array.from({ length: categoriesCount }).map((_, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                    {/* Category Heading Skeleton */}
                    <div className="mb-6 border-b border-backgroundLight pb-4">
                        <div className="h-8 w-1/3 rounded bg-backgroundLight animate-pulse mb-2"></div>
                        <div className="h-6 w-2/3 rounded bg-backgroundLight animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: subcategoriesCount }).map((_, subIndex) => (
                            <div
                                key={subIndex}
                                className="bg-background rounded-lg overflow-hidden shadow-primaryLight p-5"
                            >
                                <div className="flex flex-col gap-2 mb-4">
                                    {/* Subcategory Heading Skeleton */}
                                    <div className="h-6 w-3/5 rounded bg-backgroundLight animate-pulse"></div>
                                    {/* Subcategory Description Skeleton */}
                                    <div className="h-4 w-full rounded bg-backgroundLight animate-pulse"></div>
                                    <div className="h-4 w-4/5 rounded bg-backgroundLight animate-pulse"></div>
                                </div>
                                {/* Image Skeleton */}
                                <div className="h-48 w-full rounded-md bg-backgroundLight animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CategoriesSkeleton;