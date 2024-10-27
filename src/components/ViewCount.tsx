"use client";
import { useEffect, useState } from "react";
import { getViewCount } from "@/lib/actions";
import ViewCountSkeleton from "./ViewCountSkeleton";

interface ViewCountProps {
  url: string;
}

function ViewCount({ url }: ViewCountProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const count = await getViewCount(url);
        setViews(count);
      } catch (error) {
        console.error("Error fetching view count:", error);
        setViews(0);
      }
    };

    fetchViews();
  }, [url]);

  if (views === null) return <ViewCountSkeleton />;
  if (views === 0) return null;

  return (
    <div className="py-4 xl:py-8">
      <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        Views
      </h2>
      <div className="flex flex-wrap">{views}</div>
    </div>
  );
}

export default ViewCount;
