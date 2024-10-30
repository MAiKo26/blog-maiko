import { ArrowUpRight } from "lucide-react";
import headerNavLinks from "@/content/headerNavLinks";
import siteMetadata from "@/content/siteMetadata";
import Link from "./Link";
import MobileNav from "./MobileNav";
import SearchButton from "./SearchButton";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  let headerClass =
    "flex items-center w-full bg-white dark:bg-gray-950 justify-between py-10";
  if (siteMetadata.stickyNav) {
    headerClass += " sticky top-0 z-50";
  }

  return (
    <header className={headerClass}>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <div className="no-scrollbar hidden gap-5 sm:flex">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group flex text-nowrap font-medium text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
            >
              {link.title}
              {link.title === "About" ? (
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              ) : null}
            </Link>
          ))}
        </div>
      </div>
      <div className="no-scrollbar flex gap-5">
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
