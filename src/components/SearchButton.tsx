const SearchButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Search"
      className="focus-visible:ring-ring hover:bg-accent hover:text-accent-foreground bg-muted/50 text-muted-foreground relative inline-flex h-8 w-52 items-center justify-start gap-2 whitespace-nowrap rounded-[0.5rem] border px-4 py-2 text-sm font-normal shadow-none transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 sm:pr-12 md:w-64 lg:w-72 xl:w-80"
    >
      <span className="hidden md:inline-flex">Search articles...</span>
      <span className="inline-flex md:hidden">Search...</span>
      <kbd className="bg-muted pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
};

export default SearchButton;
