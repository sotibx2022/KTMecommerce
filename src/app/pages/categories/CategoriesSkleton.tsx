const CategoriesSkeleton = ({ categoriesCount = 3, subcategoriesCount = 2 }) => {
    return (
        <div>
            {Array.from({ length: categoriesCount }).map((_, categoryIndex) => (
                <div key={categoryIndex} className="mb-4">
                    {/* Category Heading Skeleton */}
                    <div
                        className="h-8 w-1/3 rounded bg-[var(--helper)] animate-pulse mb-2"
                    ></div>
                    {/* Category Description Skeleton */}
                    <div
                        className="h-6 w-2/3 rounded bg-[var(--backgroundLight)] animate-pulse mb-4"
                    ></div>
                    <ul className="flex flex-col gap-4">
                        {Array.from({ length: subcategoriesCount }).map((_, subIndex) => (
                            <li
                                key={subIndex}
                                className="flex justify-between items-center  gap-4 p-4 shadow-helper rounded"
                            >
                                <div className="flex flex-col gap-2">
                                    {/* Subcategory Heading Skeleton */}
                                    <div className="h-6 w-1/2 rounded bg-primaryLight animate-pulse"></div>
                                    {/* Subcategory Description Skeleton */}
                                    <div className="h-4 w-3/4 rounded bg-primaryLight animate-pulse"></div>
                                </div>
                                {/* Image Skeleton */}
                                <div className="h-[100px] w-[100px] rounded bg-[var(--primaryLight)] animate-pulse"></div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
export default CategoriesSkeleton;
