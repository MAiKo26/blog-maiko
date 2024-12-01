"use client";
import { Series } from "@/interfaces/posts-interface";

export type PostSeriesSkeletonProps = {
  currentSerie: Series;
  itemCount?: number;
};

import { Card, CardContent, CardHeader, CardTitle } from "../SeriesCard";

export function PostSeriesBoxSkeleton({
  currentSerie,
  itemCount = 4,
}: PostSeriesSkeletonProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>
          <div className="h-6">Series: {currentSerie.title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 h-4 w-1/3 animate-pulse rounded bg-gray-300"></div>
        <ul>
          {[...Array(itemCount)].map((_, index) => (
            <li
              key={index}
              className="relative my-3 flex list-none items-center pl-7"
            >
              <div className="absolute left-1 top-[9px] h-1.5 w-1.5 animate-pulse rounded-full bg-gray-300"></div>
              <div className="h-4 w-full animate-pulse rounded bg-gray-300"></div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
