import TOCInline from "pliny/ui/TOCInline.js";
import Pre from "pliny/ui/Pre.js";
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm.js";
import type { MDXComponents } from "mdx/types";
import Image from "./Image";
import CustomLink from "./Link";
import TableWrapper from "./TableWrapper";

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink as unknown as React.ComponentType<
    React.AnchorHTMLAttributes<HTMLAnchorElement>
  >,
  pre: Pre as unknown as React.ComponentType<
    React.HTMLAttributes<HTMLPreElement>
  >,
  table: TableWrapper as unknown as React.ComponentType<
    React.TableHTMLAttributes<HTMLTableElement>
  >,
  BlogNewsletterForm,
};
