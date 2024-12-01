"use client";
import { FrontMatter, Series } from "@/interfaces/posts-interface";
import Link from "next/link";

export type PostSeriesProps = {
  currentSerie: Series;
  allFrontMatters: FrontMatter[];
};

export function PostSeriesBox({
  currentSerie,
  allFrontMatters,
}: PostSeriesProps) {
  const currentPosts = allFrontMatters.filter(
    (post) => post.series && post.series.title === currentSerie.title,
  );

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>Series: {currentSerie.title}</CardTitle>
      </CardHeader>
      <CardContent>
        Episode: ({currentSerie.order}/{currentPosts.length})
        <ul>
          {currentPosts
            .sort((a, b) => a.series.order - b.series.order)
            .map((p) => (
              <li
                key={p.slug}
                className={`relative my-3 list-none pl-7 text-sm before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full ${
                  currentSerie.order === p.series?.order
                    ? "before:bg-accent-foreground/90 font-extrabold before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10"
                    : "hover:before:bg-accent-foreground/90 before:bg-primary-500/30 hover:before:ring-[3px] hover:before:ring-primary-500 hover:before:ring-offset-1 hover:before:ring-offset-black/10 dark:hover:before:ring-primary-500"
                }`}
              >
                {currentSerie.order === p.series?.order ? (
                  <span>{p.title}</span>
                ) : (
                  <Link
                    className="transition-colors duration-200 ease-in-out hover:text-primary-500 dark:hover:text-primary-500"
                    href={`/${p.slug}`}
                  >
                    {p.title}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}

import * as React from "react";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-card text-card-foreground rounded-lg border lg:w-auto ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
CardContent.displayName = "CardContent";
