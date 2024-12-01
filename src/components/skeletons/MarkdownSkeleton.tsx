export const MarkdownSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="h-4 w-11/12 rounded bg-gray-300 dark:bg-gray-700"></div>
          {index % 3 === 0 && (
            <div className="h-40 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
          )}
        </div>
      ))}
    </div>
  );
};
