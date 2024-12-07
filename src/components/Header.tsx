import headerNavLinks from "@/constants/headerNavLinks";
import { ArrowUpRight } from "lucide-react";
import BlogSearchDialogWrapper from "./BlogSearchDialogWrapper";
import Link from "./Link";
import MobileNav from "./MobileNav";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between bg-white py-10 dark:bg-gray-950">
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
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              ) : null}
            </Link>
          ))}
        </div>
      </div>
      <div className="no-scrollbar flex gap-5">
        <BlogSearchDialogWrapper />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
