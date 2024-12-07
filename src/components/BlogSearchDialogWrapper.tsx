import { getAllFrontMatters } from "@/lib/actions";
import { Suspense } from "react";
import BlogSearchDialog from "./BlogSearchDialog";
import SearchButtonSkeleton from "./skeletons/SearchButtonSkeleton";

interface BlogSearchDialogWrapperProps {}

async function BlogSearchDialogWrapper({}: BlogSearchDialogWrapperProps) {
  const data = await getAllFrontMatters();

  return (
    <Suspense fallback={<SearchButtonSkeleton />}>
      <BlogSearchDialog allFrontMatters={data} />
    </Suspense>
  );
}
export default BlogSearchDialogWrapper;
