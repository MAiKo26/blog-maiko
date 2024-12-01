import { Post } from "@/interfaces/posts-interface";
import { clsx, type ClassValue } from "clsx";
import { slug } from "github-slugger";
import { twMerge } from "tailwind-merge";

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

export function countingTags(allItems: Post[]): Record<string, number> {
  const tagCount: Record<string, number> = {};
  allItems.forEach((file) => {
    if (file.tags && file.draft !== true && new Date(file.date) > new Date()) {
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
