function ViewCountSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-2 w-full animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
      <div>
        <div className="h-2 w-full max-w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 w-full max-w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}
export default ViewCountSkeleton;
