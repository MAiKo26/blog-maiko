export const BlogPostsSkeleton = ({ count = 20 }) => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {[...Array(count)].map((_, index) => (
          <li key={index} className="py-12">
            <article>
              <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                {/* Date Skeleton */}
                <div className="h-5 w-1/2 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>

                <div className="space-y-5 xl:col-span-3">
                  <div className="space-y-6">
                    {/* Title Skeleton */}
                    <div className="h-8 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>

                    {/* Tags Skeleton */}
                    <div className="flex space-x-2">
                      {[...Array(3)].map((_, tagIndex) => (
                        <div
                          key={tagIndex}
                          className="h-6 w-16 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"
                        ></div>
                      ))}
                    </div>

                    {/* Summary Skeleton */}
                    <div className="space-y-2">
                      <div className="h-4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                      <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                  </div>

                  {/* Read More Skeleton */}
                  <div className="h-6 w-1/4 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
};
