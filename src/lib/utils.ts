import { FrontMatter, Post } from "@/interfaces/posts-interface";
import { clsx, type ClassValue } from "clsx";
import { slug } from "github-slugger";
import { twMerge } from "tailwind-merge";
import { DateFilteringHelper } from "./DateFilteringHelper";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | number | Date, locale = "en-US") {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const now = new Date(date).toLocaleDateString(locale, options);
  return now;
}

export function countingTags(
  allItems: Post[] | FrontMatter[],
): Record<string, number> {
  const tagCount: Record<string, number> = {};
  const filteredItems = DateFilteringHelper(allItems);

  filteredItems.forEach((file) => {
    if (file.tags && file.draft !== true) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  return tagCount;
}
