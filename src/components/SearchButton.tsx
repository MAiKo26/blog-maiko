import { AlgoliaButton } from "pliny/search/AlgoliaButton.js";
import { KBarButton } from "pliny/search/KBarButton.js";
import siteMetadata from "@/data/siteMetadata";

const SearchButton = () => {
  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === "algolia" ||
      siteMetadata.search.provider === "kbar")
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === "algolia" ? AlgoliaButton : KBarButton;

    return (
      <SearchButtonWrapper aria-label="Search">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          classNameName="h-6 w-6 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg> */}
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <div className="focus-visible:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input hover:bg-accent hover:text-accent-foreground bg-muted/50 text-muted-foreground relative inline-flex h-8 w-full items-center justify-start gap-2 whitespace-nowrap rounded-[0.5rem] border px-4 py-2 text-sm font-normal shadow-none transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-40 lg:w-48 xl:w-64">
            <span className="hidden lg:inline-flex">Search articles...</span>
            <span className="inline-flex lg:hidden">Search...</span>
            <kbd className="bg-muted pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </SearchButtonWrapper>
    );
  }
};

export default SearchButton;
