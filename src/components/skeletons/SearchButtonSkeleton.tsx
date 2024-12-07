interface SearchButtonSkeletonProps {}

function SearchButtonSkeleton({}: SearchButtonSkeletonProps) {
  return (
    <div className="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground bg-muted/50 text-muted-foreground relative inline-flex h-8 w-52 animate-pulse items-center justify-start gap-2 whitespace-nowrap rounded-[0.5rem] border bg-gray-200 px-4 py-2 text-sm font-normal shadow-none transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-700 sm:pr-12 md:w-64 lg:w-72 xl:w-80"></div>
  );
}
export default SearchButtonSkeleton;
