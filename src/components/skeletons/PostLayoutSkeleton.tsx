import { MarkdownSkeleton } from "./MarkdownSkeleton";

export default function PostLayoutSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="pt-6 xl:pb-6">
        <div className="space-y-4 text-center">
          <div className="mx-auto h-5 w-32 rounded bg-gray-300 dark:bg-gray-600"></div>
          <div className="mx-auto h-8 w-2/3 rounded bg-gray-300 dark:bg-gray-600"></div>
        </div>
      </div>
      <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
        <div className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
          <div className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div>
                <div className="h-4 w-24 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="mt-2 h-3 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:col-span-3 xl:row-span-2">
          <div className="not-prose mt-4">
            <div className="mb-4 h-12 w-full rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
            <MarkdownSkeleton />
          </div>
          <div className="pb-6 pt-6 text-sm">
            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </div>
        <footer>
          <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
            <div className="py-4 xl:py-8">
              <h2 className="mb-4 h-4 w-16 rounded bg-gray-300 dark:bg-gray-600"></h2>
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-6 w-20 rounded bg-gray-300 dark:bg-gray-600"></div>
                <div className="h-6 w-14 rounded bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>
          </div>
          <div className="pt-4 xl:pt-8">
            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-600"></div>
          </div>
        </footer>
      </div>
    </div>
  );
}
