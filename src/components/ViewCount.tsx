"use client";
import { useEffect, useState } from "react";
import { getViewCount } from "@/lib/actions";

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

  if (views === null)
    return (
      <div className="h-2 max-w-sm animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
    );

  return <div>{views}</div>;
}

export default ViewCount;
