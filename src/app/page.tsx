import { BlogPostsSkeleton } from "@/components/skeletons/BlogPostsSkeleton";
import { FrontMatter } from "@/interfaces/posts-interface";
import { getAllFrontMatters } from "@/lib/actions";
import { Suspense } from "react";
import Main from "./Main";

export const dynamic = "force-dynamic"; // Fully dynamic rendering

export default async function Page() {
  const postsPromise = getAllFrontMatters();

  return (
    <Suspense fallback={<BlogPostsSkeleton />}>
      <PostsWrapper postsPromise={postsPromise} />
    </Suspense>
  );
}

async function PostsWrapper({
  postsPromise,
}: {
  postsPromise: Promise<FrontMatter[]>;
}) {
  const posts = await postsPromise;
  return <Main posts={posts} />;
}
